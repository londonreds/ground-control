import Relay from 'react-relay'

export default class SaveEventFile extends Relay.Mutation {
  static fragments = {
    event: () => Relay.QL`
      fragment on Event {
        id,
        eventIdObfuscated
      }
    `
  };

  getMutation() {
    return Relay.QL`
      mutation{ saveEventFile }
    `;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on SaveEventFilePayload {
        event {
          id
        },
      }
    `;
  }

  getConfigs() {
    console.log(this.props)
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        event: this.props.event.id
      }
    }];
  }

  getVariables() {
    const { fileName, fileTypeSlug, mimeType, key } = this.props
    return {
      sourceEventId: this.props.event.eventIdObfuscated,
      fileName,
      fileTypeSlug,
      mimeType,
      key
    }
  }
}
