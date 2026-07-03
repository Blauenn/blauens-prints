import { db } from "#/server/db/client";
import { desc, sql, eq } from "drizzle-orm";

import { images } from "#/server/db/schema/images";
import { deliveries } from "#/server/db/schema/deliveries";
import { people } from "#/server/db/schema/people";

export async function getImagesList() {
  return db
    .select({
      id: images.id,
      categoryId: images.categoryId,
      number: images.number,

      recipients: sql<{ name: string; isDelivered: boolean }[]>`
        COALESCE(
          json_agg(
            json_build_object(
              'name',
              CASE
                WHEN ${people.facebook} IS NOT NULL AND ${people.facebook} <> ''
                THEN ${people.facebook}
                ELSE ${people.instagram}
              END,
              'isDelivered',
              ${deliveries.isDelivered}
            )
          ) FILTER (WHERE ${people.id} IS NOT NULL),
          '[]'::json
        )
      `,
    })
    .from(images)
    .leftJoin(deliveries, eq(deliveries.imageId, images.id))
    .leftJoin(people, eq(people.id, deliveries.personId))
    .groupBy(images.id)
    .orderBy(desc(images.id));
}

export type ImagesListItem = Awaited<ReturnType<typeof getImagesList>>[number];

export async function getImageById(id: number) {
  const rows = await db
    .select({
      image: images,
      facebook: people.facebook,
      instagram: people.instagram,
      isDelivered: deliveries.isDelivered,
    })
    .from(images)
    .leftJoin(deliveries, eq(deliveries.imageId, images.id))
    .leftJoin(people, eq(people.id, deliveries.personId))
    .where(eq(images.id, id));

  if (rows.length === 0) return null;

  const image = rows[0]?.image;
  if (!image) return null;

  const recipients = rows
    .map((r) => {
      const name = r.facebook || r.instagram;
      if (!name) return null;

      return {
        name,
        isDelivered: r.isDelivered ?? false,
      };
    })
    .filter((r): r is { name: string; isDelivered: boolean } => Boolean(r));

  const uniqueMap = new Map<string, { name: string; isDelivered: boolean }>();

  for (const recipient of recipients) {
    if (!recipient) continue;

    const existing = uniqueMap.get(recipient.name);

    if (!existing) {
      uniqueMap.set(recipient.name, recipient);
    } else {
      existing.isDelivered = existing.isDelivered || recipient.isDelivered;
    }
  }
  return {
    ...image,
    recipients: Array.from(uniqueMap.values()),
  };
}
