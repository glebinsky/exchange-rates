var DataModel = (function() {
  'use strict';

  function Component() { }

  Component.prototype.getData = function() {
    var self = this;

    return new Promise(function(resolve, reject) {
      loadData()
        .then(function(data) {
          self.data = Object.assign({}, data);
          self.data.currencies = createCurrencies(data);
          resolve();
        })
        .catch(function() {
          reject();
        });
    });
  };

  return Component;

  ///////////////////
  
  function createCurrencies(data) {
    var currencies = Object.keys(data.rates);
    currencies.push(data.base);
    return currencies;
  }

  function loadData(config) {
    return new Promise(function(resolve, reject) {
      var BASE_URL = 'http://api.fixer.io/',
        url,
        newConfig,
        defaultConfig = {
          base: 'USD'
        };

      newConfig = Object.assign({}, defaultConfig, config);

      url = BASE_URL + 'latest?base=' + newConfig.base;
      
      url += newConfig.symbols ? '&symbols=' + newConfig.symbols : '';

      $.ajax({
        url: url,
        dataType: 'json',
      }).done(function(data) {
        resolve(data);
      }).fail(function() {
        reject();
      });
    });
  }
})()
