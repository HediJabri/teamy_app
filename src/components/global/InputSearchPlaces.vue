<template>
  <input placeholder="Adresse du lieu" type="search" id="form-input-location" />
</template>
<script>
export default {
  name: 'InputSearchPlaces',
  mounted () {
    let places = require('places.js');
    let placesAutocomplete = places({
      container: document.querySelector('#form-input-location'),
      language: 'fr',
      countries: ['fr'],
      type: 'address',
      templates: {
        value: function (suggestion) {
          return `${suggestion.name}, ${suggestion.city}`;
        }
      }
    });
    placesAutocomplete.on('change', function resultSelected (e) {
      this.$emit('addLocationGeoloc', e.suggestion.latlng)
    }.bind(this));
  },
}
</script>
<style lang="scss">
.algolia-places {
  margin-top: 10px;
}
.ap-input {
  border: 1px solid #dcdfe6;
}
.ap-nostyle-input-icon {
  color: #dcdfe6;
}
.ap-input:hover {
  border-color: #c0c4cc;
}
.ap-input::placeholder {
  color: #c0c4cc;
}
.ap-suggestion {
  text-align: left;
}
</style>
