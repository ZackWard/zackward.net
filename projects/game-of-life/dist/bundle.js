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
	ReactDOM.render(React.createElement(GameOfLife_1.GameOfLife, {cols: 30, rows: 30}), document.getElementById('app'));


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
	var golBoard_1 = __webpack_require__(6);
	var GameOfLife = (function (_super) {
	    __extends(GameOfLife, _super);
	    function GameOfLife(props) {
	        _super.call(this, props);
	        // Prebind methods
	        this.updateBoard = this.updateBoard.bind(this);
	        this.clearBoard = this.clearBoard.bind(this);
	        this.togglePlaying = this.togglePlaying.bind(this);
	        this.tick = this.tick.bind(this);
	        this.state = {
	            generations: 0,
	            playing: false,
	            board: new golBoard_1.golBoard(this.props.cols, this.props.rows)
	        };
	    }
	    GameOfLife.prototype.render = function () {
	        return (React.createElement("div", {id: "game-of-life"}, React.createElement(LifeMenu_1.LifeMenu, {generations: this.state.generations, togglePlaying: this.togglePlaying, clearBoard: this.clearBoard, playing: this.state.playing}), React.createElement(LifeBoard_1.LifeBoard, {board: this.state.board, onUpdate: this.updateBoard})));
	    };
	    GameOfLife.prototype.updateBoard = function (board) {
	        this.setState({
	            generations: board.generation,
	            playing: this.state.playing,
	            board: board
	        });
	    };
	    GameOfLife.prototype.clearBoard = function () {
	        this.state.board.clear();
	        this.updateBoard(this.state.board);
	    };
	    GameOfLife.prototype.togglePlaying = function () {
	        var _this = this;
	        if (this.state.playing) {
	            this.setState({
	                generations: this.state.generations,
	                playing: false,
	                board: this.state.board
	            });
	        }
	        else {
	            this.setState({
	                generations: this.state.generations,
	                playing: true,
	                board: this.state.board
	            });
	            // Ok, now we need to actually start the ticker
	            window.setTimeout(function () { return _this.tick(); }, 250);
	        }
	    };
	    GameOfLife.prototype.tick = function () {
	        var _this = this;
	        // If the player has stopped the game, we won't proceed
	        if (!this.state.playing) {
	            return;
	        }
	        this.state.board.getNextGeneration();
	        this.updateBoard(this.state.board);
	        window.setTimeout(function () { return _this.tick(); }, 250);
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
	        // Set initial state
	        this.state = {
	            visible: false
	        };
	        // Bind this instance to our functions
	        this.toggle = this.toggle.bind(this);
	    }
	    LifeMenu.prototype.render = function () {
	        var _this = this;
	        var playIcon = "fa fa-3x " + (this.props.playing ? "fa-pause" : "fa-play");
	        return (React.createElement("div", {id: "game-of-life-menu", className: this.state.visible ? "active" : ""}, React.createElement("ul", null, React.createElement("li", null, "Play/Pause"), React.createElement("li", null, "Clear"), React.createElement("li", null, "Size"), React.createElement("li", null, "Speed")), React.createElement("div", {id: "game-of-life-menu-bottom"}, React.createElement("span", null, "Generations: ", this.props.generations), React.createElement("a", {href: "#", onClick: this.toggle}, React.createElement("i", {className: "fa fa-chevron-down fa-3x", "aria-hidden": "true"})), React.createElement("a", {href: "#", onClick: function () { return _this.props.togglePlaying(); }}, React.createElement("i", {className: playIcon, "aria-hidden": "true"})), React.createElement("a", {href: "#", onClick: function () { return _this.props.clearBoard(); }}, "Clear"))));
	    };
	    LifeMenu.prototype.toggle = function () {
	        this.setState({
	            visible: this.state.visible ? false : true
	        });
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
	var LifeBoard = (function (_super) {
	    __extends(LifeBoard, _super);
	    function LifeBoard(props) {
	        _super.call(this, props);
	        this.toggleCell = this.toggleCell.bind(this);
	    }
	    LifeBoard.prototype.render = function () {
	        var _this = this;
	        var cellKey = 0;
	        var cellArray = [];
	        for (var y = 0; y < this.props.board.height; y++) {
	            var _loop_1 = function(x) {
	                var thisCell = this_1.props.board.getCell(x, y);
	                var cellClasses = "gol-cell";
	                cellClasses += thisCell.alive ? " alive " : "";
	                cellClasses += (thisCell.x === 0) ? " gol-clear " : "";
	                cellArray.push(React.createElement("div", {key: cellKey, onClick: function () { _this.toggleCell(thisCell); }, className: cellClasses}));
	                cellKey++;
	            };
	            var this_1 = this;
	            for (var x = 0; x < this.props.board.width; x++) {
	                _loop_1(x);
	            }
	        }
	        return (React.createElement("div", {id: "gol-board"}, cellArray));
	    };
	    LifeBoard.prototype.toggleCell = function (cell) {
	        console.log("Toggle cell [" + cell.x + ", " + cell.y + "]!");
	        if (cell.alive) {
	            this.props.board.kill(cell.x, cell.y);
	        }
	        else {
	            this.props.board.birth(cell.x, cell.y);
	        }
	        // We need to let the app know that we've updated state.
	        this.props.onUpdate(this.props.board);
	    };
	    return LifeBoard;
	}(React.Component));
	exports.LifeBoard = LifeBoard;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var golCell_ts_1 = __webpack_require__(7);
	var golBoard = (function () {
	    function golBoard(width, height) {
	        this.width = width;
	        this.height = height;
	        this.generation = 0;
	        this.board = {};
	        this.livingCells = [];
	        // This will be used to quickly check a cell's neighbors
	        this.neighbors = [
	            {
	                // Above
	                x: 0,
	                y: -1
	            },
	            {
	                // Below
	                x: 0,
	                y: 1
	            },
	            {
	                // Left
	                x: -1,
	                y: 0
	            },
	            {
	                // Right
	                x: 1,
	                y: 0
	            },
	            {
	                // Above Left
	                x: -1,
	                y: -1
	            },
	            {
	                // Above Right
	                x: 1,
	                y: -1
	            },
	            {
	                // Below Left
	                x: -1,
	                y: 1
	            },
	            {
	                // Below Right
	                x: 1,
	                y: 1
	            }
	        ];
	        for (var x = 0; x < width; x++) {
	            for (var y = 0; y < height; y++) {
	                this.board[x + "x" + y] = new golCell_ts_1.golCell(x, y);
	                // We want to randomly assign life or death to a cell to build a random board pattern
	                if (Math.random() < 0.5) {
	                    this.birth(x, y);
	                }
	            }
	        }
	    }
	    golBoard.prototype.getCell = function (x, y) {
	        var address = this.getToroidalX(x) + "x" + this.getToroidalY(y);
	        return this.board[address];
	    };
	    golBoard.prototype.getToroidalX = function (x) {
	        var nx = x;
	        if (nx < 0)
	            nx = this.width - 1;
	        if (nx >= this.width)
	            nx = nx % this.width;
	        return nx;
	    };
	    golBoard.prototype.getToroidalY = function (y) {
	        var ny = y;
	        if (ny < 0)
	            ny = this.height - 1;
	        if (ny >= this.height)
	            ny = ny % this.height;
	        return ny;
	    };
	    golBoard.prototype.getLivingNeighborsCount = function (x, y) {
	        var _this = this;
	        var livingNeighbors = 0;
	        this.neighbors.map(function (neighbor) {
	            if (_this.getCell(x + neighbor.x, y + neighbor.y).alive)
	                livingNeighbors++;
	        });
	        return livingNeighbors;
	    };
	    golBoard.prototype.kill = function (x, y) {
	        this.getCell(x, y).alive = false;
	        if (this.livingCells.indexOf(x + "x" + y) !== -1) {
	            this.livingCells.splice(this.livingCells.indexOf(x + "x" + y), 1);
	        }
	    };
	    golBoard.prototype.birth = function (x, y) {
	        this.getCell(x, y).alive = true;
	        if (this.livingCells.indexOf(x + "x" + y) === -1) {
	            this.livingCells.push(x + "x" + y);
	        }
	    };
	    golBoard.prototype.clear = function () {
	        var _this = this;
	        var killList = this.livingCells.slice(0);
	        killList.map(function (cellAddress) {
	            var x = parseInt(cellAddress.split('x')[0]);
	            var y = parseInt(cellAddress.split('x')[1]);
	            _this.kill(x, y);
	        });
	    };
	    golBoard.prototype.getNextGeneration = function () {
	        var _this = this;
	        // First, we need to get a list of every living cell, and every cell that is adjacent to a living cell
	        var livingAndAdjacentList = [];
	        this.livingCells.map(function (livingCell) {
	            livingAndAdjacentList.push(livingCell);
	            var cellAddress = livingCell.split('x');
	            var x = cellAddress[0];
	            var y = cellAddress[1];
	            _this.neighbors.map(function (addressTransformation) {
	                var nx = _this.getToroidalX(parseInt(x) + addressTransformation.x);
	                var ny = _this.getToroidalY(parseInt(y) + addressTransformation.y);
	                if (livingAndAdjacentList.indexOf(nx + "x" + ny) === -1) {
	                    livingAndAdjacentList.push(nx + "x" + ny);
	                }
	            });
	        });
	        // Ok, now we have a list of every cell that might change status. Now we need to see what changes will actually occur.
	        // We can't actually make any changes until we evaluate every living cell and any living-adjacent cells.
	        var pendingChanges = [];
	        livingAndAdjacentList.map(function (cellAddress) {
	            var cellX = parseInt(cellAddress.split('x')[0]);
	            var cellY = parseInt(cellAddress.split('x')[1]);
	            var living = _this.getCell(cellX, cellY).alive;
	            var livingNeighbors = _this.getLivingNeighborsCount(cellX, cellY);
	            if (living) {
	                if (livingNeighbors < 2 || livingNeighbors > 3) {
	                    pendingChanges.push("kill-" + cellX + "-" + cellY);
	                }
	            }
	            else {
	                if (livingNeighbors == 3) {
	                    pendingChanges.push("birth-" + cellX + "-" + cellY);
	                }
	            }
	        });
	        // Now, actually make the changes
	        console.log(pendingChanges);
	        this.generation++;
	        pendingChanges.map(function (orderString) {
	            var order = orderString.split('-');
	            var command = order[0];
	            var x = parseInt(order[1]);
	            var y = parseInt(order[2]);
	            if (command === 'kill') {
	                console.log("Killing " + x + "-" + y);
	                _this.kill(x, y);
	            }
	            else if (command === 'birth') {
	                console.log("Birthing " + x + "-" + y);
	                _this.birth(x, y);
	            }
	            else {
	                console.log("Something went wrong");
	            }
	        });
	    };
	    return golBoard;
	}());
	exports.golBoard = golBoard;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	var golCell = (function () {
	    function golCell(x, y, living) {
	        if (living === void 0) { living = false; }
	        this.x = x;
	        this.y = y;
	        this.alive = living;
	    }
	    return golCell;
	}());
	exports.golCell = golCell;
	;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map