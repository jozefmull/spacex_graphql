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

export const getLaunchDetails = graphql(/* GraphQL */`
  query getLaunchDetails($id: ID!){
    launch(id: $id) {
      id
      details
      launch_date_utc
      launch_success
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
      }
      links {
        video_link
        wikipedia
      }
      mission_name
    }
  }
`)

