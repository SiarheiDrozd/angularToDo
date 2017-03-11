require("./task.css");

export default function TaskCtrl(taskStateService, ToDoListStorage, DataBaseService) {
    this.storage = ToDoListStorage;
    this.taskService = taskStateService;
    this.dbService = DataBaseService;
}

TaskCtrl.prototype.moveLeft = function ( task ) {
    if (task.stage > 0) {
        task.stage--;
        this.storage.updateLocalStorage();
    }
};

TaskCtrl.prototype.moveRight = function ( task ) {
    if (task.stage < this.storage.columns.length - 1) {
        task.stage++;
        this.storage.updateLocalStorage();
    }
};
TaskCtrl.prototype.delete = function ( task ) {
    let dataForDelete = {task: task, user: this.storage.user};
    let self = this;
    this.dbService.deleteData( dataForDelete )
        .then(function (result) {
            console.log(result);
            self.storage.data.splice(self.storage.data.indexOf(task), 1);
        });
};
