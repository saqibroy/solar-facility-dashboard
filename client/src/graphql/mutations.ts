import { gql } from '@apollo/client'

export const CREATE_FACILITY = gql`
  mutation CreateFacility($name: String!, $nominalPower: Int!) {
    createFacility(name: $name, nominalPower: $nominalPower) {
      id
      name
      nominalPower
    }
  }
`

export const DELETE_FACILITY = gql`
  mutation DeleteFacility($id: ID!) {
    deleteFacility(id: $id)
  }
`

export const UPDATE_FACILITY = gql`
  mutation UpdateFacility($id: ID!, $name: String!, $nominalPower: Int!) {
    updateFacility(id: $id, name: $name, nominalPower: $nominalPower) {
      id
      name
      nominalPower
    }
  }
`

export const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`

export const SIGN_UP = gql`
  mutation SignUp($username: String!, $password: String!) {
    signUp(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`
