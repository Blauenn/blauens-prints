import { nearestApertureStop } from "#/functions/aperture";
import { formatShutterSpeed } from "#/functions/exposureTime";
import { getImageById } from "#/server/images";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/image/$id")({
  component: RouteComponent,
});

const fetchImage = createServerFn()
  .validator((id: number) => id)
  .handler(async ({ data }) => {
    return getImageById(data);
  });

function RouteComponent() {
  const { id } = Route.useParams();

  const { data: image } = useSuspenseQuery({
    queryKey: ["image", id],
    queryFn: () => fetchImage({ data: Number(id) }),
  });

  if (!image) {
    return (
      <div className="p-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl">:(</h1>
          <h1 className="text-xl">Image not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-row justify-between items-center mb-6">
        <Link to="/">
          <h1 className="text-blue-500 text-md font-bold">« Return</h1>
        </Link>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 font-mono">
          <div className="flex flex-row justify-between">
            <h1 className="text-sm opacity-50">
              {image.createdAt &&
                new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "short",
                  timeZone: "Asia/Bangkok",
                }).format(new Date(image.createdAt))}
            </h1>
            <h1 className="text-sm opacity-50">
              {image.createdAt &&
                new Intl.DateTimeFormat("en-GB", {
                  timeStyle: "medium",
                  timeZone: "Asia/Bangkok",
                }).format(new Date(image.createdAt))}
            </h1>
          </div>
          <img
            src={image.imageUrl}
            alt={image.filename}
            className="w-full max-h-[60vh] object-contain rounded-xl"
          />
          <div className="flex flex-row justify-between">
            <h1 className="text-sm opacity-50">{image.shotFocalLength}mm</h1>
            <h1 className="text-sm opacity-50">
              {formatShutterSpeed(image.exposureTime)}s
            </h1>
            <h1 className="text-sm opacity-50">
              f/{nearestApertureStop(image.aperture)}
            </h1>
            <h1 className="text-sm opacity-50">ISO {image.iso}</h1>
          </div>
        </div>
        <div className="">
          <div className="">
            <h1 className="text-sm opacity-50 mb-2">Recipients</h1>
            <div className="flex flex-col gap-2">
              {image.recipients.map((recipient, index) => (
                <h1 key={index} className="text-2xl font-bold">
                  {recipient.name}
                </h1>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
