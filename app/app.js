angular.module("ToDoApp", ["ngDragDrop"])
    .controller("columns", ["$http", "$scope", Columns])
    .directive("tasks", function () {
    return {
        restrict: "E",
        templateUrl: "columns/task_view.html"
    }
});