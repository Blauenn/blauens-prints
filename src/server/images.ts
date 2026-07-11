import { db } from "#/server/db/client";
import { desc, sql, eq } from "drizzle-orm";

import { images } from "#/server/db/schema/images";
import { deliveries } from "#/server/db/schema/deliveries";
import { people } from "#/server/db/schema/people";

export async function getImagesList() {
  return db.select().from(images).orderBy(desc(images.id));

  // This needs to be rebuilt
}

export type ImagesListItem = Awaited<ReturnType<typeof getImagesList>>[number];

export async function getImageById(id: number) {
  return await db.select().from(images).where(eq(images.id, id));

  // This needs to be rebuilt
}
