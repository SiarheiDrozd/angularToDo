require("./todoList.css");
require("../newTaskForm/newTaskForm.css");

export default function TodoListCtrl($scope, ToDoListService, DataBaseService) {
    this.toDoListService = ToDoListService;
    this.dbService = DataBaseService;

    this.columns = this.toDoListService.columns;
    this.isLogged = this.toDoListService.isLogged;

    this.initLoad = function () {
        this.toDoListService.initLoad(this.dbService);
    };
    this.logOut = function () {
        this.toDoListService.logOut();
    };

    this.getData = function () {
        this.toDoListService.getData(this.dbService);
    };
    this.setData = function () {
        this.toDoListService.setData(this.dbService);
    };
    this.addNewTask = function () {
        this.toDoListService.addNewTask();
    };
}

