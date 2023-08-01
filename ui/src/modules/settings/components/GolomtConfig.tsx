import useGolomt from 'modules/checkout/containers/golomtCard/useGolomt';
import Button from 'modules/common/ui/Button';
import Input from 'modules/common/ui/Input';
import { getLocal, setLocal } from 'modules/utils';
import { useState } from 'react';
import { toast } from 'react-toastify';

const GolomtConfig = () => {
  const [terminalID, setTerminalID] = useState(getLocal('golomtId') || '');
  const { golomtInfo } = useGolomt();

  if (!golomtInfo) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTerminalID(terminalID);
    setLocal('golomtId', terminalID);
    toast.success('Амжилттай');
  };

  return (
    <form className="golomt-config" onSubmit={handleSubmit}>
      <div className="golomt-config__item">
        <label htmlFor="terminalID">Golomt Terminal ID</label>
        <Input
          id="terminalID"
          value={terminalID}
          onChange={(value) => setTerminalID(value)}
        />
      </div>
      <Button type="submit" className="golomt-config__submit">
        Хадгалах
      </Button>
    </form>
  );
};

export default GolomtConfig;
