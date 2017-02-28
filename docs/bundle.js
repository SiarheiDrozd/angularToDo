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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _todoList_ctrl = __webpack_require__(2);

var _todoList_ctrl2 = _interopRequireDefault(_todoList_ctrl);

var _columns_ctrl = __webpack_require__(1);

var _columns_ctrl2 = _interopRequireDefault(_columns_ctrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var todoApp = angular.module("ToDoApp", ["ngDragDrop"]).service("taskStateService", TaskStateService).controller("todoListCtrl", ["$http", "$scope", _todoList_ctrl2.default]).controller("column", ["taskStateService", _columns_ctrl2.default]).directive("todoList", function () {
    return {
        restrict: "AE",
        templateUrl: "directives/todoList/todoList.html",
        controller: "todoListCtrl",
        controllerAs: "todoList"
    };
}).directive("task", function () {
    return {
        restrict: "AE",
        templateUrl: "directives/task/task.html"
    };
}).directive("column", function () {
    return {
        restrict: "AE",
        templateUrl: "directives/column/column.html",
        controller: "column",
        controllerAs: "currentColumn"
    };
});

function TaskStateService() {
    this.movingTask = {};
}

exports.default = todoApp;

/***/ }),
/* 1 */
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
/* 2 */
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

    $http.get("data/tasks.json").then(function (result) {
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(0);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ })
/******/ ]);