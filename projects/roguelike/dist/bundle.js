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
	var redux_1 = __webpack_require__(3);
	var react_redux_1 = __webpack_require__(19);
	var reducer_1 = __webpack_require__(28);
	var Roguelike_1 = __webpack_require__(32);
	var store = redux_1.createStore(reducer_1.reducer);
	ReactDOM.render(React.createElement(react_redux_1.Provider, {store: store}, React.createElement(Roguelike_1.Roguelike, null)), document.getElementById('app'));


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

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;
	
	var _createStore = __webpack_require__(5);
	
	var _createStore2 = _interopRequireDefault(_createStore);
	
	var _combineReducers = __webpack_require__(14);
	
	var _combineReducers2 = _interopRequireDefault(_combineReducers);
	
	var _bindActionCreators = __webpack_require__(16);
	
	var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);
	
	var _applyMiddleware = __webpack_require__(17);
	
	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);
	
	var _compose = __webpack_require__(18);
	
	var _compose2 = _interopRequireDefault(_compose);
	
	var _warning = __webpack_require__(15);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/*
	* This is a dummy function to check if the function name has been altered by minification.
	* If the function has been minified and NODE_ENV !== 'production', warn the user.
	*/
	function isCrushed() {}
	
	if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
	  (0, _warning2['default'])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
	}
	
	exports.createStore = _createStore2['default'];
	exports.combineReducers = _combineReducers2['default'];
	exports.bindActionCreators = _bindActionCreators2['default'];
	exports.applyMiddleware = _applyMiddleware2['default'];
	exports.compose = _compose2['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.ActionTypes = undefined;
	exports['default'] = createStore;
	
	var _isPlainObject = __webpack_require__(6);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _symbolObservable = __webpack_require__(11);
	
	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = exports.ActionTypes = {
	  INIT: '@@redux/INIT'
	};
	
	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [preloadedState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} enhancer The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */
	function createStore(reducer, preloadedState, enhancer) {
	  var _ref2;
	
	  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = preloadedState;
	    preloadedState = undefined;
	  }
	
	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }
	
	    return enhancer(createStore)(reducer, preloadedState);
	  }
	
	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }
	
	  var currentReducer = reducer;
	  var currentState = preloadedState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;
	
	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }
	
	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }
	
	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected listener to be a function.');
	    }
	
	    var isSubscribed = true;
	
	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);
	
	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }
	
	      isSubscribed = false;
	
	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }
	
	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!(0, _isPlainObject2['default'])(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }
	
	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }
	
	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }
	
	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }
	
	    var listeners = currentListeners = nextListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i]();
	    }
	
	    return action;
	  }
	
	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }
	
	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }
	
	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/zenparsing/es-observable
	   */
	  function observable() {
	    var _ref;
	
	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */
	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object') {
	          throw new TypeError('Expected the observer to be an object.');
	        }
	
	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }
	
	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return { unsubscribe: unsubscribe };
	      }
	    }, _ref[_symbolObservable2['default']] = function () {
	      return this;
	    }, _ref;
	  }
	
	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });
	
	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[_symbolObservable2['default']] = observable, _ref2;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(7),
	    isHostObject = __webpack_require__(9),
	    isObjectLike = __webpack_require__(10);
	
	/** `Object#toString` result references. */
	var objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) ||
	      objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}
	
	module.exports = isPlainObject;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(8);
	
	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);
	
	module.exports = getPrototype;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}
	
	module.exports = overArg;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}
	
	module.exports = isHostObject;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(12);


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _ponyfill = __webpack_require__(13);
	
	var _ponyfill2 = _interopRequireDefault(_ponyfill);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var root = undefined; /* global window */
	
	if (typeof global !== 'undefined') {
		root = global;
	} else if (typeof window !== 'undefined') {
		root = window;
	}
	
	var result = (0, _ponyfill2['default'])(root);
	exports['default'] = result;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports['default'] = symbolObservablePonyfill;
	function symbolObservablePonyfill(root) {
		var result;
		var _Symbol = root.Symbol;
	
		if (typeof _Symbol === 'function') {
			if (_Symbol.observable) {
				result = _Symbol.observable;
			} else {
				result = _Symbol('observable');
				_Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}
	
		return result;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports['default'] = combineReducers;
	
	var _createStore = __webpack_require__(5);
	
	var _isPlainObject = __webpack_require__(6);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _warning = __webpack_require__(15);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';
	
	  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
	}
	
	function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
	  var reducerKeys = Object.keys(reducers);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';
	
	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }
	
	  if (!(0, _isPlainObject2['default'])(inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }
	
	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
	  });
	
	  unexpectedKeys.forEach(function (key) {
	    unexpectedKeyCache[key] = true;
	  });
	
	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}
	
	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });
	
	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }
	
	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}
	
	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */
	function combineReducers(reducers) {
	  var reducerKeys = Object.keys(reducers);
	  var finalReducers = {};
	  for (var i = 0; i < reducerKeys.length; i++) {
	    var key = reducerKeys[i];
	
	    if (process.env.NODE_ENV !== 'production') {
	      if (typeof reducers[key] === 'undefined') {
	        (0, _warning2['default'])('No reducer provided for key "' + key + '"');
	      }
	    }
	
	    if (typeof reducers[key] === 'function') {
	      finalReducers[key] = reducers[key];
	    }
	  }
	  var finalReducerKeys = Object.keys(finalReducers);
	
	  if (process.env.NODE_ENV !== 'production') {
	    var unexpectedKeyCache = {};
	  }
	
	  var sanityError;
	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }
	
	  return function combination() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];
	
	    if (sanityError) {
	      throw sanityError;
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
	      if (warningMessage) {
	        (0, _warning2['default'])(warningMessage);
	      }
	    }
	
	    var hasChanged = false;
	    var nextState = {};
	    for (var i = 0; i < finalReducerKeys.length; i++) {
	      var key = finalReducerKeys[i];
	      var reducer = finalReducers[key];
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      nextState[key] = nextStateForKey;
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	    }
	    return hasChanged ? nextState : state;
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = bindActionCreators;
	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}
	
	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }
	
	  if (typeof actionCreators !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }
	
	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports['default'] = applyMiddleware;
	
	var _compose = __webpack_require__(18);
	
	var _compose2 = _interopRequireDefault(_compose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }
	
	  return function (createStore) {
	    return function (reducer, preloadedState, enhancer) {
	      var store = createStore(reducer, preloadedState, enhancer);
	      var _dispatch = store.dispatch;
	      var chain = [];
	
	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);
	
	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = compose;
	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */
	
	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }
	
	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  }
	
	  if (funcs.length === 1) {
	    return funcs[0];
	  }
	
	  var last = funcs[funcs.length - 1];
	  var rest = funcs.slice(0, -1);
	  return function () {
	    return rest.reduceRight(function (composed, f) {
	      return f(composed);
	    }, last.apply(undefined, arguments));
	  };
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.connect = exports.Provider = undefined;
	
	var _Provider = __webpack_require__(20);
	
	var _Provider2 = _interopRequireDefault(_Provider);
	
	var _connect = __webpack_require__(23);
	
	var _connect2 = _interopRequireDefault(_connect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports.Provider = _Provider2["default"];
	exports.connect = _connect2["default"];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports["default"] = undefined;
	
	var _react = __webpack_require__(1);
	
	var _storeShape = __webpack_require__(21);
	
	var _storeShape2 = _interopRequireDefault(_storeShape);
	
	var _warning = __webpack_require__(22);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var didWarnAboutReceivingStore = false;
	function warnAboutReceivingStore() {
	  if (didWarnAboutReceivingStore) {
	    return;
	  }
	  didWarnAboutReceivingStore = true;
	
	  (0, _warning2["default"])('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
	}
	
	var Provider = function (_Component) {
	  _inherits(Provider, _Component);
	
	  Provider.prototype.getChildContext = function getChildContext() {
	    return { store: this.store };
	  };
	
	  function Provider(props, context) {
	    _classCallCheck(this, Provider);
	
	    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));
	
	    _this.store = props.store;
	    return _this;
	  }
	
	  Provider.prototype.render = function render() {
	    var children = this.props.children;
	
	    return _react.Children.only(children);
	  };
	
	  return Provider;
	}(_react.Component);
	
	exports["default"] = Provider;
	
	if (process.env.NODE_ENV !== 'production') {
	  Provider.prototype.componentWillReceiveProps = function (nextProps) {
	    var store = this.store;
	    var nextStore = nextProps.store;
	
	    if (store !== nextStore) {
	      warnAboutReceivingStore();
	    }
	  };
	}
	
	Provider.propTypes = {
	  store: _storeShape2["default"].isRequired,
	  children: _react.PropTypes.element.isRequired
	};
	Provider.childContextTypes = {
	  store: _storeShape2["default"].isRequired
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	exports["default"] = _react.PropTypes.shape({
	  subscribe: _react.PropTypes.func.isRequired,
	  dispatch: _react.PropTypes.func.isRequired,
	  getState: _react.PropTypes.func.isRequired
	});

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports["default"] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that you can use this stack
	    // to find the callsite that caused this warning to fire.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.__esModule = true;
	exports["default"] = connect;
	
	var _react = __webpack_require__(1);
	
	var _storeShape = __webpack_require__(21);
	
	var _storeShape2 = _interopRequireDefault(_storeShape);
	
	var _shallowEqual = __webpack_require__(24);
	
	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
	var _wrapActionCreators = __webpack_require__(25);
	
	var _wrapActionCreators2 = _interopRequireDefault(_wrapActionCreators);
	
	var _warning = __webpack_require__(22);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _isPlainObject = __webpack_require__(6);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _hoistNonReactStatics = __webpack_require__(26);
	
	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);
	
	var _invariant = __webpack_require__(27);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var defaultMapStateToProps = function defaultMapStateToProps(state) {
	  return {};
	}; // eslint-disable-line no-unused-vars
	var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
	  return { dispatch: dispatch };
	};
	var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
	  return _extends({}, parentProps, stateProps, dispatchProps);
	};
	
	function getDisplayName(WrappedComponent) {
	  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	}
	
	var errorObject = { value: null };
	function tryCatch(fn, ctx) {
	  try {
	    return fn.apply(ctx);
	  } catch (e) {
	    errorObject.value = e;
	    return errorObject;
	  }
	}
	
	// Helps track hot reloading.
	var nextVersion = 0;
	
	function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
	  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	  var shouldSubscribe = Boolean(mapStateToProps);
	  var mapState = mapStateToProps || defaultMapStateToProps;
	
	  var mapDispatch = undefined;
	  if (typeof mapDispatchToProps === 'function') {
	    mapDispatch = mapDispatchToProps;
	  } else if (!mapDispatchToProps) {
	    mapDispatch = defaultMapDispatchToProps;
	  } else {
	    mapDispatch = (0, _wrapActionCreators2["default"])(mapDispatchToProps);
	  }
	
	  var finalMergeProps = mergeProps || defaultMergeProps;
	  var _options$pure = options.pure;
	  var pure = _options$pure === undefined ? true : _options$pure;
	  var _options$withRef = options.withRef;
	  var withRef = _options$withRef === undefined ? false : _options$withRef;
	
	  var checkMergedEquals = pure && finalMergeProps !== defaultMergeProps;
	
	  // Helps track hot reloading.
	  var version = nextVersion++;
	
	  return function wrapWithConnect(WrappedComponent) {
	    var connectDisplayName = 'Connect(' + getDisplayName(WrappedComponent) + ')';
	
	    function checkStateShape(props, methodName) {
	      if (!(0, _isPlainObject2["default"])(props)) {
	        (0, _warning2["default"])(methodName + '() in ' + connectDisplayName + ' must return a plain object. ' + ('Instead received ' + props + '.'));
	      }
	    }
	
	    function computeMergedProps(stateProps, dispatchProps, parentProps) {
	      var mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps);
	      if (process.env.NODE_ENV !== 'production') {
	        checkStateShape(mergedProps, 'mergeProps');
	      }
	      return mergedProps;
	    }
	
	    var Connect = function (_Component) {
	      _inherits(Connect, _Component);
	
	      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
	        return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged;
	      };
	
	      function Connect(props, context) {
	        _classCallCheck(this, Connect);
	
	        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));
	
	        _this.version = version;
	        _this.store = props.store || context.store;
	
	        (0, _invariant2["default"])(_this.store, 'Could not find "store" in either the context or ' + ('props of "' + connectDisplayName + '". ') + 'Either wrap the root component in a <Provider>, ' + ('or explicitly pass "store" as a prop to "' + connectDisplayName + '".'));
	
	        var storeState = _this.store.getState();
	        _this.state = { storeState: storeState };
	        _this.clearCache();
	        return _this;
	      }
	
	      Connect.prototype.computeStateProps = function computeStateProps(store, props) {
	        if (!this.finalMapStateToProps) {
	          return this.configureFinalMapState(store, props);
	        }
	
	        var state = store.getState();
	        var stateProps = this.doStatePropsDependOnOwnProps ? this.finalMapStateToProps(state, props) : this.finalMapStateToProps(state);
	
	        if (process.env.NODE_ENV !== 'production') {
	          checkStateShape(stateProps, 'mapStateToProps');
	        }
	        return stateProps;
	      };
	
	      Connect.prototype.configureFinalMapState = function configureFinalMapState(store, props) {
	        var mappedState = mapState(store.getState(), props);
	        var isFactory = typeof mappedState === 'function';
	
	        this.finalMapStateToProps = isFactory ? mappedState : mapState;
	        this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1;
	
	        if (isFactory) {
	          return this.computeStateProps(store, props);
	        }
	
	        if (process.env.NODE_ENV !== 'production') {
	          checkStateShape(mappedState, 'mapStateToProps');
	        }
	        return mappedState;
	      };
	
	      Connect.prototype.computeDispatchProps = function computeDispatchProps(store, props) {
	        if (!this.finalMapDispatchToProps) {
	          return this.configureFinalMapDispatch(store, props);
	        }
	
	        var dispatch = store.dispatch;
	
	        var dispatchProps = this.doDispatchPropsDependOnOwnProps ? this.finalMapDispatchToProps(dispatch, props) : this.finalMapDispatchToProps(dispatch);
	
	        if (process.env.NODE_ENV !== 'production') {
	          checkStateShape(dispatchProps, 'mapDispatchToProps');
	        }
	        return dispatchProps;
	      };
	
	      Connect.prototype.configureFinalMapDispatch = function configureFinalMapDispatch(store, props) {
	        var mappedDispatch = mapDispatch(store.dispatch, props);
	        var isFactory = typeof mappedDispatch === 'function';
	
	        this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch;
	        this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1;
	
	        if (isFactory) {
	          return this.computeDispatchProps(store, props);
	        }
	
	        if (process.env.NODE_ENV !== 'production') {
	          checkStateShape(mappedDispatch, 'mapDispatchToProps');
	        }
	        return mappedDispatch;
	      };
	
	      Connect.prototype.updateStatePropsIfNeeded = function updateStatePropsIfNeeded() {
	        var nextStateProps = this.computeStateProps(this.store, this.props);
	        if (this.stateProps && (0, _shallowEqual2["default"])(nextStateProps, this.stateProps)) {
	          return false;
	        }
	
	        this.stateProps = nextStateProps;
	        return true;
	      };
	
	      Connect.prototype.updateDispatchPropsIfNeeded = function updateDispatchPropsIfNeeded() {
	        var nextDispatchProps = this.computeDispatchProps(this.store, this.props);
	        if (this.dispatchProps && (0, _shallowEqual2["default"])(nextDispatchProps, this.dispatchProps)) {
	          return false;
	        }
	
	        this.dispatchProps = nextDispatchProps;
	        return true;
	      };
	
	      Connect.prototype.updateMergedPropsIfNeeded = function updateMergedPropsIfNeeded() {
	        var nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props);
	        if (this.mergedProps && checkMergedEquals && (0, _shallowEqual2["default"])(nextMergedProps, this.mergedProps)) {
	          return false;
	        }
	
	        this.mergedProps = nextMergedProps;
	        return true;
	      };
	
	      Connect.prototype.isSubscribed = function isSubscribed() {
	        return typeof this.unsubscribe === 'function';
	      };
	
	      Connect.prototype.trySubscribe = function trySubscribe() {
	        if (shouldSubscribe && !this.unsubscribe) {
	          this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
	          this.handleChange();
	        }
	      };
	
	      Connect.prototype.tryUnsubscribe = function tryUnsubscribe() {
	        if (this.unsubscribe) {
	          this.unsubscribe();
	          this.unsubscribe = null;
	        }
	      };
	
	      Connect.prototype.componentDidMount = function componentDidMount() {
	        this.trySubscribe();
	      };
	
	      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        if (!pure || !(0, _shallowEqual2["default"])(nextProps, this.props)) {
	          this.haveOwnPropsChanged = true;
	        }
	      };
	
	      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
	        this.tryUnsubscribe();
	        this.clearCache();
	      };
	
	      Connect.prototype.clearCache = function clearCache() {
	        this.dispatchProps = null;
	        this.stateProps = null;
	        this.mergedProps = null;
	        this.haveOwnPropsChanged = true;
	        this.hasStoreStateChanged = true;
	        this.haveStatePropsBeenPrecalculated = false;
	        this.statePropsPrecalculationError = null;
	        this.renderedElement = null;
	        this.finalMapDispatchToProps = null;
	        this.finalMapStateToProps = null;
	      };
	
	      Connect.prototype.handleChange = function handleChange() {
	        if (!this.unsubscribe) {
	          return;
	        }
	
	        var storeState = this.store.getState();
	        var prevStoreState = this.state.storeState;
	        if (pure && prevStoreState === storeState) {
	          return;
	        }
	
	        if (pure && !this.doStatePropsDependOnOwnProps) {
	          var haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this);
	          if (!haveStatePropsChanged) {
	            return;
	          }
	          if (haveStatePropsChanged === errorObject) {
	            this.statePropsPrecalculationError = errorObject.value;
	          }
	          this.haveStatePropsBeenPrecalculated = true;
	        }
	
	        this.hasStoreStateChanged = true;
	        this.setState({ storeState: storeState });
	      };
	
	      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
	        (0, _invariant2["default"])(withRef, 'To access the wrapped instance, you need to specify ' + '{ withRef: true } as the fourth argument of the connect() call.');
	
	        return this.refs.wrappedInstance;
	      };
	
	      Connect.prototype.render = function render() {
	        var haveOwnPropsChanged = this.haveOwnPropsChanged;
	        var hasStoreStateChanged = this.hasStoreStateChanged;
	        var haveStatePropsBeenPrecalculated = this.haveStatePropsBeenPrecalculated;
	        var statePropsPrecalculationError = this.statePropsPrecalculationError;
	        var renderedElement = this.renderedElement;
	
	        this.haveOwnPropsChanged = false;
	        this.hasStoreStateChanged = false;
	        this.haveStatePropsBeenPrecalculated = false;
	        this.statePropsPrecalculationError = null;
	
	        if (statePropsPrecalculationError) {
	          throw statePropsPrecalculationError;
	        }
	
	        var shouldUpdateStateProps = true;
	        var shouldUpdateDispatchProps = true;
	        if (pure && renderedElement) {
	          shouldUpdateStateProps = hasStoreStateChanged || haveOwnPropsChanged && this.doStatePropsDependOnOwnProps;
	          shouldUpdateDispatchProps = haveOwnPropsChanged && this.doDispatchPropsDependOnOwnProps;
	        }
	
	        var haveStatePropsChanged = false;
	        var haveDispatchPropsChanged = false;
	        if (haveStatePropsBeenPrecalculated) {
	          haveStatePropsChanged = true;
	        } else if (shouldUpdateStateProps) {
	          haveStatePropsChanged = this.updateStatePropsIfNeeded();
	        }
	        if (shouldUpdateDispatchProps) {
	          haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded();
	        }
	
	        var haveMergedPropsChanged = true;
	        if (haveStatePropsChanged || haveDispatchPropsChanged || haveOwnPropsChanged) {
	          haveMergedPropsChanged = this.updateMergedPropsIfNeeded();
	        } else {
	          haveMergedPropsChanged = false;
	        }
	
	        if (!haveMergedPropsChanged && renderedElement) {
	          return renderedElement;
	        }
	
	        if (withRef) {
	          this.renderedElement = (0, _react.createElement)(WrappedComponent, _extends({}, this.mergedProps, {
	            ref: 'wrappedInstance'
	          }));
	        } else {
	          this.renderedElement = (0, _react.createElement)(WrappedComponent, this.mergedProps);
	        }
	
	        return this.renderedElement;
	      };
	
	      return Connect;
	    }(_react.Component);
	
	    Connect.displayName = connectDisplayName;
	    Connect.WrappedComponent = WrappedComponent;
	    Connect.contextTypes = {
	      store: _storeShape2["default"]
	    };
	    Connect.propTypes = {
	      store: _storeShape2["default"]
	    };
	
	    if (process.env.NODE_ENV !== 'production') {
	      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
	        if (this.version === version) {
	          return;
	        }
	
	        // We are hot reloading!
	        this.version = version;
	        this.trySubscribe();
	        this.clearCache();
	      };
	    }
	
	    return (0, _hoistNonReactStatics2["default"])(Connect, WrappedComponent);
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = shallowEqual;
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	
	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);
	
	  if (keysA.length !== keysB.length) {
	    return false;
	  }
	
	  // Test for A's keys different from B.
	  var hasOwn = Object.prototype.hasOwnProperty;
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }
	
	  return true;
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports["default"] = wrapActionCreators;
	
	var _redux = __webpack_require__(3);
	
	function wrapActionCreators(actionCreators) {
	  return function (dispatch) {
	    return (0, _redux.bindActionCreators)(actionCreators, dispatch);
	  };
	}

/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';
	
	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};
	
	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};
	
	var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';
	
	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
	    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
	        var keys = Object.getOwnPropertyNames(sourceComponent);
	
	        /* istanbul ignore else */
	        if (isGetOwnPropertySymbolsAvailable) {
	            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
	        }
	
	        for (var i = 0; i < keys.length; ++i) {
	            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
	                try {
	                    targetComponent[keys[i]] = sourceComponent[keys[i]];
	                } catch (error) {
	
	                }
	            }
	        }
	    }
	
	    return targetComponent;
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var actions_1 = __webpack_require__(29);
	var MapGenerator_1 = __webpack_require__(30);
	function movePlayer(state, deltax, deltay) {
	    var player = state.entities[state.hero];
	    var currentLocation = player.location.split('x');
	    var destX = parseInt(currentLocation[0]) + deltax;
	    var destY = parseInt(currentLocation[1]) + deltay;
	    var dest = destX + "x" + destY;
	    // Bail out if the destination is out of bounds or not walkable
	    if (destX < 0 || destX >= state.map.width || destY < 0 || destY >= state.map.height || state.map.tiles[dest].walkable === false) {
	        state.status.bumpx = deltax == 0 ? state.status.bumpx : state.status.bumpx + 1;
	        state.status.bumpy = deltay == 0 ? state.status.bumpy : state.status.bumpy + 1;
	        return checkPlatino(state);
	    }
	    state.status.bumpx = 0;
	    state.status.bumpy = 0;
	    // If the destination is currently occupied by another entity, handle that situation and return the new state
	    if (state.map.tiles[dest].hasOwnProperty('entity')) {
	        return handleEncounter(state, state.map.tiles[dest].entity);
	    }
	    // If the destination currently has an item in it, we want to pick it up as we move
	    if (state.map.tiles[dest].hasOwnProperty('item')) {
	        var itemIndex_1 = state.map.tiles[dest].item;
	        state.messages.push("You picked up " + state.items[itemIndex_1].name);
	        delete state.items[itemIndex_1].location;
	        state.entities[state.hero].inventory.push(itemIndex_1);
	        // If it was a weapon that is better than our current weapon, auto-equip it
	        var currentWeapon_1 = state.entities[state.hero].weapon;
	        if (state.items[itemIndex_1].type == "weapon" && state.items[itemIndex_1].value > state.items[currentWeapon_1].value) {
	            state.messages.push("You begin to use " + state.items[itemIndex_1].name + " and throw away your old weapon.");
	            state.entities[state.hero].inventory = state.entities[state.hero].inventory.filter(function (item) { return item !== currentWeapon_1; });
	            delete state.items[currentWeapon_1];
	            state.entities[state.hero].weapon = itemIndex_1;
	        }
	        else if (state.items[itemIndex_1].type == "weapon" && state.items[itemIndex_1].value <= state.items[currentWeapon_1].value) {
	            state.messages.push(state.items[itemIndex_1].name + " looks less powerful than what you're currently using. You throw it away.");
	            state.entities[state.hero].inventory = state.entities[state.hero].inventory.filter(function (item) { return item !== itemIndex_1; });
	            delete state.items[itemIndex_1];
	        }
	        delete state.map.tiles[dest].item;
	    }
	    // Update player location.
	    // First, remove the hero entity from it's current tile
	    delete state.map.tiles[player.location].entity;
	    // Then, add the hero entity to it's destination tile
	    state.map.tiles[dest].entity = state.hero;
	    // Finally, update the location in the entity
	    state.entities[state.hero].location = dest;
	    return moveCamera(state, deltax, deltay);
	}
	function checkPlatino(state) {
	    if (state.status.bumpx == 50 && state.status.bumpy == 50) {
	        state.messages.push("You seem to be a little lost. The Platino shows up and takes over.");
	        state.entities[state.hero].sprite = 4;
	    }
	    return state;
	}
	function attemptAttack(attacker, target) {
	    var roll = rollDice(1, 20);
	    if (roll == 1)
	        return false;
	    if (roll == 20)
	        return true;
	    var levelDifference = attacker.level - target.level;
	    if (roll + levelDifference >= 10)
	        return true;
	    return false;
	}
	function rollDice(dice, sides) {
	    var acc = 0;
	    for (var i = dice; i > 0; i--) {
	        acc += Math.ceil(Math.random() * sides);
	    }
	    return acc;
	}
	function handleEncounter(state, targetEntity) {
	    var hero = state.entities[state.hero];
	    var target = state.entities[targetEntity];
	    // Player does damage First
	    if (attemptAttack(hero, target)) {
	        var playerDamage = rollDice(2, (hero.level * 2) + state.items[hero.weapon].value);
	        state.messages.push("You attack " + target.name + " for " + playerDamage + " damage!");
	        state.entities[targetEntity].hp -= playerDamage;
	    }
	    else {
	        state.messages.push("You attempt to attack " + target.name + ", but you miss!");
	    }
	    // Check to see if enemy is dead
	    if (state.entities[targetEntity].hp < 1) {
	        // Check to see if we just killed the boss. If so, we won!
	        if (target.name == "The Boss") {
	            state.status.won = true;
	            return state;
	        }
	        // Award experience to player
	        var awardedXp = target.level * 10;
	        state.messages.push("You defeat " + target.name + "! You're awarded " + awardedXp + " experience.");
	        // Check to see if the player has enough xp to advance a level. In rare cases, the player may advance several levels
	        while (awardedXp + state.entities[state.hero].xp >= state.entities[state.hero].level * 30) {
	            var usedXp = (state.entities[state.hero].level * 30) - state.entities[state.hero].xp;
	            state.entities[state.hero].level++;
	            state.messages.push("You advance to level " + state.entities[state.hero].level + "!");
	            state.entities[state.hero].xp = 0;
	            awardedXp -= usedXp;
	        }
	        state.entities[state.hero].xp += awardedXp;
	        // Move the player into the cell previously occupied by the enemy, then delete the enemy
	        var dest = target.location;
	        delete state.map.tiles[hero.location].entity;
	        state.map.tiles[dest].entity = state.hero;
	        state.entities[state.hero].location = dest;
	        delete state.entities[targetEntity];
	        return state;
	    }
	    // Enemy does damage next
	    if (attemptAttack(target, hero)) {
	        var enemyDamage = rollDice(2, target.level * 2);
	        state.messages.push(target.name + " attacks you for  " + enemyDamage + " damage!");
	        state.entities[state.hero].hp -= enemyDamage;
	    }
	    else {
	        state.messages.push(target.name + " attempts to attack you, but misses!");
	    }
	    // Check to see if player is dead
	    if (state.entities[state.hero].hp < 1) {
	        state = MapGenerator_1.getDefaultState();
	        state.messages = ["You were killed. You decide to try again."];
	    }
	    return state;
	}
	function moveCamera(state, deltax, deltay) {
	    // Figure out where the hero is in relation to the camera
	    var heroLocation = state.entities[state.hero].location;
	    var heroX = parseInt(heroLocation.split('x')[0]) - state.map.camera.x;
	    var heroY = parseInt(heroLocation.split('x')[1]) - state.map.camera.y;
	    // If moving the camera would result in it going off of the map, return without moving
	    if (!cameraInBounds(state, deltax, deltay)) {
	        return state;
	    }
	    // Handle left move
	    if (deltax < 0 && heroX < Math.floor(state.map.camera.width / 2)) {
	        state.map.camera.x += deltax;
	    }
	    // Handle right move
	    if (deltax > 0 && heroX > Math.floor(state.map.camera.width / 2)) {
	        state.map.camera.x += deltax;
	    }
	    // Handle upward move
	    if (deltay < 0 && heroY < Math.floor(state.map.camera.height / 2)) {
	        state.map.camera.y += deltay;
	    }
	    // Handle downward move
	    if (deltay > 0 && heroY > Math.floor(state.map.camera.height / 2)) {
	        state.map.camera.y += deltay;
	    }
	    return state;
	}
	function cameraInBounds(state, deltax, deltay) {
	    // Check to make sure that camera X coordinate is in-bounds
	    if (state.map.camera.x + deltax < 0 || state.map.camera.x + deltax + state.map.camera.width > state.map.width) {
	        return false;
	    }
	    if (state.map.camera.y + deltay < 0 || state.map.camera.y + deltay + state.map.camera.height > state.map.height) {
	        return false;
	    }
	    return true;
	}
	function useItem(state, item) {
	    if (state.items[item].type == "weapon") {
	        state.entities[state.hero].weapon = item;
	    }
	    if (state.items[item].type == "healing") {
	        var healedHP = rollDice(3, 20);
	        state.entities[state.hero].hp = state.entities[state.hero].hp + healedHP > 100 ? 100 : state.entities[state.hero].hp + healedHP;
	        state.messages.push("You apply the medicine, and are healed for " + healedHP + " points.");
	        // Remove the item from the players inventory, and from the items list
	        state.entities[state.hero].inventory = state.entities[state.hero].inventory.filter(function (inventoryItem) { return inventoryItem !== item; });
	        delete state.items[item];
	    }
	    return state;
	}
	// This reducer handles all of our game logic and manages all app state
	function reducer(state, action) {
	    if (state === void 0) { state = MapGenerator_1.getDefaultState(); }
	    // Don't mutate state, get a new object to modify
	    var newState = JSON.parse(JSON.stringify(state));
	    switch (action.type) {
	        case actions_1.MOVE_UP:
	            newState = movePlayer(newState, 0, -1);
	            break;
	        case actions_1.MOVE_DOWN:
	            newState = movePlayer(newState, 0, 1);
	            break;
	        case actions_1.MOVE_RIGHT:
	            newState = movePlayer(newState, 1, 0);
	            break;
	        case actions_1.MOVE_LEFT:
	            newState = movePlayer(newState, -1, 0);
	            break;
	        case actions_1.USE_ITEM:
	            newState = useItem(newState, action.item);
	    }
	    return newState;
	}
	exports.reducer = reducer;


/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";
	exports.MOVE_UP = 'MOVE_UP';
	exports.MOVE_DOWN = 'MOVE_DOWN';
	exports.MOVE_LEFT = 'MOVE_LEFT';
	exports.MOVE_RIGHT = 'MOVE_RIGHT';
	exports.USE_ITEM = 'USE_ITEM';
	function moveUp() {
	    return {
	        type: exports.MOVE_UP,
	    };
	}
	exports.moveUp = moveUp;
	function moveDown() {
	    return {
	        type: exports.MOVE_DOWN
	    };
	}
	exports.moveDown = moveDown;
	function moveLeft() {
	    return {
	        type: exports.MOVE_LEFT
	    };
	}
	exports.moveLeft = moveLeft;
	function moveRight() {
	    return {
	        type: exports.MOVE_RIGHT
	    };
	}
	exports.moveRight = moveRight;
	function useItem(item) {
	    return {
	        type: exports.USE_ITEM,
	        item: item
	    };
	}
	exports.useItem = useItem;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var TileMap_1 = __webpack_require__(31);
	function getDefaultState() {
	    var tilemap = new TileMap_1.TileMap(100, 100);
	    var defaultState = {
	        map: {
	            width: 100,
	            height: 100,
	            camera: {
	                x: 0,
	                y: 0,
	                width: 9,
	                height: 9
	            },
	            tiles: tilemap.export()
	        },
	        messages: [],
	        hero: 0,
	        entities: [
	            {
	                type: "player",
	                name: "Hero",
	                location: "1x1",
	                sprite: 20,
	                level: 1,
	                hp: 100,
	                xp: 0,
	                inventory: [0],
	                weapon: 0
	            }
	        ],
	        items: [
	            {
	                name: "a sharp rock",
	                type: "weapon",
	                value: 0,
	                sprite: 38
	            }
	        ],
	        status: {}
	    };
	    // Please our Hero in the upper left hand corner of the map.
	    var heroLocation = "1x1";
	    defaultState.map.tiles[heroLocation].entity = defaultState.hero;
	    defaultState.entities[defaultState.hero].location = heroLocation;
	    defaultState = generateEnemies(defaultState);
	    defaultState = generateItems(defaultState);
	    return defaultState;
	}
	exports.getDefaultState = getDefaultState;
	function generateItems(state) {
	    // Generate number of bandages based on the number of enemies
	    for (var i = 0; i < Math.ceil(state.entities.length * .75) - 1; i++) {
	        var coords = getRandomEmptyTile(state);
	        var health = {
	            name: "a bottle of medicine",
	            type: "healing",
	            value: 0,
	            sprite: 6,
	            location: coords[0] + "x" + coords[1]
	        };
	        state.items.push(health);
	        state.map.tiles[coords[0] + "x" + coords[1]].item = state.items.length - 1;
	    }
	    var weapons = [
	        {
	            name: "a dagger",
	            type: "weapon",
	            value: 1,
	            sprite: 15
	        },
	        {
	            name: "a short sword",
	            type: "weapon",
	            value: 2,
	            sprite: 23
	        },
	        {
	            name: "a sword",
	            type: "weapon",
	            value: 3,
	            sprite: 31
	        },
	        {
	            name: "an axe",
	            type: "weapon",
	            value: 4,
	            sprite: 7
	        },
	        {
	            name: "a battle axe",
	            type: "weapon",
	            value: 5,
	            sprite: 39
	        }
	    ];
	    weapons.forEach(function (weapon) {
	        var coords = getRandomEmptyTile(state);
	        weapon.location = coords[0] + "x" + coords[1];
	        state.items.push(weapon);
	        state.map.tiles[coords[0] + "x" + coords[1]].item = state.items.length - 1;
	    });
	    return state;
	}
	function generateEnemies(state) {
	    var enemyCount = 10;
	    for (var level = 1; level < 11; level++) {
	        if (level == 10) {
	            state = generateBoss(state);
	        }
	        else {
	            for (var i = 0; i < enemyCount; i++) {
	                state = generateEnemy(state, level);
	            }
	            enemyCount = enemyCount > 4 ? enemyCount - 1 : enemyCount;
	        }
	    }
	    return state;
	}
	function generateEnemy(state, level) {
	    var randomNames = "Harvey Jason Miquel Issac Gayle Joan Wilbur Ronny Eugene Merle Mason Denis Mose German Irving Emil Gerry Giovanni Arnoldo Clyde Sandy Danilo Lyndon Lonny Darell Zachary Otis Spencer Dean Bennie Landon Orlando Tracey Maxwell Chad Cary Jerrold Carlo Edward Stanton Albert Pete Bobbie Glenn Tyson Doyle Jules Arden Mauricio Gus Slyvia Tanisha Catarina Chantelle Tawnya Marcene Matilde Jade Brittny Hope Eugena Eusebia Neda Davina Michelle Jazmine Kristian Margarete Hiedi Marci Arletha Socorro Tamela Valentina Patrica Evette Akiko Harmony Lindy Tawanna Joaquina Epifania Ping Kerstin Phillis Velda Elke Erica Juli Adelina Rita Beverlee Genia Kecia Deanne Belva Larae Lurline Meredith Soo";
	    var names = randomNames.split(' ');
	    var randomName = names[Math.floor(Math.random() * names.length)];
	    var sprites = [48, 49, 50, 51, 52, 53];
	    var coords = getRandomEmptyTile(state);
	    var enemy = {
	        type: "enemy",
	        name: randomName,
	        location: coords[0] + "x" + coords[1],
	        sprite: sprites[Math.floor(Math.random() * sprites.length)],
	        level: level,
	        hp: 100
	    };
	    state.entities.push(enemy);
	    state.map.tiles[coords[0] + "x" + coords[1]].entity = state.entities.length - 1;
	    return state;
	}
	function generateBoss(state) {
	    var coords = getRandomEmptyTile(state);
	    var boss = {
	        type: "enemy",
	        name: "The Boss",
	        location: coords[0] + "x" + coords[1],
	        sprite: 54,
	        level: 10,
	        hp: 100
	    };
	    state.entities.push(boss);
	    state.map.tiles[coords[0] + "x" + coords[1]].entity = state.entities.length - 1;
	    return state;
	}
	function getRandomEmptyTile(state) {
	    var randomX, randomY;
	    do {
	        randomX = Math.floor(Math.random() * state.map.width);
	        randomY = Math.floor(Math.random() * state.map.height);
	    } while (state.map.tiles[randomX + "x" + randomY].walkable == false || state.map.tiles[randomX + "x" + randomY].entity !== undefined || state.map.tiles[randomX + "x" + randomY].item !== undefined);
	    return [randomX, randomY];
	}


/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";
	var TileMap = (function () {
	    function TileMap(width, height) {
	        this.width = width;
	        this.height = height;
	        this.emptyCell = "**";
	        // Initialize our tiles
	        this.tiles = [];
	        for (var x = 0; x < width; x++) {
	            this.tiles[x] = [];
	            for (var y = 0; y < height; y++) {
	                this.tiles[x][y] = this.emptyCell;
	            }
	        }
	        // Initialize our zones
	        this.zones = this.splitZone({
	            top: 1,
	            left: 1,
	            width: width - 2,
	            height: height - 2
	        });
	        this.zones = this.shrinkZones();
	        this.generateZoneTiles();
	        // Connect our zones to hallways
	        this.connectZones();
	    }
	    TileMap.prototype.connectZones = function () {
	        var _this = this;
	        this.generateTiles();
	        this.zones.forEach(function (zone) {
	            var potentialDoors = [];
	            for (var x = zone.left; x < zone.left + zone.width; x++) {
	                for (var y = zone.top; y < zone.top + zone.height; y++) {
	                    if (_this.isPotentialDoor(zone, x, y)) {
	                        potentialDoors.push([x, y]);
	                    }
	                }
	            }
	            // Pick a random potendial door. Maybe pick a second door based on a random chance
	            if (Math.random() >= 0.55) {
	                var door1 = potentialDoors[Math.floor(Math.random() * potentialDoors.length)];
	                zone.tiles[door1[0]][door1[1]] = "DD";
	                var door2 = potentialDoors[Math.floor(Math.random() * potentialDoors.length)];
	                zone.tiles[door2[0]][door2[1]] = "DD";
	            }
	            else {
	                var door1 = potentialDoors[Math.floor(Math.random() * potentialDoors.length)];
	                zone.tiles[door1[0]][door1[1]] = "DD";
	            }
	        });
	        this.generateTiles();
	    };
	    TileMap.prototype.isPotentialDoor = function (zone, x, y) {
	        // Return false for any corners. Also, return false for the walls just N/S of corners
	        if ((x == zone.left || x == zone.left + zone.width - 1) && (y == zone.top || y == zone.top + 1 || y == zone.top + zone.height - 1 || y == zone.top + zone.height - 2)) {
	            return false;
	        }
	        // Return false for walls that are E/W of the top and bottom corners
	        if ((y == zone.top || y == zone.top + zone.height - 1) && (x == zone.left + 1 || x == zone.left + zone.width - 2)) {
	            return false;
	        }
	        if (x == zone.left && this.tiles[x - 1] !== undefined && this.tiles[x - 1][y] == this.emptyCell && y !== zone.top + 1 && y !== zone.top + zone.height - 2) {
	            return true;
	        }
	        if (x == zone.left + zone.width - 1 && this.tiles[x + 1] !== undefined && this.tiles[x + 1][y] == this.emptyCell) {
	            return true;
	        }
	        if (y == zone.top && this.tiles[x][y - 1] == this.emptyCell) {
	            return true;
	        }
	        if (y == zone.top + zone.height - 1 && this.tiles[x][y + 1] == this.emptyCell) {
	            return true;
	        }
	        return false;
	    };
	    TileMap.prototype.isCellEmpty = function (x, y) {
	        if (this.tiles[x] !== undefined && this.tiles[x][y] !== undefined && this.tiles[x][y] == this.emptyCell) {
	            return true;
	        }
	        return false;
	    };
	    TileMap.prototype.splitZone = function (zone) {
	        var minSize = 10;
	        // Occasionaly, we want to leave a huge area, but nothing larger than the minimum size * 5
	        if (zone.width < minSize * 3 && zone.height < minSize * 3 && Math.random() >= 0.925) {
	            return [zone];
	        }
	        // Randomly choose split orientation 
	        var vertical = (Math.random() >= 0.5) ? true : false;
	        // Make sure that this area is large enough to split
	        if ((vertical && zone.width < minSize * 2) || (!vertical && zone.height < minSize * 2)) {
	            // Oops, this area isn't big enough to split according to our desired orientation. Maybe it's big enough to split the other way.
	            // We'll flip our orientation and check again
	            // Maybe use a random chance to see if we should split it the other way
	            if (Math.random() >= 0.4) {
	                return [zone];
	            }
	            vertical = vertical ? false : true;
	            if ((vertical && zone.width < minSize * 2) || (!vertical && zone.height < minSize * 2)) {
	                // No, this area can't be split either horizontal or vertical
	                return [zone];
	            }
	        }
	        var subZoneA, subZoneB;
	        // Randomly choose the size of the split
	        var splitSize = 0;
	        if (vertical) {
	            var maxSize = Math.ceil(zone.width - minSize);
	            splitSize = Math.floor(Math.random() * (maxSize - minSize)) + minSize;
	            subZoneA = { top: zone.top, left: zone.left, width: splitSize, height: zone.height };
	            subZoneB = { top: zone.top, left: zone.left + splitSize, width: zone.width - splitSize, height: zone.height };
	        }
	        else {
	            var maxSize = Math.ceil(zone.height - minSize);
	            splitSize = Math.floor(Math.random() * (maxSize - minSize)) + minSize;
	            subZoneA = { top: zone.top, left: zone.left, width: zone.width, height: splitSize };
	            subZoneB = { top: zone.top + splitSize, left: zone.left, width: zone.width, height: zone.height - splitSize };
	        }
	        var subZones = this.splitZone(subZoneA).concat(this.splitZone(subZoneB));
	        return subZones;
	    };
	    TileMap.prototype.shrinkZones = function () {
	        var padding = 2;
	        return this.zones.map(function (zone) {
	            var heightPad = zone.top == 1 ? padding : 0;
	            var widthPad = zone.left == 1 ? padding : 0;
	            return {
	                top: zone.top + heightPad,
	                left: zone.left + widthPad,
	                width: zone.width - padding - widthPad,
	                height: zone.height - padding - heightPad
	            };
	        });
	    };
	    TileMap.prototype.generateZoneTiles = function () {
	        this.zones.forEach(function (zone, index) {
	            // First, initialize the tiles array for each zone
	            zone.tiles = [];
	            for (var x = zone.left; x < zone.left + zone.width; x++) {
	                zone.tiles[x] = [];
	                for (var y = zone.top; y < zone.top + zone.height; y++) {
	                    zone.tiles[x][y] = "FF";
	                    zone.tiles[x][y] = y == zone.top || y == zone.top + zone.height - 1 ? "--" : zone.tiles[x][y];
	                    zone.tiles[x][y] = x == zone.left || x == zone.left + zone.width - 1 ? "||" : zone.tiles[x][y];
	                    zone.tiles[x][y] = x == zone.left && y == zone.top ? "TL" : zone.tiles[x][y];
	                    zone.tiles[x][y] = x == zone.left && y == zone.top + zone.height - 1 ? "BL" : zone.tiles[x][y];
	                    zone.tiles[x][y] = x == zone.left + zone.width - 1 && y == zone.top ? "TR" : zone.tiles[x][y];
	                    zone.tiles[x][y] = x == zone.left + zone.width - 1 && y == zone.top + zone.height - 1 ? "BR" : zone.tiles[x][y];
	                }
	            }
	        });
	    };
	    TileMap.prototype.generateTiles = function () {
	        var _this = this;
	        // This method just transfers the local zone tilemaps onto the master tilemap
	        this.zones.forEach(function (zone, index) {
	            for (var x = zone.left; x < zone.left + zone.width; x++) {
	                for (var y = zone.top; y < zone.top + zone.height; y++) {
	                    _this.tiles[x][y] = zone.tiles[x][y];
	                }
	            }
	        });
	        // We should have empty space along the borders of the tilemap, let's put walls there
	        for (var x = 0; x < this.width; x++) {
	            for (var y = 0; y < this.height; y++) {
	                this.tiles[x][y] = y == 0 || y == this.height - 1 ? "--" : this.tiles[x][y];
	                this.tiles[x][y] = x == 0 || x == this.width - 1 ? "||" : this.tiles[x][y];
	                this.tiles[x][y] = x == 0 && y == 0 ? "TL" : this.tiles[x][y];
	                this.tiles[x][y] = x == this.width - 1 && y == 0 ? "TR" : this.tiles[x][y];
	                this.tiles[x][y] = x == 0 && y == this.height - 1 ? "BL" : this.tiles[x][y];
	                this.tiles[x][y] = x == this.width - 1 && y == this.height - 1 ? "BR" : this.tiles[x][y];
	            }
	        }
	    };
	    TileMap.prototype.print = function () {
	        // Transfer all zones onto the main TileMap
	        this.generateTiles();
	        for (var y = 0; y < this.height; y++) {
	            var row = "";
	            for (var x = 0; x < this.width; x++) {
	                row += this.tiles[x][y];
	            }
	            console.log(row + " <-- row #" + y + " -- length: " + row.length);
	        }
	    };
	    TileMap.prototype.export = function () {
	        // Set certain tiles to be unpassable
	        var blockingTiles = [24, 25, 26, 32, 33, 40, 42];
	        var map = {};
	        for (var x = 0; x < this.width; x++) {
	            for (var y = 0; y < this.height; y++) {
	                var tile = this.getTile(x, y);
	                map[x + "x" + y] = {
	                    walkable: blockingTiles.indexOf(tile) == -1 ? true : false,
	                    background: tile,
	                    foreground: 55
	                };
	            }
	        }
	        return map;
	    };
	    TileMap.prototype.getTile = function (x, y) {
	        if (this.tiles[x][y] == "||" && this.tiles[x][y + 1] == "DD") {
	            return 33;
	        }
	        if (this.tiles[x - 1] !== undefined && this.tiles[x + 1] !== undefined && this.tiles[x - 1][y] == "--" && this.tiles[x + 1][y] == "--" && this.tiles[x][y] == "DD") {
	            return 11;
	        }
	        if (this.tiles[x][y] == "DD" && this.tiles[x][y - 1] == "||" && this.tiles[x][y + 1] == "||") {
	            return 13;
	        }
	        if (this.tiles[x - 1] !== undefined && this.tiles[x - 1][y - 1] == "TL") {
	            return 0;
	        }
	        if (this.tiles[x - 1] !== undefined && this.tiles[x - 1][y + 1] == "BL") {
	            return 16;
	        }
	        if (this.tiles[x + 1] !== undefined && this.tiles[x + 1][y + 1] == "BR") {
	            return 18;
	        }
	        if (this.tiles[x + 1] !== undefined && this.tiles[x + 1][y - 1] == "TR") {
	            return 2;
	        }
	        if (this.tiles[x - 1] !== undefined && (this.tiles[x - 1][y] == "||" || this.tiles[x - 1][y] == "TR" || this.tiles[x - 1][y] == "BR")) {
	            return 8;
	        }
	        if (this.tiles[x + 1] !== undefined && (this.tiles[x + 1][y] == "||" || this.tiles[x + 1][y] == "TL" || this.tiles[x + 1][y] == "BL")) {
	            return 10;
	        }
	        if (this.tiles[x][y + 1] == "--" || this.tiles[x][y + 1] == "TL" || this.tiles[x][y + 1] == "TR") {
	            return 17;
	        }
	        if (this.tiles[x][y - 1] == "--" || this.tiles[x][y - 1] == "BL" || this.tiles[x][y - 1] == "BR") {
	            return 1;
	        }
	        if (this.tiles[x][y] == "--") {
	            return 25;
	        }
	        if (this.tiles[x][y] == "||") {
	            return 32;
	        }
	        if (this.tiles[x][y] == "TL") {
	            return 24;
	        }
	        if (this.tiles[x][y] == "TR") {
	            return 26;
	        }
	        if (this.tiles[x][y] == "BL") {
	            return 40;
	        }
	        if (this.tiles[x][y] == "BR") {
	            return 42;
	        }
	        if (this.tiles[x][y] == "**") {
	            return 9;
	        }
	        return 9;
	    };
	    return TileMap;
	}());
	exports.TileMap = TileMap;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var MessageBoxContainer_1 = __webpack_require__(33);
	var DisplayContainer_1 = __webpack_require__(35);
	var StatusDisplayContainer_1 = __webpack_require__(37);
	var Roguelike = (function (_super) {
	    __extends(Roguelike, _super);
	    function Roguelike(props) {
	        _super.call(this, props);
	        // Pre-bind methods
	    }
	    Roguelike.prototype.render = function () {
	        return (React.createElement("div", {className: "roguelike"}, React.createElement("div", {className: "container"}, React.createElement("div", {className: "row"}, React.createElement("div", {className: "col-xs-12 col-sm-6"}, React.createElement(DisplayContainer_1.DisplayContainer, null)), React.createElement("div", {className: "col-xs-12 col-sm-6"}, React.createElement(StatusDisplayContainer_1.StatusDisplayContainer, null), React.createElement(MessageBoxContainer_1.MessageBoxContainer, null))))));
	    };
	    return Roguelike;
	}(React.Component));
	exports.Roguelike = Roguelike;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var react_redux_1 = __webpack_require__(19);
	var MessageBox_1 = __webpack_require__(34);
	var mapStateToProps = function (state) {
	    return {
	        messageList: state.messages.slice(-8)
	    };
	};
	exports.MessageBoxContainer = react_redux_1.connect(mapStateToProps)(MessageBox_1.MessageBox);


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(1);
	exports.MessageBox = function (props) {
	    var messageId = 0;
	    var messages = props.messageList.map(function (message) {
	        return (React.createElement("li", {key: messageId++}, message));
	    });
	    messages.reverse();
	    return (React.createElement("div", {id: "message-box"}, React.createElement("ul", {id: "messages"}, messages)));
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var actions_1 = __webpack_require__(29);
	var react_redux_1 = __webpack_require__(19);
	var Display_1 = __webpack_require__(36);
	var mapStateToProps = function (state) {
	    // We only need to pass the visible tiles to the display component
	    var visibleTiles = {};
	    var displayX = 0;
	    var displayY = 0;
	    for (var y = state.map.camera.y; y < state.map.camera.y + state.map.camera.height; y++) {
	        displayX = 0;
	        for (var x = state.map.camera.x; x < state.map.camera.x + state.map.camera.width; x++) {
	            visibleTiles[displayX + 'x' + displayY] = {
	                background: "tile-" + state.map.tiles[x + "x" + y].background,
	                foreground: "tile-" + state.map.tiles[x + "x" + y].foreground
	            };
	            if (state.map.tiles[x + "x" + y].hasOwnProperty('entity') && state.map.tiles[x + "x" + y].entity !== undefined) {
	                var entityNumber = state.map.tiles[x + "x" + y].entity;
	                visibleTiles[displayX + "x" + displayY].entity = "tile-" + state.entities[entityNumber].sprite;
	            }
	            if (state.map.tiles[x + "x" + y].hasOwnProperty('item') && state.map.tiles[x + "x" + y].item !== undefined) {
	                var itemNumber = state.map.tiles[x + "x" + y].item;
	                visibleTiles[displayX + "x" + displayY].item = "tile-" + state.items[itemNumber].sprite;
	            }
	            displayX++;
	        }
	        displayY++;
	    }
	    return {
	        tiles: visibleTiles,
	        rows: state.map.camera.height,
	        columns: state.map.camera.width
	    };
	};
	var mapDispatchToProps = function (dispatch) {
	    return {
	        moveUp: function () { dispatch(actions_1.moveUp()); },
	        moveDown: function () { dispatch(actions_1.moveDown()); },
	        moveLeft: function () { dispatch(actions_1.moveLeft()); },
	        moveRight: function () { dispatch(actions_1.moveRight()); }
	    };
	};
	// TODO "Display as any" should be correctly typed
	exports.DisplayContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Display_1.Display);


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var Display = (function (_super) {
	    __extends(Display, _super);
	    function Display(props) {
	        _super.call(this, props);
	        this.getRow = this.getRow.bind(this);
	        this.getCell = this.getCell.bind(this);
	        this.componentDidMount = this.componentDidMount.bind(this);
	        this.componentWillUnmount = this.componentWillUnmount.bind(this);
	        this.handleInput = this.handleInput.bind(this);
	        this.handleKeyDown = this.handleKeyDown.bind(this);
	        this.beginSwipe = this.beginSwipe.bind(this);
	        this.handleSwipe = this.handleSwipe.bind(this);
	        this.endSwipe = this.endSwipe.bind(this);
	        this.cancelSwipe = this.cancelSwipe.bind(this);
	        this.myTouchList = [];
	    }
	    Display.prototype.getCell = function (x, y) {
	        var tile = this.props.tiles[x + "x" + y];
	        var layers = [];
	        layers.push(React.createElement("div", {key: x + "-" + y + "-background", className: "tile background " + tile.background}));
	        if (tile.hasOwnProperty('item')) {
	            layers.push(React.createElement("div", {key: x + "-" + y + "-item", className: "tile item " + tile.item}));
	        }
	        if (tile.hasOwnProperty('entity')) {
	            layers.push(React.createElement("div", {key: x + "-" + y + "-entity", className: "tile entity " + tile.entity}));
	        }
	        layers.push(React.createElement("div", {key: x + "-" + y + "-foreground", className: "tile foreground " + tile.foreground}));
	        return (React.createElement("td", {key: x + "-" + y, className: "roguelike-tile"}, layers));
	    };
	    Display.prototype.getRow = function (y) {
	        var cells = [];
	        for (var x = 0; x < this.props.columns; x++) {
	            cells.push(this.getCell(x, y));
	        }
	        return (React.createElement("tr", {key: "row-" + y}, cells));
	    };
	    Display.prototype.render = function () {
	        var rows = [];
	        for (var i = 0; i < this.props.rows; i++) {
	            rows.push(this.getRow(i));
	        }
	        return (React.createElement("div", null, React.createElement("table", {id: "roguelike-display"}, React.createElement("tbody", null, rows)), React.createElement("p", {className: "text-center"}, React.createElement("small", null, "Use the arrow keys, or ", React.createElement("kbd", null, "A"), ", ", React.createElement("kbd", null, "S"), ", ", React.createElement("kbd", null, "D"), ", ", React.createElement("kbd", null, "W"), " to navigate with keyboard, or swipe to move on mobile."))));
	    };
	    Display.prototype.componentDidMount = function () {
	        window.addEventListener('keypress', this.handleInput);
	        window.addEventListener('keydown', this.handleKeyDown);
	        window.addEventListener('touchstart', this.beginSwipe);
	        window.addEventListener('touchmove', this.handleSwipe);
	        window.addEventListener('touchend', this.endSwipe);
	        window.addEventListener('touchcancel', this.cancelSwipe);
	    };
	    Display.prototype.componentWillUnmount = function () {
	        window.removeEventListener('keypress', this.handleInput);
	        window.removeEventListener('keydown', this.handleKeyDown);
	        window.removeEventListener('touchstart', this.beginSwipe);
	        window.removeEventListener('touchmove', this.handleSwipe);
	        window.removeEventListener('touchend', this.endSwipe);
	        window.removeEventListener('touchcancel', this.cancelSwipe);
	    };
	    Display.prototype.handleSwipe = function (e) {
	        var _loop_1 = function(i) {
	            this_1.myTouchList.forEach(function (touch) {
	                if (touch.id == e.changedTouches[i].identifier) {
	                    e.preventDefault();
	                }
	            });
	        };
	        var this_1 = this;
	        for (var i = 0; i < e.changedTouches.length; i++) {
	            _loop_1(i);
	        }
	    };
	    Display.prototype.beginSwipe = function (e) {
	        for (var i = 0; i < e.changedTouches.length; i++) {
	            this.myTouchList.push({
	                id: e.changedTouches[i].identifier,
	                x: e.changedTouches[i].pageX,
	                y: e.changedTouches[i].pageY
	            });
	        }
	    };
	    Display.prototype.endSwipe = function (e) {
	        var _this = this;
	        var _loop_2 = function(i) {
	            this_2.myTouchList.forEach(function (touch) {
	                if (touch.id == e.changedTouches[i].identifier) {
	                    var dx = Math.floor(e.changedTouches[i].pageX - touch.x);
	                    var dy = Math.floor(e.changedTouches[i].pageY - touch.y);
	                    if (Math.abs(dx) > Math.abs(dy)) {
	                        if (dx < 0) {
	                            _this.props.moveLeft();
	                        }
	                        else if (dx > 0) {
	                            _this.props.moveRight();
	                        }
	                    }
	                    else if (Math.abs(dy) > Math.abs(dx)) {
	                        if (dy < 0) {
	                            _this.props.moveUp();
	                        }
	                        else if (dy > 0) {
	                            _this.props.moveDown();
	                        }
	                    }
	                }
	            });
	            // Delete touch origin
	            this_2.myTouchList = this_2.myTouchList.filter(function (touch) { return touch.id !== e.changedTouches[i].identifier; });
	        };
	        var this_2 = this;
	        for (var i = 0; i < e.changedTouches.length; i++) {
	            _loop_2(i);
	        }
	    };
	    Display.prototype.cancelSwipe = function (e) {
	        var _loop_3 = function(i) {
	            this_3.myTouchList = this_3.myTouchList.filter(function (touch) { return touch.id !== e.changedTouches[i].identifier; });
	        };
	        var this_3 = this;
	        for (var i = 0; i < e.changedTouches.length; i++) {
	            _loop_3(i);
	        }
	    };
	    Display.prototype.handleKeyDown = function (e) {
	        switch (e.key) {
	            case 'ArrowUp':
	                this.props.moveUp();
	                break;
	            case 'ArrowDown':
	                this.props.moveDown();
	                break;
	            case 'ArrowLeft':
	                this.props.moveLeft();
	                break;
	            case 'ArrowRight':
	                this.props.moveRight();
	                break;
	            default:
	                break;
	        }
	    };
	    Display.prototype.handleInput = function (e) {
	        e.preventDefault();
	        switch (e.key) {
	            case 'a':
	                this.props.moveLeft();
	                break;
	            case 's':
	                this.props.moveDown();
	                break;
	            case 'd':
	                this.props.moveRight();
	                break;
	            case 'w':
	                this.props.moveUp();
	                break;
	            default:
	                break;
	        }
	    };
	    return Display;
	}(React.Component));
	exports.Display = Display;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var react_redux_1 = __webpack_require__(19);
	var StatusDisplay_1 = __webpack_require__(38);
	var actions_1 = __webpack_require__(29);
	var mapStateToProps = function (state) {
	    var hero = state.entities[state.hero];
	    // Check all adjacent cells for enemies. If found, show their stats
	    var heroX = parseInt(hero.location.split("x")[0]);
	    var heroY = parseInt(hero.location.split("x")[1]);
	    var enemies = [];
	    [[-1, 0], [0, -1], [0, 1], [1, 0]].map(function (delta) {
	        var dx = delta[0];
	        var dy = delta[1];
	        var direction = dx == 0 ? (dy == -1 ? "north" : "south") : (dx == -1 ? "west" : "east");
	        var address = (heroX + dx) + "x" + (heroY + dy);
	        if (state.map.tiles[address].entity !== undefined) {
	            enemies.push({
	                direction: direction,
	                enemy: state.entities[state.map.tiles[address].entity]
	            });
	        }
	    });
	    // Get the number of healing items that we have, and also the itemID of one of them.
	    // The status display will use that itemID to dispatch UseItem.
	    var healingCount = 0;
	    var healingItemID = 0;
	    state.entities[state.hero].inventory.forEach(function (itemIndex) {
	        if (state.items[itemIndex].name == "a bottle of medicine") {
	            healingCount++;
	            healingItemID = itemIndex;
	        }
	    });
	    return {
	        level: hero.level,
	        weapon: state.items[hero.weapon].name,
	        hp: hero.hp,
	        exp: hero.xp,
	        enemies: enemies,
	        medicines: healingCount,
	        medicineID: healingItemID
	    };
	};
	var mapDispatchToProps = function (dispatch) {
	    return {
	        useMedicine: function (item) { dispatch(actions_1.useItem(item)); }
	    };
	};
	exports.StatusDisplayContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(StatusDisplay_1.StatusDisplay);


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(1);
	exports.StatusDisplay = function (props) {
	    var enemies = React.createElement("div", null);
	    if (props.enemies !== undefined && props.enemies.length > 0) {
	        var enemyList = [];
	        for (var i = 0; i < props.enemies.length; i++) {
	            var levelDifference = props.level - props.enemies[i].enemy.level;
	            var levelDesc = "";
	            if (levelDifference == 0) {
	                levelDesc = " is about as strong as you are";
	            }
	            else if (levelDifference < 0 && levelDifference > -3) {
	                levelDesc = " is slightly stronger than you are";
	            }
	            else if (levelDifference <= -3 && levelDifference > -6) {
	                levelDesc = " is much stronger than you are";
	            }
	            else if (levelDifference <= -6) {
	                levelDesc = " would smash you like an insect";
	            }
	            else if (levelDifference > 0 && levelDifference < 3) {
	                levelDesc = " is slightly weaker than you are";
	            }
	            else if (levelDifference >= 3 && levelDifference < 6) {
	                levelDesc = " is much weaker than you are";
	            }
	            else if (levelDifference >= 6) {
	                levelDesc = " is an insect compared to you";
	            }
	            enemyList.push(React.createElement("p", {key: i}, "To your ", props.enemies[i].direction, ", ", props.enemies[i].enemy.name + levelDesc, ", and has ", props.enemies[i].enemy.hp, " health."));
	        }
	        enemies = enemyList;
	    }
	    var medicine = React.createElement("div", null);
	    if (props.medicines > 0) {
	        medicine = React.createElement("p", null, "You're carrying ", props.medicines, " bottles of medicine. ", React.createElement("a", {href: "#", onClick: function () { props.useMedicine(props.medicineID); }}, "(use medicine)"));
	    }
	    return (React.createElement("div", {id: "status-box", className: "text-center"}, React.createElement("p", null, "You are level ", props.level, ". (", props.exp, " / ", props.level * 30, " exp to next level)"), React.createElement("p", null, "You have ", props.hp, " out of 100 health."), React.createElement("p", null, "You're using ", props.weapon, "."), medicine, enemies));
	};


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map