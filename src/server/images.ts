import { db } from "#/server/db/client";
import { desc, sql, eq } from "drizzle-orm";

import { images } from "#/server/db/schema/images";
import { people } from "#/server/db/schema/people";
import { printJobs } from "./db/schema";

export async function getImagesList() {
  return db
    .select({
      id: images.id,
      categoryId: images.categoryId,
      number: images.number,
      thumbnail_url: images.thumbnailUrl,

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
              'deliveredAt', ${printJobs.deliveredAt}
            )
          ) FILTER (WHERE ${people.id} IS NOT NULL),
          '[]'::json
        )
      `,
    })
    .from(images)
    .leftJoin(printJobs, eq(printJobs.imageId, images.id))
    .leftJoin(people, eq(people.id, printJobs.personId))
    .groupBy(images.id)
    .orderBy(desc(images.id));
}

export type ImagesListItem = Awaited<ReturnType<typeof getImagesList>>[number];

export async function getImageById(id: number) {
  const rows = await db
    .select({
      image: images,
      person: {
        facebook: people.facebook,
        facebookHandle: people.facebookHandle,
        instagram: people.instagram,
      },
    })
    .from(images)
    .leftJoin(printJobs, eq(printJobs.imageId, images.id))
    .leftJoin(people, eq(people.id, printJobs.personId))
    .where(eq(images.id, id));

  if (rows.length === 0) return null;

  const image = rows[0].image;
  if (!image) return null;

  const recipients = rows
    .map((row) => {
      const name = row.person.facebook || row.person.instagram;

      if (!name) return null;

      return {
        name,
        facebookHandle: row.person.facebookHandle,
      };
    })
    .filter(
      (recipient): recipient is { name: string; facebookHandle: string } =>
        recipient !== null,
    );

  return {
    ...image,
    recipients,
  };
}
