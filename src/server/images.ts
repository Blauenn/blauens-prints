import { db } from "#/server/db/client";
import { images } from "#/server/db/schema/images";
import { deliveries } from "#/server/db/schema/deliveries";
import { people } from "#/server/db/schema/people";
import { desc, sql, eq } from "drizzle-orm";

export async function getImagesList() {
  return db
    .select({
      id: images.id,
      categoryId: images.categoryId,
      number: images.number,

      recipients: sql<string[]>`
      COALESCE(
	  array_agg(
	      CASE
		WHEN ${people.facebook} IS NOT NULL AND ${people.facebook} != ''
		THEN ${people.facebook}
		ELSE ${people.instagram}
	      END
	  ) FILTER (WHERE ${people.id} IS NOT NULL),
	  ARRAY[]::text[]
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
