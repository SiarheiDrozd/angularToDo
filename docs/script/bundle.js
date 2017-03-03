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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = TaskCtrl;
function TaskCtrl(taskStateService, ToDoListStorage) {
    this.storage = ToDoListStorage;
    this.taskService = taskStateService;
}

TaskCtrl.prototype.moveLeft = function (task) {
    if (task.stage > 0) {
        task.stage--;
    }
};

TaskCtrl.prototype.moveRight = function (task) {
    if (task.stage < this.storage.columns.length - 1) {
        task.stage++;
    }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function TaskStateService() {
    this.movingTask = {};
    this.isAnyTaskInDrag = false;
}

exports.default = TaskStateService;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function ToDoListStorage() {
    this.columns = ["TODO", "WIP", "TEST", "DONE"];
    this.data = [];
    this.newTask = { stage: 0 };
}
exports.default = ToDoListStorage;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = TodoListCtrl;
function TodoListCtrl($http, $scope, ToDoListStorage) {
    this.storage = ToDoListStorage;
    this.movingTask = {};
    this.initTask = { stage: 0, id: -1, name: "", description: "" };
    this.newTask = angular.copy(this.initTask);

    $http.get("./data/tasks.json").then(function (result) {
        ToDoListStorage.data = result.data;
    }.bind(this));
}

TodoListCtrl.prototype.addNewTask = function () {
    if (this.storage.newTask.name && this.storage.newTask.description) {
        this.storage.data.push(Object.assign({
            stage: 0,
            id: this.storage.data.length
        }, this.storage.newTask));
        this.storage.newTask = angular.copy(this.initTask);
    }
};

TodoListCtrl.prototype.moveLeft = function (task) {
    if (task.stage > 0) {
        task.stage--;
    }
};

TodoListCtrl.prototype.moveRight = function (task) {
    if (task.stage < this.storage.columns.length - 1) {
        task.stage++;
    }
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "<div class=\"column\">\r\n    <h2>{{column}}</h2>\r\n    <ul>\r\n        <li class=\"drop-area\"\r\n            data-drop=\"true\"\r\n            jqyoui-droppable=\"{onDrop:'currentColumn.onDrop(columnIndex)'}\">\r\n        </li>\r\n        <li>{{currentColumn.taskService.isAnyTaskInDrag}} </li>\r\n        <li class=\"task\" ng-show=\"todoList.storage.newTask.stage === columnIndex\">\r\n            <span>{{todoList.storage.newTask.name}}</span>\r\n            <span>{{todoList.storage.newTask.description}}</span>\r\n        </li>\r\n        <li ng-repeat=\"currentTask in todoList.storage.data | filter:{stage: columnIndex}\"\r\n            data-drag=\"true\"\r\n            data-jqyoui-options=\"{revert: 'invalid'}\"\r\n            jqyoui-draggable=\"{animate:true, onStart:'currentColumn.onStartDrag(currentTask)', onStop:'currentColumn.onStopDrag(currentTask)'}\"\r\n            task>\r\n        </li>\r\n    </ul>\r\n</div>\r\n";

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "<div class=\"task clearfix\">\r\n    <span>{{currentTask.name}}</span>\r\n    <span>{{currentTask.description}}</span>\r\n    <span>move to:</span>\r\n    <button class=\"button float-left\"\r\n            ng-click=\"task.moveLeft(currentTask)\"\r\n            ng-hide=\"{{currentTask.stage == 0}}\">\r\n        {{todoList.storage.columns[currentTask.stage - 1]}}\r\n    </button>\r\n    <button class=\"button float-right\"\r\n            ng-click=\"task.moveRight(currentTask)\"\r\n            ng-hide=\"{{currentTask.stage == todoList.columns.length - 1}}\">\r\n        {{todoList.storage.columns[currentTask.stage + 1]}}\r\n    </button>\r\n</div>\r\n\r\n";

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <form class=\"new-task-form\" ng-submit=\"todoList.addNewTask()\">\r\n        <label for=\"taskName\">Task Name: </label>\r\n        <input id=\"taskName\"\r\n               type=\"text\"\r\n               class=\"new-task-input\"\r\n               ng-model=\"todoList.storage.newTask.name\">\r\n\r\n        <label for=\"taskDescription\">Task Description: </label>\r\n        <input id=\"taskDescription\"\r\n               type=\"text\"\r\n               class=\"new-task-input\"\r\n               ng-model=\"todoList.storage.newTask.description\">\r\n        <button class=\"button\">ADD</button>\r\n    </form>\r\n    <ul class=\"columns\">\r\n        <li ng-repeat=\"column in todoList.storage.columns track by $index\"\r\n            ng-init=\"columnIndex = $index\"\r\n            column>\r\n        </li>\r\n    </ul>\r\n</div>\r\n";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./task.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./task.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".columns {\r\n    list-style: none;\r\n    font-size: 0;\r\n    height: 400px;\r\n}\r\n.columns > li {\r\n    display: inline-block;\r\n    font-size: 1rem;\r\n    height: 100%;\r\n}\r\n\r\n.column {\r\n    display: inline-block;\r\n    position: relative;\r\n    height: 100%;\r\n    /*font-size: 0;*/\r\n    margin: 10px;\r\n    padding: 5px;\r\n    min-height: 94px;\r\n    min-width: 150px;\r\n    background-color: #efefef;\r\n    vertical-align: top;\r\n}\r\n.column:after {\r\n    content: \"\";\r\n    position: absolute;\r\n    display: block;\r\n    top: 0;\r\n    right: 0;\r\n    margin-right: -13px;\r\n    background-color: #aeaeae;\r\n    height: 100%;\r\n    width: 5px;\r\n}\r\n\r\n.drop-area {\r\n    width: 100%;\r\n    height: 100px;\r\n    background: rgba(0, 0, 0, 0.2);\r\n    border: 5px dashed rgba(0, 0, 0, 0.5);\r\n    font-size: 16px;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".task {\r\n    font-size: 16px;\r\n    width: 150px;\r\n    margin: 5px 0;\r\n    background: #ffffff;\r\n    text-align: center;\r\n}\r\n\r\n.task span {\r\n    display: block;\r\n}\r\n\r\n.button {\r\n    border: 1px solid #eeeeee;\r\n    background: #ffffff;\r\n    height: 30px;\r\n    width: 50%;\r\n}", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./columns.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./columns.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _todoListCtrl = __webpack_require__(6);

var _todoListCtrl2 = _interopRequireDefault(_todoListCtrl);

var _columnCtrl = __webpack_require__(15);

var _columnCtrl2 = _interopRequireDefault(_columnCtrl);

var _taskCtrl = __webpack_require__(3);

var _taskCtrl2 = _interopRequireDefault(_taskCtrl);

var _toDoListStorageService = __webpack_require__(5);

var _toDoListStorageService2 = _interopRequireDefault(_toDoListStorageService);

var _taskStateService = __webpack_require__(4);

var _taskStateService2 = _interopRequireDefault(_taskStateService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(10); // find place

var todoApp = angular.module("ToDoApp", ["ngDragDrop"]).service("taskStateService", _taskStateService2.default).service("ToDoListStorage", _toDoListStorageService2.default).controller("todoListCtrl", ["$http", "$scope", "ToDoListStorage", _todoListCtrl2.default]).controller("column", ["taskStateService", "ToDoListStorage", _columnCtrl2.default]).controller("taskCtrl", ["taskStateService", "ToDoListStorage", _taskCtrl2.default]).directive("todoList", function () {
    return {
        restrict: "AE",
        template: __webpack_require__(9),
        controller: "todoListCtrl",
        controllerAs: "todoList"
    };
}).directive("column", function () {
    return {
        restrict: "AE",
        template: __webpack_require__(7),
        controller: "column",
        controllerAs: "currentColumn"
    };
}).directive("task", function () {
    return {
        restrict: "AE",
        template: __webpack_require__(8),
        controller: "taskCtrl",
        controllerAs: "task"
    };
});

exports.default = todoApp;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
__webpack_require__(13);

function Column(taskStateService, ToDoListStorage) {
    this.taskService = taskStateService;
    this.storage = ToDoListStorage;
}
Column.prototype.onDrop = function (event, context, columnIndex) {
    console.log("drop", this.taskService.movingTask);
    this.taskService.movingTask.stage = columnIndex;
    this.taskService.movingTask = {};
    this.taskService.isAnyTaskInDrag = false;
};

Column.prototype.onStartDrag = function (event, context, task) {
    this.taskService.movingTask = task;
    console.log("1", this.taskService.isAnyTaskInDrag);
    this.taskService.isAnyTaskInDrag = true;
    console.log("2", this.taskService.isAnyTaskInDrag);
};
Column.prototype.onStopDrag = function (event, context, task) {
    console.log("3", this.taskService.isAnyTaskInDrag);
    this.taskService.isAnyTaskInDrag = false;
    console.log("4", this.taskService.isAnyTaskInDrag);
    console.log("stop", task);
};

exports.default = Column;

/***/ })
/******/ ]);