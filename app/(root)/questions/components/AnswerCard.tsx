import React from "react";
import Image from "next/image";
import Preview from "@/app/components/Preview";

function timeAgo(date?: string | number) {
  if (!date) return "just now";
  const d = typeof date === "number" ? new Date(date) : new Date(date);
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  const intervals: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
    [1, "second"],
  ];
  for (const [sec, name] of intervals) {
    const value = Math.floor(seconds / sec);
    if (value >= 1) return `${value} ${name}${value > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

export default function AnswerCard({ answer }: { answer: any }) {
  const accepted = Boolean(answer?.accepted);

  return (
    <article
      className={`max-w-none rounded-xl p-4 mb-4 border ${
        accepted
          ? "border-emerald-500 bg-[#062018]"
          : "border-[#243041] bg-[#0b1117]"
      }`}
    >
      <div className="flex gap-4">
        {/* Votes + accept column */}
        <div className="flex flex-col items-center w-14 text-center">
          <button
            className={`w-10 h-10 flex items-center justify-center rounded-md ${
              accepted
                ? "bg-emerald-600 text-white"
                : "bg-[#0f1724] text-gray-300"
            }`}
            aria-label="upvote"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M3 11h14l-7-8-7 8z" />
            </svg>
          </button>

          <div className="my-2 font-semibold text-gray-100">
            {answer?.upvotes ?? 0}
          </div>

          <button
            className="w-10 h-10 flex items-center justify-center rounded-md bg-[#0f1724] text-gray-300"
            aria-label="downvote"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M17 9H3l7 8 7-8z" />
            </svg>
          </button>

          {accepted && (
            <div className="mt-2 text-emerald-400" title="Accepted answer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Content column */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={answer?.author?.image || "/default-avatar.png"}
                width={40}
                height={40}
                className="rounded-full"
                alt={answer?.author?.name || "author"}
              />

              <div>
                <div className="text-sm font-medium text-gray-100">
                  {answer?.author?.name || "Unknown"}
                </div>
                <div className="text-xs text-gray-400">
                  {timeAgo(answer?.createdAt)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="text-xs px-3 py-1 rounded bg-[#0f1724] text-gray-300 hover:bg-[#172033]">
                Share
              </button>
              <button className="text-xs px-3 py-1 rounded border border-gray-700 text-gray-200">
                Comment
              </button>
            </div>
          </div>

          <div className="mt-3 text-gray-200">
            {answer?.content ? (
              <Preview content={answer.content} />
            ) : (
              <p className="text-gray-400">No content</p>
            )}
          </div>

          <div className="mt-4 flex items-center gap-3 text-sm text-gray-400">
            <div>edited {timeAgo(answer?.updatedAt ?? answer?.createdAt)}</div>
            <div>·</div>
            <div>{answer?.commentsCount ?? 0} comments</div>
          </div>
        </div>
      </div>
    </article>
  );
}
