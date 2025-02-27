interface Message {
  role: "user" | "assistant";
  content: string;
}

export const sendMessages = async (message: string, setMessages: (value: React.SetStateAction<Message[]>) => void) => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: message })
  });

  if (!response.body) throw new Error("No response body");

  const reader = response.body.getReader();
  let assistantMessage: Message = { role: "assistant", content: "" };
  setMessages((prev) => [...prev, assistantMessage]);
  
  const decoder = new TextDecoder();
  let newContent = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    newContent += decoder.decode(value, { stream: true });
    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = { ...assistantMessage, content: newContent };
      return updated;
    });
  }

  return newContent;
}

interface getMessageProps {
  setAction: (value: string) => void;
  filename: string;
  tokenLimit?: number;
  setIsEnd: () => void;
}

export const getMessage = async ({ setAction, filename, tokenLimit = 10, setIsEnd }: getMessageProps) => {
  const response = await fetch(`/${filename}`);

  const text = await response.text()
  const textArray: string[] = []
  for (let index = 0; index < text.length; index += tokenLimit) {
    textArray.push(text.slice(index, index + tokenLimit)); // 按 tokenLimit 截取每个部分
  }
  console.log('text', text);
  console.log('textArray', textArray);
  let index = 0;
  let done = false;
  let content = ''

  while (!done) {
    content += textArray[index]
    await new Promise(resolve => {
      setTimeout(() => {
        setAction(content)
        resolve(null)
      }, 100)
    })

    index += 1;
    done = index >= textArray.length
  }
  setIsEnd()
};

interface getMarkdownStreamProps extends getMessageProps {
  setIsEnd: () => void
  setContent: (msg:string) => void
}

export const getMarkdownStream = async ({ setAction, filename, setIsEnd, setContent }: getMarkdownStreamProps) => {
  const response = await fetch(`/${filename}`);
  if (!response.ok) {
    throw new Error('文件加载失败');
  }
  const responseTxt = await response.text();

  const streamArray = responseTxt.split(/(?=(任务描述: .+?操作步骤:|\*\*步骤\d+ – \[.*?\]))/)
  const validSteps = streamArray.filter(item => {
    return /描述/.test(item) && /目标/.test(item) && /预期结果/.test(item);
  });

  const addLineBreaks = (text: string) => {
    return text.replace(/\n/g, '  \n');  // Markdown 换行需要两个空格+换行
  };

  const desc = streamArray.shift() as string;
  setAction(desc);
  await new Promise(resolve => setTimeout(resolve, 2000));
  let content = ''
  while (validSteps.length > 0) {
    const token = validSteps.shift() as string;
    content += addLineBreaks(token);
    setAction(addLineBreaks(token));
    setContent(content)
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  setIsEnd()
}


export const getMdxMessage = async ({ setAction, filename }: getMessageProps) => {
  const response = await fetch(`/${filename}`)
  if (!response.ok) {
    throw new Error('文件加载失败')
  }

  const content = await response.text()

  const streamArray = content.split(/(?=(## .+))/)

  while(streamArray.length > 0) {
    const token = streamArray.shift() as string
    if (token.includes('[机票卡片]')) {
      token.replace('[机票卡片]', '')
    }
    setAction(token)
    await new Promise(resolve => setTimeout(resolve, 3000))
  }
}

interface getStepsProps {
  setSteps: (value: Step[]) => void;
  setIsEnd: (value: boolean) => void;
}

interface Step {
  text: string;
  isDone: boolean;
}

const steps = [
  { text: "分析航班价格", isDone: false },
  { text: "调整搜索策略", isDone: false },
  { text: "评估航班成本", isDone: false },
  { text: "规划景点行程", isDone: false },
  { text: "优化行程安排", isDone: false },
  { text: "细化行程安排", isDone: false },
  { text: "调整行程细节", isDone: false },
  { text: "确定行程成本", isDone: false },
  { text: "优化酒店选择", isDone: false },
  { text: "完善行程细节", isDone: false },
  { text: "优化每日活动", isDone: false }
];

export const getSteps = async ({ setSteps, setIsEnd }: getStepsProps) => {
  let index = 1;
  let done = false;
  let content: Step[] = [{ text: "Thinking", isDone: true }, { text: "规划旅行指南", isDone: false }]
  setSteps(content)

  while (!done) {
    content = [...content, steps[index]]

    await new Promise(resolve => {
      setTimeout(() => {
        content[index].isDone = true
        setSteps(content)
        resolve(null)
      }, 2000)
    })

    index += 1;
    done = index >= steps.length
  }

  setTimeout(() => {
    content[index].isDone = true
    setSteps(content)
  }, 1000)
  setIsEnd(true)
} 