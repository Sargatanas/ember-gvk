import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    keyForAttribute: function(key) {
      return key;
    },

    keyForRelationship: function(key) {
      return key;
    },

    normalizeResponse(store, primaryModelClass, payload, id, requestType) {
      /* debugger */

      let array = [];
      let included = [];
      let key;
      let type;

      for (let index = 0; index < payload.length; index++) {
        let element = payload[index];
        let json = {};
        json["attributes"] = {};
        let payloadElement = payload[index];

        for (key in element) {
          switch (key) {
            case "id":
                json[key] = payloadElement[key];
                break;
            case "type":
                type = payloadElement[key];
                json[key] = payloadElement[key];
                break;
            case "relationships":
                json[key] = payloadElement[key];
                break;
            case "included":
                payloadElement[key].forEach((includedElement) => {
                  included.push(includedElement); 
                });                
                break;
            default:
                json.attributes[key] = payloadElement[key];
                break;
          }
        }

        array.push(json);
      }
     
      return {
        data: array,
        included: included
      };
    },
});