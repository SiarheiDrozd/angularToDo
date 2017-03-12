require("./task.css");

export default function TaskCtrl(taskService, ToDoListService, DataBaseService) {
    this.storage = ToDoListService;
    this.taskService = taskService;
    this.dbService = DataBaseService;

    this.moveLeft = function (task) {
        this.taskService.moveLeft(task, this.storage);
    };

    this.moveRight = function (task) {
        this.taskService.moveRight(task, this.storage);
    };
    this.remove = function (task) {
        this.taskService.delete(task, this.storage, this.dbService);
    };
}
