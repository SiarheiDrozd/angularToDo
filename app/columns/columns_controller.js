app.controller("columns", ["$http", Columns]);

app.directive("tasks", function () {
    return {
        restrict: "E",
        templateUrl: "columns/columns_view.html"
    }
});

function Columns( $http ) {
    this.columns = [
        {
            name: "TODO",
            items: []
        },
        {
            name: "WIP",
            items: []
        },
        {
            name: "TEST",
            items: []
        },
        {
            name: "DONE",
            items: []
        }
    ];
    this.data = [];
    $http.get("data/tasks.json")
        .then(function ( result ) {
            this.data = result.data;
        }.bind(this))
        .then(function () {
            this.data.forEach(function ( task ) {
                this.add(task);
            }.bind(this));
        }.bind(this))
    ;
}

Columns.prototype.add = function ( task ) {
    task.id = this.columns[task.stage].items.length;
    this.columns[task.stage].items.push(task);
};
Columns.prototype.remove = function ( task ) {
    this.columns[task.stage].items.splice(task.id, 1);
    this.columns[task.stage].items.forEach(function(item, index){item.id = index});
};

Columns.prototype.moveLeft = function ( task ) {
    if (task.stage > 0) {
        this.remove(task);
        task.stage--;
        this.add(task);
    }
};
Columns.prototype.moveRight = function ( task ) {
    if (task.stage < this.columns.length - 1) {
        this.remove(task);
        task.stage++;
        this.add(task);
    }
};