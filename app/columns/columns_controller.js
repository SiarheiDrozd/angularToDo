function Columns( $http, $scope ) {
    this.columns = [
        "TODO",
        "WIP",
        "TEST",
        "DONE"
    ];
    this.data = [];
    this.movingTask = {};
    this.initTask = {stage:0, id:-1, name: "", description: ""};

    this.newTask = angular.copy(this.initTask);

    $http.get("data/tasks.json")
        .then(function ( result ) {
            this.data = result.data;
        }.bind(this))
    ;
}

Columns.prototype.onDrop = function ( event, context, columnIndex ) {
    this.movingTask.stage = columnIndex;
    this.movingTask = {};
};

Columns.prototype.onStartDrag = function ( event, context, task ) {
    this.movingTask = task;
};

Columns.prototype.addNewTask = function () {
    if(this.newTask.name && this.newTask.description){
        this.data.push(Object.assign({
                stage: 0,
                id: this.data.length
            }, this.newTask));
        this.newTask = angular.copy(this.initTask);
    }
};

Columns.prototype.moveLeft = function ( task ) {
    if (task.stage > 0) {
        task.stage--;
    }
};
Columns.prototype.moveRight = function ( task ) {
    if (task.stage < this.columns.length - 1) {
        task.stage++;
    }
};