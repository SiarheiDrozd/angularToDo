require("./todoList.css");

export default function TodoListCtrl(ToDoListStorage, DataBaseService ) {
    this.storage = ToDoListStorage;
    this.movingTask = {};
    this.initTask = {stage:0, id:-1, name: "", description: ""};
    this.newTask = angular.copy(this.initTask);
    this.user = ToDoListStorage.user;
    this.isLogged = this.storage.isLogged;

    this.getData = function () {
        let storage = this.storage;
        DataBaseService.getData()
            .then(function (result) {
                storage.data = result.data;
            }).catch(function (err) {
                console.log("data request error", err)
            });
    }
}

TodoListCtrl.prototype.addNewTask = function () {
    if(this.storage.newTask.name && this.storage.newTask.description){
        this.storage.data.push(Object.assign({
                stage: 0,
                id: this.storage.data.length
            }, this.storage.newTask));
        this.storage.newTask = angular.copy(this.initTask);
    }
};

