function ToDoListService () {
    this.columns = [
        "TODO",
        "WIP",
        "TEST",
        "DONE"
    ];
    this.data = [];

    this.initTask = { stage: 0, name: "", description: "", expiryDate: "" };
    this.newTask = angular.copy(this.initTask);

    this.user = null;
    this.isLogged = false;
}

ToDoListService.prototype.initLoad = function (dbService) {
    if (typeof(Storage) !== "undefined") {
        let user = localStorage.getItem("user");
        if(user){
            this.isLogged = true;
            this.user = JSON.parse(user);
            this.getData(dbService);
            this.data = JSON.parse(localStorage.getItem("tasks")) || [];
        }
    } else {
        console.warn("localStorage is not supported");
    }
};
ToDoListService.prototype.logOut = function () {
    if (typeof(Storage) !== "undefined") {
        localStorage.removeItem("tasks");
        localStorage.removeItem("user");
    } else {
        console.warn("localStorage is not supported");
    }
    this.data = [];
    this.user = null;
    this.isLogged = false;
};

ToDoListService.prototype.updateLocalStorage = function ( ) {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("tasks",JSON.stringify(this.data));
    } else {
        console.warn("localStorage is not supported");
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
        console.warn("data request error", err)
    });
};
ToDoListService.prototype.setData = function (dbService) {
    let dataToSet = { data: this.data, user: this.user };
    dbService.setData(dataToSet)
        .then(function (result) {
            // console.log(result);
        })
};
ToDoListService.prototype.addNewTask = function () {
    if (this.newTask.name && this.newTask.description && this.newTask.expiryDate) {
        this.data.push(Object.assign({}, this.newTask));
        this.updateLocalStorage();
        this.newTask = angular.copy(this.initTask);
    }
};

export default ToDoListService;
