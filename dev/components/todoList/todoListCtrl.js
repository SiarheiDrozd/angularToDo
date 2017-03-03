export default function TodoListCtrl( $http, $scope, ToDoListStorage ) {
    this.storage = ToDoListStorage;
    this.movingTask = {};
    this.initTask = {stage:0, id:-1, name: "", description: ""};
    this.newTask = angular.copy(this.initTask);

    $http.get("./data/tasks.json")
        .then(function ( result ) {
            ToDoListStorage.data = result.data;
        }.bind(this))
    ;
}

TodoListCtrl.prototype.addNewTask = function () {
    if(this.storage.newTask.name && this.storage.newTask.description){
        this.storage.data.push(Object.assign({
                stage: 0,
                id: this.storage.data.length
            }, this.storage.newTask));
        this.storage.newTask = angular.copy(this.initTask);
    }
};

TodoListCtrl.prototype.moveLeft = function ( task ) {
    if (task.stage > 0) {
        task.stage--;
    }
};

TodoListCtrl.prototype.moveRight = function ( task ) {
    if (task.stage < this.storage.columns.length - 1) {
        task.stage++;
    }
};
