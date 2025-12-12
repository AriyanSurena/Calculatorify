import { useToast } from '../Context/useToast';

interface SectionHeaderProps {
  children: React.ReactNode,
  isCopyOn?: boolean,
  toastMessage?: string,
  classes?: string,
}
type TextChipProps = React.FC<SectionHeaderProps>

const TextChip: TextChipProps = ({
  toastMessage,
  isCopyOn,
  children,
  classes
}) => {
  // @ts-ignore
  const { toast, setToast } = useToast();

  const handleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void = (e) => {
    if (isCopyOn) {
      try {
        navigator.clipboard.writeText(e.currentTarget.innerText)
        setToast({
          type: 'success',
          duration: 2000,
          message: toastMessage ?? 'Content copied successfully.'
        })
      } catch {
        setToast({
          type: 'error',
          duration: 2000,
          message: toastMessage ?? 'The copy process failed.'
        })
      }
    }
  }

  return (
    <div
      className={`
          w-full
          text-center 
          p-2
          rounded
          transition-all
          duration-300
          bg-white
          dark:bg-slate-700 
          text-black
          dark:text-white
          ${isCopyOn ? 'cursor-pointer hover:shadow-lg active:dark:bg-slate-800 hover:opacity-90' : 'select-none'}
      ${classes}}`}
      onClick={(e) => { handleClick(e) }}
    >
      {children}
    </div>
  );
};

export default TextChip;