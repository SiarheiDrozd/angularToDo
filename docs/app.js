angular.module("ToDoApp", ["ngDragDrop"])
    .controller("todoListCtrl", ["$http", "$scope", TodoListCtrl])
    .controller("column", Column)
    .directive("todoList", function () {
        return {
            restrict: "E",
            templateUrl: "directives/todoList/todoList.html",
            controller: "todoListCtrl",
            controllerAs: "todoList"
        }
    })
    .directive("task", function () {
        return {
            restrict: "E",
            templateUrl: "directives/task/task.html"
        }
    })
    .directive("column", function () {
    return {
        restrict: "E",
        templateUrl: "directives/column/column.html",
        controller: "column",
        controllerAs: "currentColumn"
    }
});