import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const MarkdownContent = ({ buThinkContent }: { buThinkContent: string }) => {

  return (
    <div
      className="relative border-2 border-input-border rounded-2xl overflow-clip transition-[height_1000ms,width_1000ms] mb-4 md:-mx-4 h-[500px] "
    >
      <div className="absolute text-secondary w-full h-full overflow-y-clip flex">
        <div className="relative flex flex-col w-2/5 h-full overflow-auto">
          <div className="pt-4 pb-2 relative overflow-visible"></div>
          {/* { scroll-gutter-stable no-scrollbar } */}
          <div className="w-full h-full overflow-y-auto overflow-x-hidden scroll-gutter-stable no-scrollbar"></div>
          <div className="pt-1 pb-3 px-3 relative overflow-visible"></div>
        </div>
        <div className="gap-3 relative min-h-full w-full h-full">

        </div>
      </div>
    </div>
  );
};

export default MarkdownContent;