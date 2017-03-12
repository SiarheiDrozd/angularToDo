function ToDoListService () {
    this.columns = [
        "TODO",
        "WIP",
        "TEST",
        "DONE"
    ];
    this.data = [];

    this.initTask = { stage: 0, name: "", description: "" };
    this.newTask = angular.copy(this.initTask);

    this.user = null;
    this.isLogged = false;
}

ToDoListService.prototype.updateLocalStorage = function ( ) {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("tasks",JSON.stringify(this.data));
        console.dir(JSON.parse(localStorage.getItem("tasks")));
    } else {
        // Sorry! No Web Storage support..
    }
};

ToDoListService.prototype.getData = function (dbService) {
    let storage = this;
    let user = storage.user;

    dbService.getData(user)
        .then(function (result) {
            storage.data = Object.assign(storage.data, result.data);
            storage.updateLocalStorage();
        }).catch(function (err) {
        console.log("data request error", err)
    });
};
ToDoListService.prototype.setData = function (dbService) {
    let dataToSet = { data: this.data, user: this.user };
    dbService.setData(dataToSet)
        .then(function (result) {
            console.log(result);
        })
};
ToDoListService.prototype.addNewTask = function () {
    if (this.newTask.name && this.newTask.description) {
        this.data.push(Object.assign({
            stage: 0
        }, this.newTask));
        this.updateLocalStorage();
        this.newTask = angular.copy(this.initTask);
    }
};

export default ToDoListService;
