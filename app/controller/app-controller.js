var AppController = (function() {
  'use strict';

  function Component() {
    var model = new DataModel();
    model.getData()
      .then(function(data) {
        console.log(1, data);
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
