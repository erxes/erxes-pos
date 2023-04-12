import { gql } from '@apollo/client';

const coversAdd = gql`
  mutation CoversAdd(
    $beginDate: Date
    $description: Date
    $details: JSON
    $endDate: Date
    $status: String
    $userId: String
  ) {
    coversAdd(
      beginDate: $beginDate
      description: $description
      details: $details
      endDate: $endDate
      status: $status
      userId: $userId
    ) {
      _id
    }
  }
`;

const coversEdit = gql`
  mutation CoversEdit(
    $id: String!
    $userId: String
    $status: String
    $endDate: Date
    $details: JSON
    $description: Date
    $beginDate: Date
  ) {
    coversEdit(
      _id: $id
      userId: $userId
      status: $status
      endDate: $endDate
      details: $details
      description: $description
      beginDate: $beginDate
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

const mutations = { coversAdd, coversEdit, coversConfirm };

export default mutations;
