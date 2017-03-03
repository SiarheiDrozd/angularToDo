import TodoListCtrl from "./components/todoList/todoListCtrl";
import ColumnCtrl from "./components/column/columnCtrl";
import TaskCtrl from "./components/task/taskCtrl";
import ToDoListStorage from "./components/todoList/toDoListStorageService";
import TaskStateService from "./components/task/taskStateService";

require("./components/task/task.css"); // find place

let todoApp = angular.module("ToDoApp", ["ngDragDrop"])
    .service("taskStateService", TaskStateService)
    .service("ToDoListStorage", ToDoListStorage)

    .controller("todoListCtrl", ["$http", "$scope", "ToDoListStorage", TodoListCtrl])
    .controller("column", ["taskStateService", "ToDoListStorage", ColumnCtrl])
    .controller("taskCtrl", ["taskStateService", "ToDoListStorage", TaskCtrl])

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
            controller: "taskCtrl",
            controllerAs: "task"
        }
    });

export default todoApp;
