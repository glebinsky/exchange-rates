var AppController = (function() {
  'use strict';

  function Component() {
    var model = new DataModel();
    model.getData()
      .then(function() {
        renderView('currency-selector', model.data)
        renderView('exchange-rate-view', model.data)
      })
      .catch(function() {
        renderView('error');
      });
  }

  return Component;

  ///////////

  function renderView(view, data) {
    TemplateCache.renderTemplate(view, data)
      .then(function(partial) {
        $('.main-view').append(partial);
      });
  }

})();
