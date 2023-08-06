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
        email
        username
      }
      status
      description
      endDate
      modifiedAt
      modifiedBy
      modifiedUser {
        _id
        email
        username
      }
    }
  }
`;

const coverDetail = gql`
  query CoverDetail($id: String!) {
    coverDetail(_id: $id) {
      _id
      beginDate
      createdAt
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
    }
  }
`;

const coverAmounts = gql`
  query CoverAmounts($id: String, $endDate: Date) {
    coverAmounts(_id: $id, endDate: $endDate)
  }
`;

const queries = { covers, coverDetail, coverAmounts };

export default queries;
