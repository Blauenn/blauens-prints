import { categoriesColorMap } from "#/constants/images";
import { Link } from "@tanstack/react-router";

type ImageTableItem = {
  id: number;
  categoryId: number;
  number: number;
  recipients: {
    name: string[];
    isDelivered: boolean;
  };
};

type Props = {
  images: ImageTableItem[];
};

export function ImagesTable({ images }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase w-16">
              #
            </th>

            <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase">
              Recipient(s)
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {images.length > 0 ? (
            images.map((image) => (
              <Link
                to="/image/$id"
                params={{ id: String(image.id) }}
                className="contents"
              >
                <tr
                  key={image.id}
                  className={`${image.recipients.every((recipient) => recipient.deliveredAt !== null) ? "bg-green-200" : ""}`}
                >
                  <td className="pl-3 pr-1 py-2 text-sm font-mono">
                    <div
                      className={`px-2 py-1 rounded-lg text-center ${categoriesColorMap[image.categoryId]}`}
                    >
                      {image.number}
                    </div>
                  </td>

                  <td className="px-4 py-2 text-sm text-gray-900">
                    {image.recipients.length > 0
                      ? image.recipients
                          .map((recipient) => recipient.name)
                          .join(", ")
                      : "-"}
                  </td>
                </tr>
              </Link>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="px-4 py-2 text-sm text-gray-500">
                No images found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
