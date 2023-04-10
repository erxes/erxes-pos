import { gql } from '@apollo/client';

const covers = gql`
  query Covers(
    $endDate: Date
    $page: Int
    $perPage: Int
    $startDate: Date
    $userId: String
  ) {
    covers(
      endDate: $endDate
      page: $page
      perPage: $perPage
      startDate: $startDate
      userId: $userId
    ) {
      _id
      beginDate
      createdAt
      createdBy
      createdUser {
        _id
      }
      description
      details {
        _id
        paidDetail
        paidSummary {
          _id
          amount
          kind
          kindOfVal
          value
        }
        paidType
      }
      endDate
      modifiedAt
      modifiedBy
      user {
        _id
      }
      userId
      modifiedUser {
        _id
      }
    }
  }
`;

const queries = { covers };

export default queries;
