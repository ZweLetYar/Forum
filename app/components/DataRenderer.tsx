import React from "react";
import { AlertTriangle, SearchX } from "lucide-react";

function DataRenderer({
  success,
  data,
  errorMessage,
  render,
}: {
  success: boolean;
  data: any[];
  errorMessage?: string | undefined;
  render: (data: any[]) => React.ReactNode;
}) {
  if (!success) {
    return (
      <div className="flex flex-col items-center gap-2 py-10 text-center text-red-500">
        <AlertTriangle className="w-9 h-9" />
        <p className="font-medium">{errorMessage || "Something went wrong."}</p>
      </div>
    );
  }

  if (success && data?.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-10 text-center text-gray-500">
        <SearchX className="w-9 h-9" />
        <p className="font-medium">No data found.</p>
      </div>
    );
  }

  return <div>{render(data)}</div>;
}

export default DataRenderer;
