/*global yeomanExample, $*/


window.yeomanExample = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';

        var Task = Backbone.Model.extend({
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
        var Tasks = Backbone.Collection.extend({ model: Task });
        var TaskView = Backbone.View.extend({
          tagName: 'li',
          initialize: function() {
            this.model.on('destroy', this.remove, this);
            this.model.on('change', this.render, this);
          },
          events: {
            'click .delete': 'destroy',
            'click .toggle': 'toggle'
          },
          template: _.template($('#task-template').html()),
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
        var TasksView = Backbone.View.extend({
          tagName: 'ul',
          initialize: function() {
            this.collection.on('add', this.addNew, this);
            this.collection.on('change', this.updateCount, this);
            this.collection.on('destroy', this.updateCount, this);
          },
          render: function() {
            this.collection.each(function(task) {
              var taskView = new TaskView({ model: task });
              this.$el.append(taskView.render().el);
            }, this);
            this.updateCount();
            return this;
          },
          addNew: function(task) {
            var taskView = new TaskView({ model: task });
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
        var AddTaskView = Backbone.View.extend({
          el: '#addTask',
          events: {
            'submit': 'submit'
          },
          submit: function(e) {
            e.preventDefault();
            var task = new Task();
            if (task.set({ title: $('#title').val() }, { validate: true })) {
              this.collection.add(task);
              $('#error').empty();
            }
          }
        });

        var tasks = new Tasks([
          { title: 'task1', completed: true },
          { title: 'task2' },
          { title: 'task3' }
        ]);

        var addTaskView = new AddTaskView({ collection: tasks });
        var tasksView = new TasksView({ collection: tasks });
        $('#tasks').html(tasksView.render().el);
    }
};

$(document).ready(function () {
  'use strict';
  yeomanExample.init();
});
