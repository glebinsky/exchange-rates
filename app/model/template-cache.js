var TemplateCache = (function() {
  'use strict';

  var tmpl_cache = {};

  return {
    renderTemplate: renderTemplate
  }

  ///////////////////
  
  function renderTemplate(tmpl_name, tmpl_data) {
    return new Promise(function(resolve, reject) {
      if (tmpl_cache[tmpl_name]) {
        resolve(getBoundPartial());

        return;
      }

      getExternalTemplate(tmpl_name)
        .then(function(template) {
          tmpl_cache[tmpl_name] = Handlebars.compile(template);

          resolve(getBoundPartial());
        });
    });

    /////////////

    function getBoundPartial() {
      return tmpl_cache[tmpl_name](tmpl_data || {});
    }
  }
  
  // http://stackoverflow.com/questions/8366733/external-template-in-underscore
  function getExternalTemplate(tmpl_name) {
    return new Promise(function(resolve, reject) {
      var tmpl_dir = '/app/view';
      var tmpl_url = tmpl_dir + '/' + tmpl_name + '.html';

      $.ajax({
        url: tmpl_url,
        method: 'GET'
      }).done(function(template) {
        resolve(template);
      }).fail(function() {
        reject();
      });
    });
 }

})();
