import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    keyForAttribute: function(key) {
      return key;
    },

    keyForRelationship: function(key, relationship, method) {
      return key;
    },

    normalizeResponse(store, primaryModelClass, payload, id, requestType) {
      let array = [];
      let key;

      payload.forEach(function(element, index) {
        let json = {};
        json["attributes"] = {};
        let payloadElement = payload[index];

        for (key in element) {
          switch (key) {
            case "id":
                json[key] = payloadElement[key];
                break;
            case "type":
                json[key] = payloadElement[key];
                break;
            case "relationships":
                json[key] = payloadElement[key];
                break;
            default:
                json.attributes[key] = payloadElement[key];
                break;
          }
        }
        array.push(json);
      }); 
     
      return {data: array}
    },
});