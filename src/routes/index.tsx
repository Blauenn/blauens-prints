import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getImagesList } from "#/server/images";

import { ImagesTable } from "#/components/ImagesTable";

const fetchImages = createServerFn().handler(async () => {
  return getImagesList();
});

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { data: images } = useSuspenseQuery({
    queryKey: ["images"],
    queryFn: () => fetchImages(),
  });

  return (
    <div className="p-8">
      <ImagesTable images={images} />
    </div>
  );
}
