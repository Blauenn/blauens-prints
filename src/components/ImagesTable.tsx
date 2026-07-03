import { argv0 } from "process";

type ImageTableItem = {
  id: number;
  categoryId: number;
  number: number;
  recipients: string[];
};

type Props = {
  images: ImageTableItem[];
};

export function ImagesTable({ images }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
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
          {images.map((image) => (
            <tr key={image.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-gray-500">
                {image.categoryId}-{image.number}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">
                {image.recipients.length > 0
                  ? image.recipients.join(", ")
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
