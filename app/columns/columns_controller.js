function Columns( $http, $scope ) {
    this.columns = [
        "TODO",
        "WIP",
        "TEST",
        "DONE"
    ];
    this.data = [];
    this.movingTask = {};

    this.scope = $scope;
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
//
// Columns.prototype.onStop = function () {
//     this.scope.$digest();
// };

Columns.prototype.addNewTask = function ( task ) {
    this.data.push(Object.assign({
        stage: 0,
        id: this.data.length
    }, task));
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