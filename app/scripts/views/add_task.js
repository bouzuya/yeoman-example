/*global yeomanExample, Backbone, JST*/

yeomanExample.Views = yeomanExample.Views || {};

(function () {
  'use strict';

  yeomanExample.Views.AddTaskView = Backbone.View.extend({

    el: '#addTask',
    events: {
      'submit': 'submit'
    },
    submit: function(e) {
      e.preventDefault();
      var task = new yeomanExample.Models.TaskModel();
      if (task.set({ title: $('#title').val() }, { validate: true })) {
        this.collection.add(task);
        $('#error').empty();
      }
    }

  });

})();
