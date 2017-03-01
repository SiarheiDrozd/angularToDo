import TodoListCtrl from "./components/todoList/todoListCtrl";
import Column from "./components/column/columnsCtrl";

var todoApp = angular.module("ToDoApp", ["ngDragDrop"])
    .service("taskStateService", TaskStateService)
    .controller("todoListCtrl", ["$http", "$scope", TodoListCtrl])
    .controller("column", ["taskStateService", Column])
    .directive("todoList", function () {
        return {
            restrict: "AE",
            template: require("./components/todoList/todoList.html"),
            controller: "todoListCtrl",
            controllerAs: "todoList"
        }
    })
    .directive("column", function () {
        return {
            restrict: "AE",
            template: require("./components/column/column.html"),
            controller: "column",
            controllerAs: "currentColumn"
        }
    })
    .directive("task", function () {
        return {
            restrict: "AE",
            template: require("./components/task/task.html"),
        }
    });



function TaskStateService(  ) {
    this.movingTask = {};
}

export default todoApp;