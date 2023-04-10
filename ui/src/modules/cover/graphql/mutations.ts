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

const mutations = { coversAdd };

export default mutations;
