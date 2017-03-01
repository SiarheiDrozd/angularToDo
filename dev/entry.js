import TodoListCtrl from "./directives/todoList/todoListCtrl";
import Column from "./directives/column/columnsCtrl";

var todoApp = angular.module("ToDoApp", ["ngDragDrop"])
    .service("taskStateService", TaskStateService)
    .controller("todoListCtrl", ["$http", "$scope", TodoListCtrl])
    .controller("column", ["taskStateService", Column])
    .directive("todoList", function () {
        return {
            restrict: "AE",
            templateUrl: require("./directives/todoList/todoList.html"),
            controller: "todoListCtrl",
            controllerAs: "todoList"
        }
    })
    .directive("task", function () {
        return {
            restrict: "AE",
            templateUrl: require("./directives/task/task.html"),
        }
    })
    .directive("column", function () {
    return {
        restrict: "AE",
        templateUrl: require("./directives/column/column.html"),
        controller: "column",
        controllerAs: "currentColumn"
    }
});


function TaskStateService(  ) {
    this.movingTask = {};
}

export default todoApp;