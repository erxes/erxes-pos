import styled from "styled-components";
import { colors } from "modules/common/styles";

export const HeaderWrapper = styled.div`
  .receipt-logo,
  h5 {
    text-align: center;
  }

  h5 {
    font-size: 16px;
    margin: 10px 0;
  }
`;

export const ReceiptWrapper = styled.div`
  width: 300px;
  padding: 15px;
  color: #000;
  background-color: ${colors.colorWhite};
  font-size: 11px;

  .block {
    border-bottom: 1px dashed #666;
    padding-bottom: 5px;
    margin-bottom: 3px;
  }

  img {
    max-width: 100%;
    max-height: 120px;
  }

  p {
    font-size: 11px;
    margin-bottom: 0;
  }

  b {
    font-weight: 500;
    margin-right: 3px;
  }

  button {
    flex: 1;
    padding: 4px 15px;
  }

  .text-center {
    text-align: center;
  }

  table {
    width: 100%;

    td {
      max-width: 100px;
      line-height: 12px;
      padding-right: 4px;
    }

    .totalCount {
      padding: 0;
      text-align: right;
    }
  }
`;

export const AmountContainer = styled.div`
  p {
    display: flex;
    justify-content: space-between;
  }
`;

export const FooterWrapper = styled(AmountContainer)`
  button {
    margin-top: 15px;
  }
`;
