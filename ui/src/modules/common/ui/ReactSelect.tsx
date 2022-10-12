import ReactSelect from 'react-select';
import { useConfigsContext } from 'modules/auth/containers/Configs';

const Select = ({ ...props }) => {
  const { primaryColor } = useConfigsContext();

  return (
    <ReactSelect
      {...props}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          //   text: 'orangered',
          primary25: primaryColor + '40',
          primary: primaryColor,
        },
      })}
    ></ReactSelect>
  );
};

export default Select;
