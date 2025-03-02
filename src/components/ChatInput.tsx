import { Button } from "./ui/button"
import { useState, useRef, useEffect } from "react";
import { ArrowUp } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => Promise<void>
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [isEmpty, setIsEmpty] = useState(true);

  const inputRef = useRef<HTMLDivElement>(null);

  


  // 检测内容是否为空并更新占位符
  const updatePlaceholder = () => {
    const div = inputRef.current;
    if (!div) return;
    setIsEmpty(div.innerText.trim() === "")
    if (div.innerText.trim() === "") {
      setIsEmpty(true);
      div.innerHTML =
        '<p></p>';
    } else {
      setIsEmpty(false);
    }
  };

  const handleInput = () => {
    updatePlaceholder();
  };

  // 组件加载时初始化占位符
  useEffect(() => {
    updatePlaceholder();
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleUpload();
    }
  };

  const handleUpload = () => {
    if (!inputRef.current) return;
    const inputText = inputRef.current.innerText.trim();
    onSend(inputText);
    inputRef.current.innerHTML = "";
    updatePlaceholder();
  }

  const focusInput = () => {
    if (!inputRef.current) return;

    const el = inputRef.current;

    el.focus();

    // 创建 range 让光标移动到末尾
    const range = document.createRange();
    const selection = window.getSelection();

    if (selection) {
      range.selectNodeContents(el);
      range.collapse(false); // 光标放到最后
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };


  return (
    <form
      action=""
      className="w-full bg-transparent flex justify-center"
      onClick={focusInput}
    >
      <div className="relative flex z-[1] h-full max-w-[80%] flex-1 flex-col">
        <div className="group relative z-[1] flex w-full items-center">
          <div className="w-full">
            <div
              id="composer-background"
              className="flex w-full cursor-text flex-col rounded-3xl border border-gray-300 p-4 transition-colors contain-inline-size shadow-[0_9px_9px_0px_rgba(0,0,0,0.01),_0_2px_5px_0px_rgba(0,0,0,0.06)] bg-white pb-9"
            >
              <div className="flex min-h-[44px] items-start pl-1">
                <div className="min-w-0 max-w-full flex-1">
                  <div className="max-h-52 overflow-auto w-[90%]">
                    <div
                      ref={inputRef}
                      contentEditable="true"
                      translate="no"
                      id="prompt-textarea"
                      className={`my-2 outline-offset-2 outline-0 outline-transparent break-words whitespace-break-spaces flex ProseMirror relative ${isEmpty ? "empty " : ""}`}
                      onInput={handleInput}
                      onKeyDown={handleKeyDown}
                      data-placeholder="给 GPT 发送消息"
                    >
                    </div>
                  </div>
                  <div className="flex gap-x-1.5 absolute bottom-4 right-4">
                    <Button type="button" onClick={() => { handleUpload() }} className="flex size-9 items-center justify-center rounded-full transition-colors hover:opacity-70 bg-black text-white hover:bg-black" >
                      <ArrowUp />
                    </Button>
                  </div>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ChatInput