import { FC, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const { placeholder, id, type, name } = props;
  return (
    <div>
      <label
        className="label label-text"
        htmlFor={id}
      >
        {name}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="input input-bordered input-secondary w-full"
        {...props}
      />
    </div>
  );
};

export const TextArea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = (
  props
) => {
  const { placeholder, id, name } = props;
  return (
    <div>
      <label
        className="label label-text"
        htmlFor={id}
      >
        {name}
      </label>

      <textarea
        id={id}
        placeholder={placeholder}
        className="textarea textarea-secondary w-full  h-40"
        {...props}
      />
    </div>
  );
};
