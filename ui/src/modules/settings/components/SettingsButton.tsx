import Button, { ButtonProps } from 'ui/Button';

const SettingsButton = (props: ButtonProps) => {
  return (
    <div className="col col-4">
      <Button {...props} variant="slim" />
    </div>
  );
};

export default SettingsButton;
