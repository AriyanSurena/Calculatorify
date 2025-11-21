import React, { useEffect, useState } from 'react';
import { useToast } from '../Context/useToast';
interface SectionHeaderProps {
  children: React.ReactNode,
  isCopyOn?: boolean,
  setMessage?: (value : string) => void
}

const TextChip: React.FC<SectionHeaderProps> = ({ setMessage, isCopyOn, children }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  // @ts-ignore
  const { toast, setToast } = useToast();
  useEffect(() => {
    if(setMessage) {
      if (isClicked) setMessage(`Copied To Clipboard. ✅`);
      else setMessage('');
    }
    const Timer = setTimeout(() => {
      isClicked && setIsClicked(!isClicked);
    }, 2000)
    return () => clearTimeout(Timer)
  }, [isClicked])

const handleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void = (e) => {
        setIsClicked(true);
        
          try {
            navigator.clipboard.writeText(e.currentTarget.innerText)
            setToast({
                type: 'success',
                duration: 2000,
                message: 'Content copied successfully.'
            })
        } catch {
            setToast({
                type: 'error',
                duration: 2000,
                message: 'The copy process failed.'
            })
        }
    }

  return (
    <>
      <div
        className={`
          w-full
          text-center 
          p-2
          rounded
          bg-white
          dark:bg-slate-700 
          text-black
          dark:text-white
          ${isCopyOn ? 'cursor-pointer hover:shadow-lg active:dark:bg-slate-800 hover:opacity-90' : 'select-none'}
          `}
          onClick={(e) => {handleClick(e)}}
      >
        {children}
      </div>
    </>
  );
};

export default TextChip;