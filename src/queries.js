import { gql } from '@apollo/client';

export const GET_CANDIDATES = gql`
  query {
    candidates {
      id
      name
      type
    }
  }
`;
