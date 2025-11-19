interface LabelProps {
  htmlFor: string;
  label: string;
  children: string | React.ReactNode;
  title?: string;
  classes?: string;
  onClick?: () => void;
}

const Label: React.FC<LabelProps> = ({ htmlFor, label, title, onClick, children, classes }) => {
  
  
  return (
    <label
      htmlFor={htmlFor}
      title={title}
      className={`flex flex-col gap-2 cursor-pointer select-none bg-white dark:bg-slate-800 p-2 rounded ${classes}`}
      onClick={onClick}>
      <div>
        {label}
      </div>
      {children}
    </label>
  );
};

export default Label;