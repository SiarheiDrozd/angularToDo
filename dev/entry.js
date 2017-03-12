import TodoListCtrl from "./components/todoList/todoListCtrl";
import ColumnCtrl from "./components/column/columnCtrl";
import TaskCtrl from "./components/task/taskCtrl";
import LoginPageCtrl from "./components/Login/LoginPageCtrl";

import ToDoListService from "./components/todoList/toDoListService";
import TaskService from "./components/task/taskService";
import DataBaseService from "./components/dataBase/dataBaseService";
import LoginPageService from "./components/login/loginPageService";

import routing from "./components/routing/routing";

require("angular-ui-router");

let todoApp = angular.module("ToDoApp", ["ui.router"])
    .config(routing)

    .service("TaskService", TaskService)
    .service("ToDoListService", ToDoListService)
    .service("DataBaseService", ["$http", DataBaseService])
    .service("LoginPageService", LoginPageService)

    .controller("todoListCtrl", ["$scope", "ToDoListService", "DataBaseService", TodoListCtrl])
    .controller("loginPageCtrl", ["$http", "$location", "ToDoListService", "DataBaseService", "LoginPageService", LoginPageCtrl])
    .controller("column", ["ToDoListService", ColumnCtrl])
    .controller("taskCtrl", ["TaskService", "ToDoListService", "DataBaseService", TaskCtrl])

    .directive("loginPage", function () {
        return {
            restrict    : "AE",
            template    : require("./components/login/loginPage.html"),
            controller  : "loginPageCtrl",
            controllerAs: "loginPage"
        }
    })
    .directive("todoList", function () {
        return {
            restrict    : "AE",
            template    : require("./components/todoList/todoList.html"),
            controller  : "todoListCtrl",
            controllerAs: "todoList"
        }
    })
    .directive("column", function () {
        return {
            restrict    : "AE",
            template    : require("./components/column/column.html"),
            controller  : "column",
            controllerAs: "currentColumn"
        }
    })
    .directive("task", function () {
        return {
            restrict    : "AE",
            template    : require("./components/task/task.html"),
            controller  : "taskCtrl",
            controllerAs: "task"
        }
    });

export default todoApp;
