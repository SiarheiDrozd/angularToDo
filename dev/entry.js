import TodoListCtrl from "./components/todoList/todoListCtrl";
import ColumnCtrl from "./components/column/columnCtrl";
import TaskCtrl from "./components/task/taskCtrl";
import ToDoListStorage from "./components/todoList/toDoListStorageService";
import TaskStateService from "./components/task/taskStateService";
require("angular-drag-and-drop-lists");
require("angular-ui-router");

let todoApp = angular.module("ToDoApp", ["ngDragDrop", "ui.router"])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise("/todo-list");
        $stateProvider
            .state('todoList', {
                url: "/todo-list",
                template: "<todo-list></todo-list>"
            })
            .state('login', {
                url: "/login",
                template: "<login-page></login-page>"
            });
    })

    .service("taskStateService", TaskStateService)
    .service("ToDoListStorage", ToDoListStorage)

    .controller("todoListCtrl", ["$http", "$scope", "ToDoListStorage", TodoListCtrl])
    .controller("loginPageCtrl", ["$http", "ToDoListStorage", TodoListCtrl])
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
