function DataModel(data) {
  this._data = data;
}

DataModel.prototype = {
  getData: function() {
    var self = this;

    if(self._data !== undefined) {
      return new Promise(function(resolve, reject) {
        resolve(self._data);
      });
    }

    return self.loadData();
  },
  loadData: function() {
    return new Promise(function(resolve, reject) {
      var self = this;
      var baseUrl = 'http://api.fixer.io/',
        defaultOptions = {
          url: baseUrl + 'latest'
        };

      $.ajax({
        url: defaultOptions.url,
        dataType: 'json',
      }).done(function(data) {
        self._data = data;
        resolve(self._data);
      }).fail(function() {
        reject();
      });
    });
  }
};
