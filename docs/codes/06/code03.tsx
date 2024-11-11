"use client";
import type { Post } from "@/app/_types/Post";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import DOMPurify from "isomorphic-dompurify";

type Props = {
  post: Post;
};

const PostSummary: React.FC<Props> = (props) => {
  const { post } = props;
  const dtFmt = "YYYY-MM-DD";
  const safeHTML = DOMPurify.sanitize(post.content, {
    ALLOWED_TAGS: ["b", "strong", "i", "em", "u", "br"],
  });
  return (
    <div className="border border-slate-400 p-3">
      <div className="flex items-center justify-between">
        <div>{dayjs(post.createdAt).format(dtFmt)}</div>
        <div className="flex space-x-1.5">
          {post.categories.map((category) => (
            <div
              key={category.id}
              className={twMerge(
                "rounded-md px-2 py-0.5",
                "text-xs font-bold",
                "border border-slate-400 text-slate-500"
              )}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-1 text-lg font-bold">{post.title}</div>
      <div
        className="line-clamp-3"
        dangerouslySetInnerHTML={{ __html: safeHTML }}
      />
    </div>
  );
};

export default PostSummary;
