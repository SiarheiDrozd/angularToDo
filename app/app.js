angular.module("ToDoApp", ["ngDragDrop"])
    .controller("columns", ["$http", Columns])
    .directive("tasks", function () {
    return {
        restrict: "E",
        templateUrl: "columns/columns_view.html"
    }
});