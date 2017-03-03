require("./columns.css");

function Column(taskStateService, ToDoListStorage) {
    this.taskService = taskStateService;
    this.storage = ToDoListStorage;
}
Column.prototype.onDrop = function ( event, context, columnIndex ) {
    console.log("drop", this.taskService.movingTask);
    this.taskService.movingTask.stage = columnIndex;
    this.taskService.movingTask = {};
    this.taskService.isAnyTaskInDrag = false;
};

Column.prototype.onStartDrag = function ( event, context, task ) {
    this.taskService.movingTask = task;
    console.log("1", this.taskService.isAnyTaskInDrag);
    this.taskService.isAnyTaskInDrag = true;
    console.log("2", this.taskService.isAnyTaskInDrag);
};
Column.prototype.onStopDrag = function ( event, context, task ) {
    console.log("3", this.taskService.isAnyTaskInDrag);
    this.taskService.isAnyTaskInDrag = false;
    console.log("4", this.taskService.isAnyTaskInDrag);
    console.log("stop", task);
};

export default Column;
