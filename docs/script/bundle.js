/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function Column(taskStateService) {
    this.taskService = taskStateService;
    this.isDragging = false;
}
Column.prototype.onDrop = function (event, context, columnIndex) {
    console.log("drop", this.taskService.movingTask);
    this.taskService.movingTask.stage = columnIndex;
    this.taskService.movingTask = {};
    this.isDragging = false;
};

Column.prototype.onStartDrag = function (event, context, task) {
    this.taskService.movingTask = task;
    this.isDragging = true;
    console.log("drag", this.taskService.movingTask, this.isDragging);
};
Column.prototype.onStopDrag = function (event, context, task) {
    this.isDragging = false;
    console.log("stop", this.taskService.movingTask, this.isDragging);
};

exports.default = Column;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = TodoListCtrl;
function TodoListCtrl($http, $scope) {
    this.columns = ["TODO", "WIP", "TEST", "DONE"];
    this.data = [];
    this.movingTask = {};
    this.initTask = { stage: 0, id: -1, name: "", description: "" };

    this.newTask = angular.copy(this.initTask);

    $http.get("./data/tasks.json").then(function (result) {
        this.data = result.data;
    }.bind(this));
}

TodoListCtrl.prototype.addNewTask = function () {
    if (this.newTask.name && this.newTask.description) {
        this.data.push(Object.assign({
            stage: 0,
            id: this.data.length
        }, this.newTask));
        this.newTask = angular.copy(this.initTask);
    }
};

TodoListCtrl.prototype.moveLeft = function (task) {
    if (task.stage > 0) {
        task.stage--;
    }
};

TodoListCtrl.prototype.moveRight = function (task) {
    if (task.stage < this.columns.length - 1) {
        task.stage++;
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "<div class=\"column\">\r\n    <h2>{{column}}</h2>\r\n    <ul>\r\n        <li class=\"drop-area\"\r\n            data-drop=\"true\"\r\n            jqyoui-droppable=\"{onDrop:'currentColumn.onDrop(columnIndex)'}\"\r\n            ng-show=\"currentColumn.isDragging\">\r\n        </li>\r\n        <li class=\"task\" ng-show=\"todoList.newTask.stage === columnIndex\">\r\n            <span>{{todoList.newTask.name}}</span>\r\n            <span>{{todoList.newTask.description}}</span>\r\n        </li>\r\n        <li ng-repeat=\"task in todoList.data | filter:{stage: columnIndex}\"\r\n            data-drag=\"true\"\r\n            data-jqyoui-options=\"{revert: 'invalid'}\"\r\n            ng-init=\"task = task\"\r\n            jqyoui-draggable=\"{animate:true, onStart:'currentColumn.onStartDrag(task)', onStop:'currentColumn.onStopDrag(task)'}\"\r\n            task>\r\n        </li>\r\n    </ul>\r\n</div>\r\n";

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<div class=\"task clearfix\">\r\n    <span>{{task.name}}</span>\r\n    <span>{{task.description}}</span>\r\n    <span>move to:</span>\r\n    <button class=\"button float-left\"\r\n            ng-click=\"todoList.moveLeft(task)\"\r\n            ng-hide=\"{{task.stage == 0}}\">\r\n        {{todoList.columns[task.stage - 1]}}\r\n    </button>\r\n    <button class=\"button float-right\"\r\n            ng-click=\"todoList.moveRight(task)\"\r\n            ng-hide=\"{{task.stage == todoList.columns.length - 1}}\">\r\n        {{todoList.columns[task.stage + 1]}}\r\n    </button>\r\n</div>\r\n\r\n";

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <form class=\"new-task-form\" ng-submit=\"todoList.addNewTask()\">\r\n        <label for=\"taskName\">Task Name: </label>\r\n        <input id=\"taskName\"\r\n               type=\"text\"\r\n               class=\"new-task-input\"\r\n               ng-model=\"todoList.newTask.name\">\r\n\r\n        <label for=\"taskDescription\">Task Description: </label>\r\n        <input id=\"taskDescription\"\r\n               type=\"text\"\r\n               class=\"new-task-input\"\r\n               ng-model=\"todoList.newTask.description\">\r\n        <button class=\"button\">ADD</button>\r\n    </form>\r\n    <ul class=\"columns\">\r\n        <li ng-repeat=\"column in todoList.columns track by $index\"\r\n            ng-init=\"columnIndex = $index\"\r\n            column>\r\n        </li>\r\n    </ul>\r\n</div>";

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _todoListCtrl = __webpack_require__(1);

var _todoListCtrl2 = _interopRequireDefault(_todoListCtrl);

var _columnsCtrl = __webpack_require__(0);

var _columnsCtrl2 = _interopRequireDefault(_columnsCtrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var todoApp = angular.module("ToDoApp", ["ngDragDrop"]).service("taskStateService", TaskStateService).controller("todoListCtrl", ["$http", "$scope", _todoListCtrl2.default]).controller("column", ["taskStateService", _columnsCtrl2.default]).directive("todoList", function () {
    return {
        restrict: "AE",
        template: __webpack_require__(4),
        controller: "todoListCtrl",
        controllerAs: "todoList"
    };
}).directive("column", function () {
    return {
        restrict: "AE",
        template: __webpack_require__(2),
        controller: "column",
        controllerAs: "currentColumn"
    };
}).directive("task", function () {
    return {
        restrict: "AE",
        template: __webpack_require__(3)
    };
});

function TaskStateService() {
    this.movingTask = {};
}

exports.default = todoApp;

/***/ })
/******/ ]);