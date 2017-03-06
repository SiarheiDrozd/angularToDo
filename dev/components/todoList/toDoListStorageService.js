function ToDoListStorage() {
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
}

export default ToDoListStorage;
