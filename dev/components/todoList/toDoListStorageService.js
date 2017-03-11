function ToDoListStorage(DataBaseService) {
    this.columns = [
        "TODO",
        "WIP",
        "TEST",
        "DONE"
    ];
    this.data = [];
    this.newTask = {stage: 0};
    this.user = null;
    this.isLogged = false;

    this.updateLocalStorage = function ( ) {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("tasks",JSON.stringify(this.data));
            console.dir(JSON.parse(localStorage.getItem("tasks")));
        } else {
            // Sorry! No Web Storage support..
        }
    };
}

export default ToDoListStorage;
