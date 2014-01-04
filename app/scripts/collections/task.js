/*global yeomanExample, Backbone*/

yeomanExample.Collections = yeomanExample.Collections || {};

(function () {
    'use strict';

    yeomanExample.Collections.TaskCollection = Backbone.Collection.extend({

        model: yeomanExample.Models.TaskModel

    });

})();
