app.controller("columns", ["$http", Columns]);

app.directive("tasks", function () {
    return {
        restrict: "E",
        templateUrl: "columns/columns_view.html"
    }
});

function Columns( $http ) {
    this.columns = [
        "TODO",
        "WIP",
        "TEST",
        "DONE"
    ];
    this.data = [];
    $http.get("data/tasks.json").then(function ( result ) {
        this.data = result.data;
        console.log(this);
    }.bind(this));
}

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