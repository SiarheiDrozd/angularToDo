export default function TodoListCtrl( $http, $scope, ToDoListStorage ) {
    this.storage = ToDoListStorage;
    this.movingTask = {};
    this.initTask = {stage:0, id:-1, name: "", description: ""};
    this.newTask = angular.copy(this.initTask);
    this.user = ToDoListStorage.user;

    this.getData = function () {
        $http.get("/data")
            .then(function ( result ) {
                this.storage.data = result.data;
            }.bind(this));
    };
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

