import { gql } from '@apollo/client'

export const GET_FACILITIES = gql`
  query GetFacilities {
    facilities {
      id
      name
      nominalPower
    }
  }
`

export const GET_PERFORMANCE_DATA = gql`
  query GetPerformanceData($facilityId: ID!) {
    performanceData(facilityId: $facilityId) {
      id
      timestamp
      activePower
      energy
    }
  }
`

export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
    }
  }
`
