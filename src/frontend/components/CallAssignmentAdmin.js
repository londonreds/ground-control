import React from 'react';
import Relay from 'react-relay';
import CallAssignmentList from './CallAssignmentList';
import SideBarLayout from './SideBarLayout';
import RelayViewHelpers from './helpers/relay-view-helpers';
import {RaisedButton} from 'material-ui';
import CallAssignment from './CallAssignment';
import CallAssignmentCreationForm from './CallAssignmentCreationForm';

class CallAssignmentAdmin extends React.Component {
  render() {
    let contentView = RelayViewHelpers.contentViewFromId(this.props.relay.variables.id,
      <CallAssignmentCreationForm viewer={this.props.viewer} />,
      <CallAssignment callAssignment={this.props.viewer.callAssignment} />
    )
    let sideBar = (
      <div>
        <RaisedButton label="Create Assignment"
          fullWidth={true}
          primary={true}
          onTouchTap={() => this.props.history.pushState(null, '/admin/call-assignments/create')}
        />
        <CallAssignmentList
          callAssignmentList={this.props.viewer.callAssignmentList}
          subheader="Active Assignments"
          onSelect={(id) => this.props.history.pushState(null, '/admin/call-assignments/' + id)}
        />
      </div>
    )
    return (
      <SideBarLayout
        sideBar={sideBar}
        content={contentView}
      />
    )
  }
}

export default Relay.createContainer(CallAssignmentAdmin, {
  initialVariables: { id: null },

  prepareVariables: (prev) => RelayViewHelpers.variablesFromId(prev.id),

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        callAssignmentList(first:50) {
          ${CallAssignmentList.getFragment('callAssignmentList')}
        }
        callAssignment(id:$id) @include(if: $fetchItem) {
          ${CallAssignment.getFragment('callAssignment')}
        }
        ${CallAssignmentCreationForm.getFragment('viewer')}
      }
    `,
  },
});