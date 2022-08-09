import PosHeader from './PosHeader';

type Props = {
  children: any;
};

function PosLayout({ children }: Props) {
  return (
    <>
      <PosHeader />
      <main className="pos-container">{children}</main>
    </>
  );
}

export default PosLayout;
