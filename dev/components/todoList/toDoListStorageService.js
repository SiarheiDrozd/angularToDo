function ToDoListStorage() {
    this.columns = [
        "TODO",
        "WIP",
        "TEST",
        "DONE"
    ];
    this.data = [];
    this.newTask = {stage: 0};
}
export default ToDoListStorage;
