import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <svg
        className="animate-spin h-10 w-10 mb-3 rounded-full border-t-2 border-blue-500  border-r-2 border-solid border-l-2 border-transparent"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="blue"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="blue"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM16 4.708A7.963 7.963 0 0120 12h4c0-6.627-5.373-12-12-12v4z"
        ></path>
      </svg>
    </div>
  );
}
