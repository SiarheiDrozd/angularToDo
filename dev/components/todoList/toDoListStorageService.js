function ToDoListStorage() {
    this.columns = [
        "TODO",
        "WIP",
        "TEST",
        "DONE"
    ];
    this.data = [];
    this.newTask = {};
}
export default ToDoListStorage;