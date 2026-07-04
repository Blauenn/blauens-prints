import type { InputHTMLAttributes } from "react";

function handleFilterClick() {
  console.log("Button clicked");
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Button({ label }: Props) {
  return (
    <button
      type="button"
      onClick={handleFilterClick}
      className="flex items-center justify-center px-4 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 cursor-pointer"
    >
      <span className="text-sm text-gray-500">{label}</span>
    </button>
  );
}
