/*global yeomanExample, Backbone*/

yeomanExample.Models = yeomanExample.Models || {};

(function () {
  'use strict';

  yeomanExample.Models.TaskModel = Backbone.Model.extend({

    defaults: {
      title: 'do something',
      completed: false
    },
    validate: function(attrs) {
      if (_.isEmpty(attrs.title)) {
        return 'title must not be empty';
      }
    },
    initialize: function() {
      this.on('invalid', function(model, error) {
        $('#error').html(error);
      });
    }

  });

})();
