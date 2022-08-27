import { createContext, useState, useContext } from 'react';

interface IFormItem {
  label: string;
  name: string;
  children: JSX.Element | JSX.Element[];
  required?: boolean;
  type?: string;
}

const FormItemContext = createContext<any>(null);

export const useFormItemCtx = () => useContext(FormItemContext);

const FormItem = ({ label, name, children, required, type }: IFormItem) => {
  return (
    <FormItemContext.Provider value={{ required, name }}>
      <label htmlFor={name}>{label}</label>
      {children}
    </FormItemContext.Provider>
  );
};

export default FormItem;
