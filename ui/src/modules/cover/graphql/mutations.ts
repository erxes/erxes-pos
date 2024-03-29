import { gql } from '@apollo/client';

const addEditParamDefs = `
    $beginDate: Date
    $description: String
    $details: JSON
    $endDate: Date
    $status: String
    $userId: String
`;

const addEditParams = `
    beginDate: $beginDate
    description: $description
    details: $details
    endDate: $endDate
    status: $status
    userId: $userId
`;

const coversAdd = gql`
  mutation CoversAdd(
    ${addEditParamDefs}
  ) {
    coversAdd(
     ${addEditParams}
    ) {
      _id
    }
  }
`;

const coversEdit = gql`
  mutation CoversEdit(
    $id: String!
    ${addEditParamDefs}
  ) {
    coversEdit(
      _id: $id
      ${addEditParams}
    ) {
      _id
    }
  }
`;

const coversConfirm = gql`
  mutation CoversConfirm($id: String!) {
    coversConfirm(_id: $id) {
      _id
    }
  }
`;

const coversDelete = gql`
  mutation CoversRemove($id: String!) {
    coversRemove(_id: $id)
  }
`;

const mutations = { coversAdd, coversEdit, coversConfirm, coversDelete };

export default mutations;
