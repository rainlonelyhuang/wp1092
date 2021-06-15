import { gql } from '@apollo/client';

export const UPLOAD_MUTATION = gql`
  mutation insertPeople($data: [PersonInput!]) {
    insertPeople(data: $data)
  }
`;
