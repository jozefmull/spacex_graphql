import { graphql } from '../src/gql'
 
export const getLaunches = graphql(/* GraphQL */ `
  query getLaunches($limit: Int!, $offset: Int!) {
    launchesPast(limit: $limit, offset: $offset) {
      details
      id
      launch_date_utc
      rocket {
        rocket_name
      }
      launch_site {
        site_name
      }
      launch_success
      mission_id
      mission_name
    }}
`)

