import clsx from 'clsx';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '聊天元件劃分',
};

const ChatPage = () => {
  return (
    <div className='container mx-auto my-12 max-w-xl space-y-8'>
      <ChatRecord />
      <ChatText />
      <pre>
        {`
Page(ChatPage)
  
  ChatRecord
    ChatLine
      ChatAvatar
      ChatMessage
    ChatText
      TextInput
      TextButton
        `}
      </pre>
    </div>
  );
};
export default ChatPage;

const ChatRecord = () => {
  return (
    <div className='space-y-5'>
      <ChatLine />
      <ChatLine me />
      <ChatLine />
      <ChatLine me />
      <ChatLine />
      <ChatLine me />
    </div>
  );
};

const ChatLine = ({ me = false }: { me?: boolean }) => {
  return (
    <div className={clsx('flex gap-2', me && 'flex-row-reverse')}>
      <ChatAvatar />
      <ChatMessage />
    </div>
  );
};

const ChatAvatar = () => {
  return (
    <div className='h-10 w-10 rounded-full border border-solid border-gray-500 bg-orange-50'></div>
  );
};

const ChatMessage = () => {
  return (
    <div className='bg-green grow rounded border border-solid border-slate-700'></div>
  );
};

const ChatText = () => {
  return (
    <div className='flex gap-2'>
      <TextInput />
      <TextButton />
    </div>
  );
};

const TextInput = () => {
  return (
    <input
      className='grow rounded-md border border-solid border-slate-500 px-2 py-1'
      autoFocus
      placeholder='Type a message...'
    />
  );
};

const TextButton = () => {
  return (
    <button className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 hover:bg-orange-300'>
      +
    </button>
  );
};
