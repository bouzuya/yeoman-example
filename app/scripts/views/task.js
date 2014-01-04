/*global yeomanExample, Backbone, JST*/

yeomanExample.Views = yeomanExample.Views || {};

(function () {
  'use strict';

  yeomanExample.Views.TaskView = Backbone.View.extend({

    template: JST['app/scripts/templates/task.ejs'],
    initialize: function() {
      this.model.on('destroy', this.remove, this);
      this.model.on('change', this.render, this);
    },
    events: {
      'click .delete': 'destroy',
      'click .toggle': 'toggle'
    },
    render: function() {
      var template = this.template(this.model.toJSON());
      this.$el.html(template)
      return this;
    },
    destroy: function() {
      if (confirm('are you sure?')) {
        this.model.destroy();
      }
    },
    toggle: function() {
      this.model.set('completed', !this.model.get('completed'));
    },
    remove: function() {
      this.$el.remove();
    }

  });

})();
