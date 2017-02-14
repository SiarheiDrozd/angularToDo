var app = angular.module("ToDoApp", []);

    app.controller("columns",["$scope", "$http", Tasks]);

    function Tasks($scope, $http) {
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

    Tasks.prototype.moveLeft = function ( task, obj ) {
        task.stage > 0 && obj.data[task.id].stage--;
    };
    Tasks.prototype.moveRight = function ( task, obj ) {
        task.stage > 0 && obj.data[task.id].stage++;
    };
