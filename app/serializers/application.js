import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    keyForAttribute: function(key) {
      return key;
    },

    keyForRelationship: function(key, relationship, method) {
      return key;
    },

    serialize(snapshot, options) {
      let json = this._super(...arguments);

      let newJson = json.data;

      return json;
    },
});