import TodoListCtrl from "./components/todoList/todoListCtrl";
import ColumnCtrl from "./components/column/columnCtrl";
import TaskCtrl from "./components/task/taskCtrl";
import LoginPageCtrl from "./components/Login/LoginPageCtrl";

import ToDoListStorage from "./components/todoList/toDoListStorageService";
import TaskStateService from "./components/task/taskStateService";

import routing from "./components/routing/routing";

require("angular-drag-and-drop-lists");
require("angular-ui-router");

let todoApp = angular.module("ToDoApp", ["ngDragDrop", "ui.router"])
    .config(routing)

    .service("taskStateService", TaskStateService)
    .service("ToDoListStorage", ToDoListStorage)

    .controller("todoListCtrl", ["$http", "$scope", "ToDoListStorage", TodoListCtrl])
    .controller("loginPageCtrl", ["$http", "$location", "ToDoListStorage", LoginPageCtrl])
    .controller("column", ["taskStateService", "ToDoListStorage", ColumnCtrl])
    .controller("taskCtrl", ["taskStateService", "ToDoListStorage", TaskCtrl])

    .directive("loginPage", function () {
        return {
            restrict: "AE",
            template: require("./components/login/loginPage.html"),
            controller: "loginPageCtrl",
            controllerAs: "loginPage"
        }
    })
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
