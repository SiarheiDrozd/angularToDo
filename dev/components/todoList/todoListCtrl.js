require("./todoList.css");
require("../newTaskForm/newTaskForm.css");

export default function TodoListCtrl(ToDoListService, DataBaseService) {
    this.toDoListService = ToDoListService;
    this.dbService = DataBaseService;

    this.newTask = this.toDoListService.newTask;
    this.columns = this.toDoListService.columns;
    this.user = this.toDoListService.user;
    this.isLogged = this.toDoListService.isLogged;

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

