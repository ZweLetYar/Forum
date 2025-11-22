import React from "react";
import Image from "next/image";
import Preview from "@/app/components/Preview";

export default function AnswerCard({ answer }: { answer: any }) {
  return (
    <article className="max-w-none bg-[#0b1117] rounded-xl p-6 mb-4 border border-[#243041]">
      <div className="flex gap-4">
        <div className="hidden sm:flex flex-col items-center text-center w-16">
          <div className="text-lg font-semibold text-sky-500">
            {answer?.upvotes ?? 0}
          </div>
          <div className="text-xs text-gray-400">votes</div>
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src={answer?.author?.image || "/default-avatar.png"}
                width={36}
                height={36}
                className="rounded-full"
                alt={answer?.author?.name || "author"}
              />
              <div>
                <div className="font-medium text-gray-100">
                  {answer?.author?.name || "Unknown"}
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(answer?.createdAt || Date.now()).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm bg-sky-500 hover:bg-sky-600 text-white rounded">
                Accept
              </button>
              <button className="px-3 py-1 text-sm border border-gray-700 text-gray-200 rounded">
                Reply
              </button>
            </div>
          </div>

          <div className="mt-4 text-gray-200">
            {answer?.content ? (
              <Preview content={answer.content} />
            ) : (
              <p>No content</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
