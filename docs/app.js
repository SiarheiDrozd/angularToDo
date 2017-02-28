import TodoListCtrl from "./directives/todoList/todoList_ctrl";
import Column from "./directives/column/columns_ctrl";


var todoApp = angular.module("ToDoApp", ["ngDragDrop"])
    .service("taskStateService", TaskStateService)
    .controller("todoListCtrl", ["$http", "$scope", TodoListCtrl])
    .controller("column", ["taskStateService", Column])
    .directive("todoList", function () {
        return {
            restrict: "AE",
            templateUrl: "directives/todoList/todoList.html",
            controller: "todoListCtrl",
            controllerAs: "todoList"
        }
    })
    .directive("task", function () {
        return {
            restrict: "AE",
            templateUrl: "directives/task/task.html",
        }
    })
    .directive("column", function () {
    return {
        restrict: "AE",
        templateUrl: "directives/column/column.html",
        controller: "column",
        controllerAs: "currentColumn"
    }
});


function TaskStateService(  ) {
    this.movingTask = {};
}

export default todoApp;