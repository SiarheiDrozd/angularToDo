require("./todoList.css");
require("../newTaskForm/newTaskForm.css");

export default function TodoListCtrl(ToDoListStorage, DataBaseService ) {
    this.storage = ToDoListStorage;
    this.movingTask = {};
    this.initTask = {stage:0, name: "", description: ""};
    this.newTask = angular.copy(this.initTask);
    this.user = ToDoListStorage.user;
    this.isLogged = this.storage.isLogged;

    this.getData = function () {
        let storage = this.storage;
        var dataToGet = {data: this.storage.data, user: this.user};
        DataBaseService.getData(dataToGet)
            .then(function (result) {
                storage.data = Object.assign(result.data, storage.data );
                storage.updateLocalStorage();
            }).catch(function (err) {
                console.log("data request error", err)
            });
    };
    this.setData = function () {
        var dataToSet = {data: this.storage.data, user: this.user};
        DataBaseService.setData(dataToSet)
            .then(function (result) {
                console.log(result);
            })
    }
}

TodoListCtrl.prototype.addNewTask = function () {
    if(this.storage.newTask.name && this.storage.newTask.description){
        this.storage.data.push(Object.assign({
                stage: 0
            }, this.storage.newTask));
        this.storage.updateLocalStorage();
        this.storage.newTask = angular.copy(this.initTask);
    }
};

