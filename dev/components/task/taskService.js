function TaskStateService() {
}

TaskStateService.prototype.moveLeft = function (task, storage) {
    if (task.stage > 0) {
        task.stage--;
        storage.updateLocalStorage();
    }
};

TaskStateService.prototype.isExpires = function (taskDate, currentDate) {
    if(taskDate && currentDate) {
        var timeDiff = new Date(taskDate).getTime() - new Date(currentDate).getTime();
        var diffHours = Math.ceil(timeDiff / (1000 * 3600));
        if(diffHours < 3)return "expires";
        if(diffHours < 12)return "close-to-expire";
    }
    return false;
};

TaskStateService.prototype.moveRight = function (task, storage) {
    if (task.stage < storage.columns.length - 1) {
        task.stage++;
        storage.updateLocalStorage();
    }
};
TaskStateService.prototype.delete = function (task, storage, dbService) {
    let dataForDelete = { task: task, user: storage.user };
    dbService.deleteData(dataForDelete)
        .then(function (result) {
            storage.data.splice(storage.data.indexOf(task), 1);
        });
};

export default TaskStateService;
