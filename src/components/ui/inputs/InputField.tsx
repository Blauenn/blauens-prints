import type { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function InputField({ label, id, ...props }: InputFieldProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 px-4 py-2 w-full">
      <input id={id} className="w-full" placeholder="Search" {...props} />
    </div>
  );
}
