export default function TaskCtrl(taskStateService, ToDoListStorage) {
    this.storage = ToDoListStorage;
    this.taskService = taskStateService;
}

TaskCtrl.prototype.moveLeft = function ( task ) {
    if (task.stage > 0) {
        task.stage--;
    }
};

TaskCtrl.prototype.moveRight = function ( task ) {
    if (task.stage < this.storage.columns.length - 1) {
        task.stage++;
    }
};
