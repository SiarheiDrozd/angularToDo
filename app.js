// (function(){
    var app = angular.module("ToDoApp", []);

    app.controller("tasks", function($scope, $http){
        $scope.message = "something";
        $scope.data = [];
        $http.get("./tasks.json").then(function(result){$scope.data = result.data;});
        $scope.moveLeft = function(){
            console.log("Left");
        };
        $scope.moveRight = function(){
            console.log("Right");
        };
    });
    app.controller("columns", function($scope){
        $scope.columns = [
            "TODO",
            "WIP",
            "TEST",
            "DONE"
        ];
        $scope.currentStage = 0;
    });
    app.filter("taskFilter", function () {
        return function(tasksSet, stage){
            var result = [];
            tasksSet.map(function(item){if(item.stage === stage){result.push(item)}}, []);
            return result;
        }
    });
// })();