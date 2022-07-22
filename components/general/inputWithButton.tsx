import React, { ChangeEventHandler, useState } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  formClass?: string;
  buttonClass?: string;
  children?: React.ReactNode;
  onChange?: (...args: any) => any;
  onSend: (...args: any) => any;
}
export const InputWithButton: React.FC<Props> = ({
  children,
  buttonClass,
  formClass,
  onSend,
  onChange,
  ...props
}) => {
  const [currentInput, setCurrentInput] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCurrentInput(e.target.value);
    if (onChange) onChange(e);
  };

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSend(currentInput, e);
    setCurrentInput("");
  };
  return (
    <form className={formClass} onSubmit={(e) => handleSend(e)}>
      <input
        onChange={(e) => handleChange(e)}
        {...props}
        value={currentInput}
      />
      <button className={buttonClass}>{children}</button>
    </form>
  );
};
