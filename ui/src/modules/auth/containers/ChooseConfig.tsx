import { IComponent } from 'modules/types';
import { useConfigsContext } from './Configs';
import { useMutation, gql, useQuery } from '@apollo/client';
import { mutations, queries } from '../graphql';
import Select from 'ui/Select';
import Loading from 'ui/Loading';

const ChooseConfig: IComponent = () => {
  const { currentConfig } = useConfigsContext();

  const { data, loading: loadingConfigs } = useQuery(gql(queries.configs));

  const [chooseConfig, { loading }] = useMutation(gql(mutations.chooseConfig), {
    refetchQueries: [{ query: gql(queries.currentConfig) }, 'currentConfig'],
  });

  const handleChange = (value: string) => {
    return chooseConfig({ variables: { token: value } });
  };

  if (loadingConfigs) return <Loading />;

  const { configs } = data || {};

  if (!configs || configs.length < 2) return null;

  return (
    <>
      <label>Choose pos</label>
      <Select
        value={currentConfig.token}
        onChange={handleChange}
        loading={loading || loadingConfigs}
      >
        {data &&
          (data.configs || []).map(({ token, name }: any) => (
            <option key={token} value={token}>
              {name} - {token}
            </option>
          ))}
      </Select>
    </>
  );
};

export default ChooseConfig;
