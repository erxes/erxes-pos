import { IComponent } from 'modules/types';
import { useConfigsContext } from './Configs';
import { useMutation, gql } from '@apollo/client';
import { mutations, queries } from '../graphql';
import Select from 'ui/Select';

const ChooseConfig: IComponent = () => {
  const { currentConfig, configs } = useConfigsContext();

  const [chooseConfig, { loading }] = useMutation(gql(mutations.chooseConfig), {
    refetchQueries: [{ query: gql(queries.currentConfig) }, 'currentConfig'],
  });

  const handleChange = (value: string) => {
    return chooseConfig({ variables: { token: value } });
  };

  if (!configs || configs.length < 2) return null;

  return (
    <>
      <label>Choose pos</label>
      <Select
        value={currentConfig.token}
        onChange={handleChange}
        loading={loading}
      >
        {(configs || []).map(({ token, name }: any) => (
          <option key={token} value={token}>
            {name} - {token}
          </option>
        ))}
      </Select>
    </>
  );
};

export default ChooseConfig;
