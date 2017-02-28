import React from 'react';
import {
  Panel,
  PanelHeading,
  PanelBody,
  Row,
  InputGroup,
  InputGroupAddon,
} from '../Grid';
import Icon from '../Icon';
import {
  graphql,
} from 'react-apollo';
import gql from 'graphql-tag';
import {
  Link,
} from 'react-router';
import ResultPanel from '../ResultPanel';

class EventContainer extends React.Component {
  render() {
    const { loading, viewer } = this.props.data;
    return (
      <Row>
        <div className="col-sm-12">
          <h2>
            <Icon icon="calendar"/> <Link to="/events">Events</Link>
            {
              !loading ?
                ` / ${viewer.event.title}`
              :
                <i className="fa fa-spinner fa-spin fa-3x fa-fw></i>" />
            }
          </h2>
        </div>
        <div className="col-sm-12">
          <Panel>
            <PanelHeading>
            </PanelHeading>
            <PanelBody>
              <Row>
                <div className="col-lg-3 col-md-6">
                  <InputGroup>
                    <InputGroupAddon>
                      Start Date:
                    </InputGroupAddon>
                    <input
                      className="form-control"
                      type="text"
                      value={!loading ? viewer.event.startdate : 'Loading'}
                      disabled={true}
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-4 col-md-6">
                  <InputGroup>
                    <InputGroupAddon>
                      Sanction Number:
                    </InputGroupAddon>
                    <input
                      className="form-control"
                      type="text"
                      value={!loading ? viewer.event.sanctionnumber : 'Loading'}
                      disabled={true}
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-5 col-md-12">
                  <InputGroup>
                    <InputGroupAddon>
                      Event GUID:
                    </InputGroupAddon>
                    <input
                      className="form-control"
                      type="text"
                      value={!loading ? viewer.event.eventguid : 'Loading'}
                      disabled={true}
                    />
                  </InputGroup>
                </div>
              </Row>
            </PanelBody>
          </Panel>
        </div>
        <div className="col-sm-12">
          {
            !loading
            ?
              <ResultPanel users={viewer.event.results.edges} />
            :
            <i className="fa fa-spinner fa-spin fa-3x fa-fw></i>" />
          }
        </div>
      </Row>
    )
  }
}

const Event = gql`
  query Event($id: ID!) {
    viewer {
      event(id: $id) {
        id
        eventguid,
        title,
        startdate,
        sanctionnumber,
        organization {
          id
          name
        }
        results {
          edges {
            node {
              id
              person {
                first
                last
                middle
              }
              win
              loss
              draw
              elo
              change
            }
          }
        }
      }
    }
  }
`

export default graphql(Event, {
  options: ({ routeParams: { eventId } }) => ({
    variables: {
      id: eventId
    }
  })
})(EventContainer);
