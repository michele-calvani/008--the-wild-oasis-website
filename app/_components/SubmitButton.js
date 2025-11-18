"use client";
import { useFormStatus } from "react-dom";
import SpinnerForm from "./SpinnerForm";

export default function SubmitButton({ children, pendingLabel }) {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 flex items-center justify-center"
      disabled={pending}
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <SpinnerForm />
          {pendingLabel}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
