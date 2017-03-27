import React from 'react';
import {
  ListGroup,
  ListGroupItem
} from '../Grid';
import {
  graphql,
} from 'react-apollo';
import gql from 'graphql-tag';
import Icon from '../Icon'
import { Link } from 'react-router';
import update from 'immutability-helper';

const getSearchNodes = (edges) => {
  return edges.map((edge, i) => {
    const { node } = edge;
    switch(node.__typename) {
      case 'User':
        return (
          <ListGroupItem key={i}>
            <Icon icon="user" /> {node.last}, {node.first} {node.middle} ({
              node.leagues.edges[node.leagues.edges.findIndex((league) => league.node.leagueId.id === 'TGVhZ3VlOjU4Yjg1ZmYwYWIxZTk2MDAyMGRmN2RkYQ==')].node.elo
            })
            <ul>
              {
                node.leagues.edges.map((league, j) => (
                  <li key={j}><Link to={`/leagues/${league.node.leagueId.id}`}>{league.node.leagueId.title}</Link> - {league.node.elo}</li>
                ))
              }
            </ul>
          </ListGroupItem>
        )
      case 'Event':
        return (
          <ListGroupItem key={i}>
            <Icon icon="calendar" /> (Event) <Link to={`/events/${node.id}`}>{node.title}</Link> ({node.startdate})
            <ul>
              {
                node.results.edges.map((result, j) => (
                  <li key={j}>{j+1} - {result.node.win}/{result.node.loss}/{result.node.draw} - {result.node.person.last}, {result.node.person.first} {result.node.person.middle}</li>
                ))
              }
            </ul>
          </ListGroupItem>
        )
      case 'League':
        return (
          <ListGroupItem key={i}>
            <Icon icon="tasks" /> (League) <Link to={`/leagues/${node.id}`}>{node.title}</Link>
            <ul>
              {
                node.users.edges.map((result, j) => (
                  <li key={j}>{j+1} - {result.node.win}/{result.node.loss}/{result.node.draw} - {result.node.person.last}, {result.node.person.first} {result.node.person.middle} ({result.node.elo})</li>
                ))
              }
            </ul>
          </ListGroupItem>
        )
      case 'Organization':
        return (
          <ListGroupItem key={i}>
            <Icon icon="fort-awesome" /> <Link to={`/venues/${node.id}`}>{node.name}</Link>
            <ul>
              {
                node.leagues.edges.map((league, j) => (
                  <li key={j}><Link to={`/leagues/${league.node.id}`}>{league.node.title}</Link></li>
                ))
              }
            </ul>
          </ListGroupItem>
        )
      default:
        return (
          <ListGroupItem>
            <Icon icon="frown-o"/> No results found
          </ListGroupItem>
        )
    }
  })
}

const SearchList = ({ query, data: { viewer }, loadMoreResults }) => {
  return (
  <ListGroup>
    {
      viewer ?
        viewer.search.edges.length > 0 ?
          getSearchNodes(viewer.search.edges)
        : <ListGroupItem>
          <Icon icon="frown-o"/> No results found
        </ListGroupItem>
      : <ListGroupItem>
        <Icon icon="frown-o"/> No results found
      </ListGroupItem>
    }
    {
      viewer ?
        viewer.search.pageInfo.hasNextPage ?
        <ListGroupItem>
          <span
            className="btn btn-primary center-block"
            onClick={loadMoreResults}
          >
            Load More...
          </span>
        </ListGroupItem>
      : null : null
    }
  </ListGroup>
)}

const Search = gql`
  query Search(
    $query: String!,
    $cursor: String
  ) {
    viewer {
      search(first: 10, after: $cursor ,query: $query) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            ... on User {
              first
              middle
              last
              id
              leagues(last: 3) {
                edges {
                  node {
                    leagueId {
                      title
                      id
                    }
                    elo
                  }
                }
              }
            }
            ... on Event {
              title
              id
              startdate
              results(first: 3) {
                edges {
                  node {
                    person {
                      first
                      last
                      middle
                    }
                    win
                    loss
                    draw
                  }
                }
              }
            }
            ... on League {
              title
              id
              startdate
              enddate
              users(first: 3) {
                edges {
                  node {
                    person {
                      first
                      last
                      middle
                    }
                    win
                    loss
                    draw
                    elo
                  }
                }
              }
            }
            ... on Organization {
              name
              id
              leagues {
                edges {
                  node {
                    id
                    title
                  }
                }
              }
            }
            __typename
          }
        }
      }
    }
  }
`
export default graphql(Search, {
  options: ({ query }) => ({
    variables: {
      query
    }
  }),
  props({ data, data: { loading, viewer, fetchMore } }) {
    return {
      data,
      loadMoreResults: () => {
        return fetchMore({
          query: Search,
          variables: {
            cursor: viewer.search.pageInfo.endCursor,
            query: data.variables.query
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const { edges: newEdges, pageInfo } = fetchMoreResult.data.viewer.search;
            return update(
              data,
              {
                viewer: {
                  search: {
                    edges: {
                      $push: newEdges
                    },
                    pageInfo: {
                      $set: pageInfo
                    }
                  }
                }
              }
            )
          }
        })
      }
    }
  }
})(SearchList);
