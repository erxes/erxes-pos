import FormItem, { useFormItemCtx } from './Item';

interface IForm {
  onSubmit?: (e: any) => void;
  children: JSX.Element | JSX.Element[];
}

const Form = ({ onSubmit, children }: IForm) => {
  const handleSubmit = (e: any) => {
    return onSubmit && onSubmit(e.target.value);
  };

  return <form onSubmit={handleSubmit}>{children}</form>;
};

export { FormItem, useFormItemCtx };

export default Form;
