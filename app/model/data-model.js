var DataModel = (function() {
  'use strict';

  function Component(data) {
    this._data = data;
  }

  Component.prototype = {
    getData: function(bustCache) {
      var self = this;

      return new Promise(function(resolve, reject) {
        if(self._data !== undefined && !bustCache) {
          console.log('cached');
          resolve(self._data);
          return;
        }

        loadData()
          .then(function(data) {
            self._data = data;
            resolve(self._data);
          });
      });
    },
  };

  return Component;

  ///////////////////

  function loadData() {
    return new Promise(function(resolve, reject) {
      var BASE_URL = 'http://api.fixer.io/',
        defaultOptions = {
          url: BASE_URL + 'latest'
        };

      $.ajax({
        url: defaultOptions.url,
        dataType: 'json',
      }).done(function(data) {
        resolve(data);
      }).fail(function() {
        reject();
      });
    });
  }
})()
