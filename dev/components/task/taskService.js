function TaskStateService() {
}

TaskStateService.prototype.moveLeft = function (task, storage) {
    if (task.stage > 0) {
        task.stage--;
        storage.updateLocalStorage();
    }
};

TaskStateService.prototype.moveRight = function (task, storage) {
    if (task.stage < storage.columns.length - 1) {
        task.stage++;
        storage.updateLocalStorage();
    }
};
TaskStateService.prototype.delete = function (task, storage, dbService) {
    console.log(task, storage, dbService);
    let dataForDelete = { task: task, user: storage.user };
    dbService.deleteData(dataForDelete)
        .then(function (result) {
            storage.data.splice(storage.data.indexOf(task), 1);
        });
};

export default TaskStateService;
