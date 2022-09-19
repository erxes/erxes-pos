export interface IEbarimt {
  type: '' | 'individual' | 'organization';
  setType: React.Dispatch<React.SetStateAction<IEbarimt['type']>>;
}
