export default function TodoListCtrl( $http, $scope, ToDoListStorage ) {
    this.data = ToDoListStorage.data;
    this.columns = ToDoListStorage.columns;
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
    if(this.newTask.name && this.newTask.description){
        this.data.push(Object.assign({
                stage: 0,
                id: this.data.length
            }, this.newTask));
        this.newTask = angular.copy(this.initTask);
    }
};

TodoListCtrl.prototype.moveLeft = function ( task ) {
    if (task.stage > 0) {
        task.stage--;
    }
};

TodoListCtrl.prototype.moveRight = function ( task ) {
    if (task.stage < this.columns.length - 1) {
        task.stage++;
    }
};