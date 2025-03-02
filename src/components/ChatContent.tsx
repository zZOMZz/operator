import { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeReact from 'rehype-react';
// import TicketCard from "./cards/ticket";
import { TicketCard, HotelComparisonCard } from "@/components/cards";
import { getMessage, getMarkdownStream, getMdxMessage, getSteps } from "@/service/chat";
import s from './index.module.scss'
import React from "react";
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from "motion/react";
import BuThinkContent from "./BuThinkContent";



export interface Message {
  role: "user" | "assistant";
  content: string;
  detection?: string
}

interface ChatContentProps {
  messages: Message[]
}

interface Step {
  text: string;
  isDone: boolean;
}

const tagesName = ['hotelcard', 'ticketcard', 'code']

export const ChatContent: React.FC<ChatContentProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState<string>('')
  const [isMessageEnd, setIsMessageEnd] = useState<boolean>(false)

  const [buThink, setBuThink] = useState<string>('')
  const [buThinkContent, setBuThinkContent] = useState<string>('')
  const [showBuThink, setShowBuThink] = useState<boolean>(true)
  
  const [isBuThinkEnd, setIsBuThinkEnd] = useState<boolean>(false)
  const [isOperatorEnd, setIsOperatorEnd] = useState<boolean>(false)
  
  const [think, setThink] = useState<string>('')
  const [isThinkEnd, setIsThinkEnd] = useState<boolean>(false)
  const [showThink, setShowThink] = useState<boolean>(true)

  const [isVisible, setIsVisible] = useState(false)
  const [mdxContent, setMdxContent] = useState<string>('')

  const thinkRef = useRef<HTMLDivElement>(null)
  const [thinkHeight, setThinkHeight] = useState<number>(0)

  const [steps, setSteps] = useState<Step[]>([]);
  const [isButinkEnd, setIsEnd] = useState(false);

  useEffect(() => {
    scrollToView()
  }, [messages]);

  useEffect(() => {
    if (thinkRef.current) {
      setThinkHeight(thinkRef.current.scrollHeight)
      console.log('thinkRef.current.scrollHeight', thinkRef.current.scrollHeight);
    }
  }, [think])

  const scrollToView = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    const fetchData = async () => {

      // await getMarkdownStream(
      //   {
      //     setAction: handleBuThink,
      //     filename: 'bu_think.md',
      //     setIsEnd: handleBuThinkEnd,
      //     setContent: handleBuThinkContent
      //   }
      // )

      await getSteps({ setSteps, setIsEnd });

      await getMessage({ setAction: handleThink, filename: 'trip_think.md', setIsEnd: handleThinkEnd })

      await getMessage({ setAction: handleMessages, filename: 'trip(2).md', setIsEnd:handleMessageEnd })
    }

    fetchData()
  }, [])

  const handleMessages = (msg: string) => {
    setMdxContent(msg)
    scrollToView()
  }

  const components = {
    img: (props: any) => <img style={{ borderRadius: '8px' }} {...props} />,
    ticketcard: () => <TicketCard />,
    hotelcard: () => <HotelComparisonCard />,
    code: ({ node, inline, className, children, ...props }: any) => {
      return (
        <span
          className="text-sm px-1 rounded-sm !font-mono bg-red-400/10 text-rust dark:bg-dawn/10 dark:text-dawn"
          {...props}
        >
          {children}
        </span>
      );
    },
    p: ({ node, children }: any) => {
      if (
        node.children.length === 1 &&
        tagesName.includes(node.children[0].tagName)
      ) {
        return <>{children}</>;
      }
      return <p>{children}</p>;
    },
  };

  const handleBuThink = (msg: string) => {
    setBuThink(msg)

    setIsVisible(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 1500)
  }

  const handleBuThinkEnd = () => {
    setIsBuThinkEnd(true)
  }

  const handleBuThinkContent = (msg: string) => {
    setBuThinkContent(msg)
  }

  const handleThink = (msg: string) => {
    setThink(msg)
    scrollToView()
  }

  const handleThinkEnd = () => {
    setIsThinkEnd(true)
    setShowThink(false)
  }

  const handleMessageEnd = () => {
    setIsMessageEnd(true)
  }

  return (
    <div className="flex-1 w-full overflow-y-auto scrollbar-transparent scrollbar-custom flex items-center flex-col">
      {messages.map((msg) => (
        <div className="w-[80%]">
          <div className="m-auto text-base py-[18px] px-6">
            <div className="group/conversation-turn relative flex w-full min-w-0 flex-col">
              <div className="flex-col gap-1 md:gap-3">
                {
                  msg.role === 'assistant' ? (
                    <div className="flex max-w-full flex-col">
                      {/* <span className="block first:mt-0 relative my-1.5">
                        <button style={{ opacity: 1 }}>
                          <div className="flex items-center justify-start gap-1">
                            <AnimatePresence mode="wait">
                              {isBuThinkEnd ? (
                                <motion.div
                                  key="generated"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.3 }}
                                  onClick={() => setShowBuThink(!showBuThink)}
                                  className="cursor-pointer flex flex-row"
                                >
                                  <span className="text-start">已生成浏览计划, 持续20秒</span>
                                  <ChevronDown
                                    className={`transition-transform duration-300 ${showBuThink ? "rotate-180" : "rotate-0"}`}
                                  />
                                </motion.div>
                              ) : (
                                <motion.span
                                  key="loading"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className={s['loading-shimmer']}
                                >
                                  正在生成浏览计划中...
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>
                        </button>
                      </span> */}
                      
                      <div className="relative order-2 flex w-full flex-col items-start">
                        <div className="w-full relative break-words text-black text-opacity-90 dark:text-white dark:text-opacity-90">
                          <div className="markdown prose max-w-none break-words dark:prose-invert light">
                            <div className={`pl-4 md:pl-7 relative transition-all mb-8 `}>
                              <BuThinkContent buThinkContent={buThinkContent} steps={steps} isEnd={isButinkEnd} />
                            </div>
                            {/* 3. think输出内容 */}
                            <AnimatePresence>
                            {
                              think && (
                                <>
                                  {
                                    isThinkEnd ? (
                                      <div onClick={() => { setShowThink(!showThink) }} className="cursor-pointer flex flex-row">
                                        <span className="text-start">已思考, 持续30秒</span>
                                        <ChevronDown className={`transition-transform duration-300 ${showThink ? "rotate-180" : "rotate-0"}`} />
                                      </div>
                                    ) : (
                                      <span className={s['loading-shimmer']}>正在思考中...</span>
                                    )
                                  }
                                  <div className="pl-4 md:pl-7 relative transition-all ">
                                    <div className="absolute bottom-4 left-0 top-2 w-1 rounded-full bg-black/10 h-full"></div>
                                    <div
                                      className="relative transition-all duration-300 w-full text-[#5d5d5d]"
                                      ref={thinkRef}
                                    >
                                      <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        children={think}
                                        className={`${showThink ? `max-h-[2000px] opacity-100` : "max-h-0 opacity-0 overflow-hidden"} overflow-auto transition-all duration-500`}
                                      />
                                    </div>
                                  </div>
                                </>
                              )
                            }
                            </AnimatePresence>

                            {/* 4. 正文输入内容 */}
                            <ReactMarkdown
                              children={mdxContent}
                              components={components}
                              remarkPlugins={[remarkGfm]}
                              rehypePlugins={[rehypeRaw, rehypeReact]}
                              className={`pt-8 relative transition-all `}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex flex-col items-end">
                      <div className="order-1 flex max-w-[60%] flex-col items-end rounded-3xl px-5 py-3 bg-[hsla(0,0%,91%,.5)]">
                        <div className="relative break-words text-black text-opacity-90 dark:text-white dark:text-opacity-90">
                          <div className="prose max-w-none break-words dark:prose-invert light">
                            {msg.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

