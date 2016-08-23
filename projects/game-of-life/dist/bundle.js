/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var GameOfLife_1 = __webpack_require__(3);
	ReactDOM.render(React.createElement(GameOfLife_1.GameOfLife, {cols: 75, rows: 75}), document.getElementById('app'));


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var LifeMenu_1 = __webpack_require__(4);
	var LifeBoard_1 = __webpack_require__(5);
	var gol_pubsub_ts_1 = __webpack_require__(7);
	var GameOfLife = (function (_super) {
	    __extends(GameOfLife, _super);
	    function GameOfLife(props) {
	        _super.call(this, props);
	        // Here is my attempt at a pubsub event system
	        this.pubsub = new gol_pubsub_ts_1.PubSub();
	        this.state = {
	            generation: 0,
	            ticking: true
	        };
	        // Prebind methods
	        this.toggleTicking = this.toggleTicking.bind(this);
	        this.incrementGeneration = this.incrementGeneration.bind(this);
	        this.resetGeneration = this.resetGeneration.bind(this);
	        this.componentDidMount = this.componentDidMount.bind(this);
	    }
	    GameOfLife.prototype.render = function () {
	        var styleString = "\n            .gol-cell {\n                \n            }\n        ";
	        return (React.createElement("div", {id: "game-of-life"}, React.createElement("style", null, styleString), React.createElement(LifeMenu_1.LifeMenu, {pubsub: this.pubsub, generation: this.state.generation, ticking: this.state.ticking}), React.createElement(LifeBoard_1.LifeBoard, {pubsub: this.pubsub, width: this.props.cols, height: this.props.rows, ticking: this.state.ticking, speed: 50})));
	    };
	    GameOfLife.prototype.componentDidMount = function () {
	        var _this = this;
	        this.pubsub.on("toggle-ticking", function () { _this.toggleTicking(); });
	        this.pubsub.on('reset-generation', function () { _this.resetGeneration(); });
	        this.pubsub.on('increment-generation', function () { _this.incrementGeneration(); });
	    };
	    GameOfLife.prototype.toggleTicking = function () {
	        var newStatus = this.state.ticking ? false : true;
	        if (newStatus)
	            this.pubsub.emit('force-tick');
	        this.setState({
	            generation: this.state.generation,
	            ticking: newStatus
	        });
	    };
	    GameOfLife.prototype.incrementGeneration = function () {
	        this.setState({
	            ticking: this.state.ticking,
	            generation: this.state.generation + 1
	        });
	    };
	    GameOfLife.prototype.resetGeneration = function () {
	        this.setState({
	            ticking: this.state.ticking,
	            generation: 0
	        });
	    };
	    return GameOfLife;
	}(React.Component));
	exports.GameOfLife = GameOfLife;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var LifeMenu = (function (_super) {
	    __extends(LifeMenu, _super);
	    function LifeMenu() {
	        _super.call(this);
	        // Bind this instance to our functions
	        this.singleTick = this.singleTick.bind(this);
	    }
	    LifeMenu.prototype.render = function () {
	        var _this = this;
	        var playIcon = "fa " + (this.props.ticking ? "fa-pause" : "fa-play");
	        var playPause = (this.props.ticking ? "  Pause" : "   Play");
	        return (React.createElement("nav", {className: "navbar navbar-default"}, React.createElement("div", {className: "container-fluid"}, React.createElement("div", {className: "navbar-header"}, React.createElement("button", {type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#bs-example-navbar-collapse-1", "aria-expanded": "false"}, React.createElement("span", {className: "sr-only"}, "Toggle navigation"), React.createElement("span", {className: "icon-bar"}), React.createElement("span", {className: "icon-bar"}), React.createElement("span", {className: "icon-bar"})), React.createElement("a", {className: "navbar-brand", href: "#"}, "Game of Life")), React.createElement("div", {className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1"}, React.createElement("ul", {className: "nav navbar-nav"}, React.createElement("li", null, React.createElement("a", {href: "#", onClick: this.singleTick}, React.createElement("i", {className: "fa fa-step-forward"}), "  Next")), React.createElement("li", null, React.createElement("a", {href: "#", onClick: function () { _this.props.pubsub.emit('toggle-ticking'); }}, React.createElement("i", {className: playIcon}), playPause)), React.createElement("li", null, React.createElement("a", {href: "#", onClick: function () { _this.props.pubsub.emit('clear'); }}, React.createElement("i", {className: "fa fa-trash"}), "  Clear")), React.createElement("li", null, React.createElement("a", {href: "#", onClick: function () { _this.props.pubsub.emit('randomize'); }}, React.createElement("i", {className: "fa fa-random"}), "  Randomize"))), React.createElement("ul", {className: "nav navbar-nav navbar-right"}, React.createElement("li", {className: "dropdown"}, React.createElement("a", {href: "#", className: "dropdown-toggle", "data-toggle": "dropdown", role: "button", "aria-haspopup": "true", "aria-expanded": "false"}, "Info ", React.createElement("span", {className: "caret"})), React.createElement("ul", {className: "dropdown-menu"}, React.createElement("li", null, React.createElement("a", {href: "http://www.zackward.net"}, "Coded with ", React.createElement("i", {className: "fa fa-heart"}), " by Zack Ward")), React.createElement("li", null, React.createElement("a", {href: "https://github.com/ZackWard/zackward.github.io/tree/master/projects/game-of-life/"}, "Code hosted on ", React.createElement("i", {className: "fa fa-github"}), " GitHub")))), React.createElement("li", null, React.createElement("a", {hrer: "#"}, "Generations: ", React.createElement("span", {className: "badge"}, this.props.generation))))))));
	    };
	    LifeMenu.prototype.singleTick = function () {
	        // Only allow a single tick if we aren't actively ticking. This should prevent a situation where multiple tick chains 
	        // are running
	        if (this.props.ticking)
	            return;
	        this.props.pubsub.emit('one-tick');
	    };
	    return LifeMenu;
	}(React.Component));
	exports.LifeMenu = LifeMenu;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var LifeCell_1 = __webpack_require__(6);
	var LifeBoard = (function (_super) {
	    __extends(LifeBoard, _super);
	    function LifeBoard(props) {
	        _super.call(this, props);
	        // Prebind methods here
	        this.killCell = this.killCell.bind(this);
	        this.birthCell = this.birthCell.bind(this);
	        this.toggleCell = this.toggleCell.bind(this);
	        this.updateNeighbors = this.updateNeighbors.bind(this);
	        this.getToroidalX = this.getToroidalX.bind(this);
	        this.getToroidalY = this.getToroidalY.bind(this);
	        this.flushBoard = this.flushBoard.bind(this);
	        this.clearBoard = this.clearBoard.bind(this);
	        this.randomizeBoard = this.randomizeBoard.bind(this);
	        this.tick = this.tick.bind(this);
	        this.doTick = this.doTick.bind(this);
	        this.componentDidMount = this.componentDidMount.bind(this);
	        // We'll build our blank board here
	        this.pendingBoard = {};
	        for (var x = 0; x < this.props.width; x++) {
	            for (var y = 0; y < this.props.height; y++) {
	                this.pendingBoard[x + 'x' + y] = {
	                    alive: false,
	                    livingNeighbors: 0
	                };
	            }
	        }
	        // Birth random cells onto our blank board
	        for (var x = 0; x < this.props.width; x++) {
	            for (var y = 0; y < this.props.height; y++) {
	                if (Math.random() < 0.5)
	                    this.birthCell(x, y);
	            }
	        }
	        // Set the state to a copy of the pendingBoard object
	        this.state = {
	            cells: JSON.parse(JSON.stringify(this.pendingBoard))
	        };
	    }
	    LifeBoard.prototype.render = function () {
	        var cellElementArray = [];
	        for (var y = 0; y < this.props.height; y++) {
	            for (var x = 0; x < this.props.width; x++) {
	                var cellKey = x + 'x' + y;
	                cellElementArray.push(React.createElement(LifeCell_1.LifeCell, {key: cellKey, x: x, y: y, alive: this.state.cells[cellKey].alive, toggleCell: this.toggleCell}));
	            }
	        }
	        return (React.createElement("div", {id: "gol-board"}, cellElementArray));
	    };
	    LifeBoard.prototype.getToroidalX = function (x) {
	        if (x < 0)
	            return this.props.width - 1;
	        if (x >= this.props.width)
	            return x % this.props.width;
	        return x;
	    };
	    LifeBoard.prototype.getToroidalY = function (y) {
	        if (y < 0)
	            return this.props.height - 1;
	        if (y >= this.props.height)
	            return y % this.props.height;
	        return y;
	    };
	    LifeBoard.prototype.updateNeighbors = function (x, y, modification) {
	        var _this = this;
	        [
	            // Above
	            [0, -1],
	            // Below
	            [0, 1],
	            // Left
	            [-1, 0],
	            // Right 
	            [1, 0],
	            // Above Left
	            [-1, -1],
	            // Above Right
	            [1, -1],
	            // Below Left
	            [-1, 1],
	            // Below Right
	            [1, 1]
	        ].map(function (addressTransformation) {
	            var dx = addressTransformation[0];
	            var dy = addressTransformation[1];
	            _this.pendingBoard[_this.getToroidalX(x + dx) + 'x' + _this.getToroidalY(y + dy)].livingNeighbors += modification;
	        });
	    };
	    LifeBoard.prototype.modifyCell = function (x, y, alive) {
	        // Use toroidal address
	        var nx = this.getToroidalX(x);
	        var ny = this.getToroidalY(y);
	        this.pendingBoard[nx + 'x' + ny].alive = alive;
	        this.updateNeighbors(nx, ny, (alive ? 1 : -1));
	    };
	    LifeBoard.prototype.birthCell = function (x, y, updateBoard) {
	        if (updateBoard === void 0) { updateBoard = false; }
	        // If this cell is already alive, bail out
	        if (this.pendingBoard[x + 'x' + y].alive)
	            return;
	        this.modifyCell(x, y, true);
	        if (updateBoard)
	            this.flushBoard();
	    };
	    LifeBoard.prototype.killCell = function (x, y, updateBoard) {
	        if (updateBoard === void 0) { updateBoard = false; }
	        // If this cell is already dead, bail out
	        if (!this.pendingBoard[x + 'x' + y].alive)
	            return;
	        this.modifyCell(x, y, false);
	        if (updateBoard)
	            this.flushBoard();
	    };
	    LifeBoard.prototype.toggleCell = function (x, y) {
	        if (this.state.cells[x + 'x' + y].alive) {
	            this.killCell(x, y, true);
	        }
	        else {
	            this.birthCell(x, y, true);
	        }
	    };
	    LifeBoard.prototype.flushBoard = function () {
	        this.setState({
	            cells: JSON.parse(JSON.stringify(this.pendingBoard)),
	        });
	    };
	    LifeBoard.prototype.clearBoard = function () {
	        for (var x = 0; x < this.props.width; x++) {
	            for (var y = 0; y < this.props.height; y++) {
	                this.killCell(x, y);
	            }
	        }
	        this.flushBoard();
	        this.props.pubsub.emit("reset-generation");
	    };
	    LifeBoard.prototype.randomizeBoard = function () {
	        this.clearBoard();
	        for (var x = 0; x < this.props.width; x++) {
	            for (var y = 0; y < this.props.height; y++) {
	                if (Math.random() < 0.5)
	                    this.birthCell(x, y);
	            }
	        }
	        this.flushBoard();
	    };
	    LifeBoard.prototype.doTick = function () {
	        if (!this.props.ticking)
	            return;
	        this.tick();
	    };
	    LifeBoard.prototype.tick = function () {
	        var _this = this;
	        var changeList = [];
	        for (var x = 0; x < this.props.width; x++) {
	            for (var y = 0; y < this.props.height; y++) {
	                var cellAddress = x + 'x' + y;
	                if (this.pendingBoard[cellAddress].alive) {
	                    // Cell is alive
	                    if (this.pendingBoard[cellAddress].livingNeighbors < 2) {
	                        // Cell is alive but isolated. It will die.
	                        changeList.push('kill-' + x + '-' + y);
	                    }
	                    else if (this.pendingBoard[cellAddress].livingNeighbors > 3) {
	                        // Cell is alive but crowded. It will die.
	                        changeList.push('kill-' + x + '-' + y);
	                    }
	                }
	                else {
	                    // Cell is dead
	                    if (this.pendingBoard[cellAddress].livingNeighbors == 3) {
	                        // Cell is dead but has 3 living neighbors. It will be born.
	                        changeList.push('birth-' + x + '-' + y);
	                    }
	                }
	            }
	        }
	        // Now, apply the list of changes to the pending board, and push it to state
	        changeList.map(function (instruction) {
	            var instructions = instruction.split('-');
	            var command = instructions[0];
	            var x = parseInt(instructions[1]);
	            var y = parseInt(instructions[2]);
	            if (command == "kill") {
	                _this.killCell(x, y);
	            }
	            else if (command == "birth") {
	                _this.birthCell(x, y);
	            }
	            else {
	                console.log("Error with instruction " + command + " [" + x + "x" + "]");
	            }
	        });
	        this.flushBoard();
	        window.setTimeout(this.doTick, this.props.speed);
	        this.props.pubsub.emit('increment-generation');
	    };
	    LifeBoard.prototype.componentDidMount = function () {
	        var _this = this;
	        if (this.props.ticking)
	            this.doTick();
	        this.props.pubsub.on("clear", function () { _this.clearBoard(); });
	        this.props.pubsub.on("force-tick", function () { _this.tick(); });
	        this.props.pubsub.on("randomize", function () { _this.randomizeBoard(); });
	        this.props.pubsub.on("one-tick", function () { _this.tick(); });
	    };
	    return LifeBoard;
	}(React.Component));
	exports.LifeBoard = LifeBoard;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var LifeCell = (function (_super) {
	    __extends(LifeCell, _super);
	    function LifeCell(props) {
	        _super.call(this, props);
	    }
	    LifeCell.prototype.render = function () {
	        var _this = this;
	        return (React.createElement("div", {className: "gol-cell" + (this.props.alive ? " alive " : "") + (this.props.x < 1 ? " gol-clear" : ""), onClick: function () { _this.props.toggleCell(_this.props.x, _this.props.y); }}));
	    };
	    LifeCell.prototype.shouldComponentUpdate = function (nextProps, nextState) {
	        return this.props.alive !== nextProps.alive;
	    };
	    return LifeCell;
	}(React.Component));
	exports.LifeCell = LifeCell;


/***/ },
/* 7 */
/***/ function(module, exports) {

	// This is a very simple pub-sub component, my first attempt at one
	"use strict";
	var PubSub = (function () {
	    function PubSub() {
	        this.eventList = {};
	    }
	    PubSub.prototype.emit = function (eventName) {
	        if (this.eventList.hasOwnProperty(eventName) && this.eventList[eventName].length >= 1) {
	            this.eventList[eventName].forEach(function (listener) {
	                listener();
	            });
	        }
	    };
	    PubSub.prototype.on = function (eventName, cb) {
	        if (!this.eventList.hasOwnProperty(eventName)) {
	            this.eventList[eventName] = [cb];
	        }
	        else {
	            this.eventList[eventName].push(cb);
	        }
	    };
	    return PubSub;
	}());
	exports.PubSub = PubSub;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map