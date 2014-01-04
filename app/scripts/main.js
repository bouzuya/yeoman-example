/*global yeomanExample, $*/


window.yeomanExample = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
      'use strict';

      // models
      var tasks = new yeomanExample.Collections.TaskCollection([
        { title: 'task1', completed: true },
        { title: 'task2' },
        { title: 'task3' }
      ]);

      // views
      var addTaskView = new yeomanExample.Views.AddTaskView({ collection: tasks });
      var tasksView = new yeomanExample.Views.TaskCollectionView({ collection: tasks });

      // render
      $('#tasks').html(tasksView.render().el);
    }
};

$(document).ready(function () {
  'use strict';
  yeomanExample.init();
});
