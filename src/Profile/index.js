import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import RepositoryList from "../Repository";
import Loading from "../Loading";

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  {
    viewer {
      repositories(first: 5, orderBy: { direction: DESC, field: STARGAZERS }) {
        edges {
          node {
            id
            name
            url
            descriptionHTML
            primaryLanguage {
              name
            }
            owner {
              login
              url
            }
            stargazers {
              totalCount
            }
            viewerHasStarred
            watchers {
              totalCount
            }
            viewerSubscription
          }
        }
      }
    }
  }
`;

const Profile = () => (
  <Query query={GET_REPOSITORIES_OF_CURRENT_USER}>
    {({ data, loading }) => {
      if (loading) {
        return <Loading />;
      }

      if (data) {
        console.log("data: ", data);
        const { viewer } = data;
        console.log("viewer: ", viewer);
        return <RepositoryList repositories={viewer.repositories} />;
      }
    }}
  </Query>
);

export default Profile;
