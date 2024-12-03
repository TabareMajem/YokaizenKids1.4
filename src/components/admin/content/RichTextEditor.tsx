import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';
import { CodeNode } from '@lexical/code';
import { QuoteNode } from '@lexical/rich-text';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

type Props = {
  content: string;
  onChange: (content: string) => void;
};

const theme = {
  paragraph: 'mb-2',
  heading: {
    h1: 'text-3xl font-bold mb-4',
    h2: 'text-2xl font-bold mb-3',
    h3: 'text-xl font-bold mb-2'
  },
  list: {
    ul: 'list-disc list-inside mb-4',
    ol: 'list-decimal list-inside mb-4'
  },
  quote: 'border-l-4 border-gray-200 pl-4 italic my-4'
};

const initialConfig = {
  namespace: 'KokoroQuestEditor',
  theme,
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    LinkNode,
    CodeNode,
    QuoteNode
  ],
  onError: (error: Error) => {
    console.error('Editor Error:', error);
  }
};

export default function RichTextEditor({ content, onChange }: Props) {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative min-h-[400px] border border-gray-300 rounded-lg">
        <RichTextPlugin
          contentEditable={
            <ContentEditable 
              className="min-h-[400px] p-4 focus:outline-none prose prose-sm max-w-none" 
            />
          }
          placeholder={
            <div className="absolute top-4 left-4 text-gray-400">
              Start writing your content...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
      </div>
    </LexicalComposer>
  );
}