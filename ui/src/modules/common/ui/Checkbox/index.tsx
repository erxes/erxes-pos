interface CheckboxProps {
  htmlFor?: string;
}

const Checkbox = ({ htmlFor }: CheckboxProps) => {
  return (
    <label htmlFor={htmlFor} className="checkbox">
      <input type="checkbox" />
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkbox;
