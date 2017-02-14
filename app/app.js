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

    Tasks.prototype.moveLeft = function ( task ) {
        if(task.stage > 0){
            task.stage--;
        }
    };
    Tasks.prototype.moveRight = function ( task ) {
        if(task.stage < this.columns.length - 1){
            task.stage++;
        }
    };
