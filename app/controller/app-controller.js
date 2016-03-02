var AppController = (function() {
  'use strict';

  function Component() {
    var model = new DataModel();
    model.getData()
      .then(function(data) {
        console.log(1, data);

        TemplateCache.renderTemplate('rates', data)
          .then(function(partial) {
            $(document.body).append(partial);
          });
      })
      .then(function() {
        return model.getData();
      })
      .then(function(data) {
        console.log(2, data);
      });
  }

  return Component;

})();
