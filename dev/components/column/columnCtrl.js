require("./columns.css");

function Column(taskStateService, ToDoListStorage) {
    this.taskService = taskStateService;
    this.storage = ToDoListStorage;
}
Column.prototype.onDrop = function ( event, context, columnIndex ) {
    this.taskService.movingTask.stage = columnIndex;
    this.taskService.movingTask = {};
    this.taskService.isAnyTaskInDrag = false;
};

Column.prototype.onStartDrag = function ( event, context, task ) {
    this.taskService.movingTask = task;
    this.taskService.isAnyTaskInDrag = true;
};
Column.prototype.onStopDrag = function ( event, context, task ) {
    this.taskService.isAnyTaskInDrag = false;
};

export default Column;
