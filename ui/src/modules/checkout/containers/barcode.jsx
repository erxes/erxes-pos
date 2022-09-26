import BarCode from 'react-barcode';

const Barcode = ({ putResponse }) => {
  if (!putResponse) {
    return null;
  }

  return (
    <>
      {putResponse.billId ? (
        <div className="barcode">
          <BarCode value={putResponse.billId} />
        </div>
      ) : null}
    </>
  );
};

export default Barcode;
