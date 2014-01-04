/*global yeomanExample, Backbone, JST*/

yeomanExample.Views = yeomanExample.Views || {};

(function () {
  'use strict';

  yeomanExample.Views.TaskCollectionView = Backbone.View.extend({

    tagName: 'ul',
    initialize: function() {
      this.collection.on('add', this.addNew, this);
      this.collection.on('change', this.updateCount, this);
      this.collection.on('destroy', this.updateCount, this);
    },
    render: function() {
      this.collection.each(function(task) {
        var taskView = new yeomanExample.Views.TaskView({ model: task });
        this.$el.append(taskView.render().el);
      }, this);
      this.updateCount();
      return this;
    },
    addNew: function(task) {
      var taskView = new yeomanExample.Views.TaskView({ model: task });
      this.$el.append(taskView.render().el);
      $('#title').val('');
      this.updateCount();
    },
    updateCount: function() {
      var uncompletedTasks = this.collection.filter(function(tasks) {
        return !tasks.get('completed');
      });
      $('#count').html(uncompletedTasks.length);
    }

  });

})();
