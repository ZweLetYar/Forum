"use client";
import React, { useState } from "react";

export default function QuestionVote({
  questionId,
  initialUpvotes = 0,
  initialDownvotes = 0,
  initialUserVote = null,
}: {
  questionId: string;
  initialUpvotes?: number;
  initialDownvotes?: number;
  initialUserVote?: string | null;
}) {
  const [upvotes, setUpvotes] = useState(initialUpvotes ?? 0);
  const [downvotes, setDownvotes] = useState(initialDownvotes ?? 0);
  const [userVote, setUserVote] = useState<string | null>(
    initialUserVote ?? null
  );
  const [loading, setLoading] = useState(false);

  const send = async (voteType: "upvote" | "downvote") => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/questions/${questionId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voteType }),
      });
      const json = await res.json();
      if (json?.success && json.data) {
        setUpvotes(json.data.upvotes ?? upvotes);
        setDownvotes(json.data.downvotes ?? downvotes);
        setUserVote(json.data.userVote ?? null);
      } else {
        // handle error (optional toast)
        console.error(json?.message || "Failed to vote");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <button
          aria-label="upvote"
          onClick={() => send("upvote")}
          className={`px-3 py-1 rounded-md ${
            userVote === "upvote"
              ? "bg-sky-500 text-white"
              : "bg-[#0f1724] text-gray-300"
          }`}
          disabled={loading}
        >
          ▲
        </button>
        <div className="text-sm font-semibold text-gray-100">{upvotes}</div>
        <button
          aria-label="downvote"
          onClick={() => send("downvote")}
          className={`px-3 py-1 rounded-md ${
            userVote === "downvote"
              ? "bg-rose-600 text-white"
              : "bg-[#0f1724] text-gray-300"
          }`}
          disabled={loading}
        >
          ▼
        </button>
      </div>
    </div>
  );
}
