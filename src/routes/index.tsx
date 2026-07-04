import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getImagesList } from "#/server/images";

import { ImagesTable } from "#/components/ImagesTable";
import InputField from "#/components/ui/inputs/InputField";
import Button from "#/components/ui/buttons/Button";

const fetchImages = createServerFn().handler(async () => {
  return getImagesList();
});

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { data: images } = useSuspenseQuery({
    queryKey: ["images"],
    queryFn: () => fetchImages(),
  });

  const [search, setSearch] = useState("");

  const filteredImages = images.filter((image) =>
    image.recipients.some((recipient) =>
      recipient.name.toLowerCase().includes(search.toLowerCase()),
    ),
  );

  return (
    <div className="p-6">
      <div className="flex flex-row gap-2 mb-4">
        <InputField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label="Search"
          id="table-search"
        />
        <Button label="Filter" />
      </div>

      <ImagesTable images={filteredImages} />
    </div>
  );
}
