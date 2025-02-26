import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import TicketCard from './cards/ticket';
import rehypeReact from 'rehype-react';

const markdownContent = `
# 标题

段落内容。

<div class="not-prose bg-red-500 h-9">
 ${ <TicketCard />}
</div>

更多段落内容。
`;

const MarkdownRenderer = () => (
  <ReactMarkdown
    children={markdownContent}
    rehypePlugins={[rehypeRaw, rehypeReact]}
  />
);

export default MarkdownRenderer;