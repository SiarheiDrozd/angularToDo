require("./columns.css");

function Column(taskStateService, ToDoListStorage) {
    this.taskService = taskStateService;
    this.isDragging = false;
}
Column.prototype.onDrop = function ( event, context, columnIndex ) {
    console.log("drop", this.taskService.movingTask);
    this.taskService.movingTask.stage = columnIndex;
    this.taskService.movingTask = {};
    this.isDragging = false;
};

Column.prototype.onStartDrag = function ( event, context, task ) {
    this.taskService.movingTask = task;
    this.isDragging = true;
    console.log("drag", this.taskService.movingTask, this.isDragging);
};
Column.prototype.onStopDrag = function ( event, context, task ) {
    this.isDragging = false;
    console.log("stop", this.taskService.movingTask, this.isDragging);
};

export default Column;