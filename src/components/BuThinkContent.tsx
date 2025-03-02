import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, CircleCheckBig, Maximize2, LoaderCircle } from 'lucide-react';
import { getSteps } from "../service/chat";

interface Step {
  text: string;
  isDone: boolean;
}

interface MarkdownContentProps {
  buThinkContent: string;
  steps: Step[];
  isEnd: boolean;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ buThinkContent, steps }) => {

  // const [steps, setSteps] = useState<Step[]>([]);
  const [isEnd, setIsEnd] = useState(false);
  const stepsEndRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   getSteps({ setSteps, setIsEnd });
  // }, [])

  useEffect(() => {
    if (stepsEndRef.current) {
      stepsEndRef.current.scrollTop = stepsEndRef.current.scrollHeight;
    }
  }, [steps]); 

  return (
    <div
      className="relative border-2  border-[hsl(222,0%,86%,0.38)] rounded-2xl overflow-clip transition-[height_1000ms,width_1000ms] mb-4 md:-mx-4 h-[500px] "
    >
      <div className="absolute text-secondary w-full h-full overflow-y-clip flex">
        <div className="sidebar relative flex flex-col w-2/5 h-full overflow-auto bg-[hsl(40_18%_97%)]">
          <div className="title pt-4 pb-2 relative overflow-visible">
            <div className="flex flex-col items-start gap-0 text-base space-x-0 z-30 duration-200 focus:outline-none focus-within:outline-none">
              <div className="flex h-full px-4 items-center justify-start text-primary">
                <div className="flex gap-1 items-center overflow-hidden">
                  <div className="flex items-center justify-center"><Search size={18} /></div>
                  <span className="text-lg text-nowrap font-medium whitespace-nowrap">DeepSearch</span>
                </div>
              </div>
              <div className="flex items-center justify-center text-nowrap my-0 pl-10 leading-04 text-xs">
                <span className="text-secondary font-medium">61 Sources</span>
              </div>
            </div>
            <div className="absolute left-0 top-[100%] w-full h-5 bg-custom-gradient z-50 from-background"></div>
          </div>
          <div
            className="w-full h-full overflow-y-auto overflow-x-hidden scroll-gutter-stable no-scrollbar"
            style={{ scrollbarWidth: "none", scrollbarGutter: "stable both-edges" }}
            ref={stepsEndRef}
          >
            <div className="relative">
              <div className="relative z-20 flex flex-col px-4 w-full" >
                {
                  steps.map((item, idx) => {
                    return (
                      <div key={idx} className={`w-full pt-3 ${idx === steps.length - 1 ? 'pb-0' : 'pb-3'}`}>
                        <div className="flex items-start gap-2 group/header cursor-pointer">
                          <div className="flex items-center relative top-[2px] bg-[hsl(40_18%_97%)]">
                            {
                              item.isDone ? (
                                <CircleCheckBig size={21} className="text-primary opacity-60 group-hover/header:opacity-100" />
                              ) : (
                                <LoaderCircle size={21} className="text-primary opacity-60 group-hover/header:opacity-100 animate-spin" />
                              )
                            }
                          </div>
                          <div className="flex items-center text-white">
                            <div className="text-base text-primary font-medium max-w-full leading-6 opacity-60 group-hover/header:opacity-100">
                              {item.text}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div className="absolute left-[26px] flex items-center justify-center top-0 pt-6 z-10 h-full">
                <div className="w-0.5 bg-secondary/20 h-full"></div>
              </div>
            </div>
          </div>
          <div className="pt-3 pb-2 px-3 relative overflow-visible">
            <div className="flex items-center justify-start">
              <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium leading-[normal] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-default [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:-mx-0.5 text-primary hover:bg-button-ghost-hover h-8 w-8 rounded-full opacity-20 hover:opacity-100">
                <Maximize2 size={18}/>
              </div>
            </div>
          </div>
        </div>
        {/* 右侧内容 operator */}
        <div className="gap-3 relative min-h-full w-full h-full">

        </div>
      </div>
    </div>
  );
};

export default MarkdownContent;