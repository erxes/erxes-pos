import { useQuery, gql } from '@apollo/client';
import { queries } from 'modules/checkout/graphql';
import Select from 'ui/ReactSelect';
import { useApp } from 'modules/AppContext';

const SlotChoose = () => {
  const { data, loading } = useQuery(gql(queries.slots));
  const { slotCode, setSlotCode } = useApp();

  const slots = ((data || {}).poscSlots || []).map(
    ({ code = '', name = '' }: { code: string; name: string }) => ({
      value: code,
      label: name,
    })
  );

  return (
    <div className="slot-choose">
      <Select
        options={slots}
        isLoading={loading}
        isClearable
        className="react-select"
        value={slots.find(({ value }: any) => value === slotCode) || ''}
        onChange={(value: any) => setSlotCode(value.value)}
      ></Select>
    </div>
  );
};

export default SlotChoose;
