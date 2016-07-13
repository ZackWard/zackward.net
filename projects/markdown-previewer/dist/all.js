/*!
	Autosize 3.0.15
	license: MIT
	http://www.jacklmoore.com/autosize
*/
!function (e, t) {
	if ("function" == typeof define && define.amd) define(["exports", "module"], t);else if ("undefined" != typeof exports && "undefined" != typeof module) t(exports, module);else {
		var n = { exports: {} };t(n.exports, n), e.autosize = n.exports;
	}
}(this, function (e, t) {
	"use strict";
	function n(e) {
		function t() {
			var t = window.getComputedStyle(e, null);p = t.overflowY, "vertical" === t.resize ? e.style.resize = "none" : "both" === t.resize && (e.style.resize = "horizontal"), c = "content-box" === t.boxSizing ? -(parseFloat(t.paddingTop) + parseFloat(t.paddingBottom)) : parseFloat(t.borderTopWidth) + parseFloat(t.borderBottomWidth), isNaN(c) && (c = 0), i();
		}function n(t) {
			var n = e.style.width;e.style.width = "0px", e.offsetWidth, e.style.width = n, p = t, f && (e.style.overflowY = t), o();
		}function o() {
			var t = window.pageYOffset,
			    n = document.body.scrollTop,
			    o = e.style.height;e.style.height = "auto";var i = e.scrollHeight + c;return 0 === e.scrollHeight ? void (e.style.height = o) : (e.style.height = i + "px", v = e.clientWidth, document.documentElement.scrollTop = t, void (document.body.scrollTop = n));
		}function i() {
			var t = e.style.height;o();var i = window.getComputedStyle(e, null);if (i.height !== e.style.height ? "visible" !== p && n("visible") : "hidden" !== p && n("hidden"), t !== e.style.height) {
				var r = d("autosize:resized");e.dispatchEvent(r);
			}
		}var s = void 0 === arguments[1] ? {} : arguments[1],
		    a = s.setOverflowX,
		    l = void 0 === a ? !0 : a,
		    u = s.setOverflowY,
		    f = void 0 === u ? !0 : u;if (e && e.nodeName && "TEXTAREA" === e.nodeName && !r.has(e)) {
			var c = null,
			    p = null,
			    v = e.clientWidth,
			    h = function () {
				e.clientWidth !== v && i();
			},
			    y = function (t) {
				window.removeEventListener("resize", h, !1), e.removeEventListener("input", i, !1), e.removeEventListener("keyup", i, !1), e.removeEventListener("autosize:destroy", y, !1), e.removeEventListener("autosize:update", i, !1), r["delete"](e), Object.keys(t).forEach(function (n) {
					e.style[n] = t[n];
				});
			}.bind(e, { height: e.style.height, resize: e.style.resize, overflowY: e.style.overflowY, overflowX: e.style.overflowX, wordWrap: e.style.wordWrap });e.addEventListener("autosize:destroy", y, !1), "onpropertychange" in e && "oninput" in e && e.addEventListener("keyup", i, !1), window.addEventListener("resize", h, !1), e.addEventListener("input", i, !1), e.addEventListener("autosize:update", i, !1), r.add(e), l && (e.style.overflowX = "hidden", e.style.wordWrap = "break-word"), t();
		}
	}function o(e) {
		if (e && e.nodeName && "TEXTAREA" === e.nodeName) {
			var t = d("autosize:destroy");e.dispatchEvent(t);
		}
	}function i(e) {
		if (e && e.nodeName && "TEXTAREA" === e.nodeName) {
			var t = d("autosize:update");e.dispatchEvent(t);
		}
	}var r = "function" == typeof Set ? new Set() : function () {
		var e = [];return { has: function (t) {
				return Boolean(e.indexOf(t) > -1);
			}, add: function (t) {
				e.push(t);
			}, "delete": function (t) {
				e.splice(e.indexOf(t), 1);
			} };
	}(),
	    d = function (e) {
		return new Event(e);
	};try {
		new Event("test");
	} catch (s) {
		d = function (e) {
			var t = document.createEvent("Event");return t.initEvent(e, !0, !1), t;
		};
	}var a = null;"undefined" == typeof window || "function" != typeof window.getComputedStyle ? (a = function (e) {
		return e;
	}, a.destroy = function (e) {
		return e;
	}, a.update = function (e) {
		return e;
	}) : (a = function (e, t) {
		return e && Array.prototype.forEach.call(e.length ? e : [e], function (e) {
			return n(e, t);
		}), e;
	}, a.destroy = function (e) {
		return e && Array.prototype.forEach.call(e.length ? e : [e], o), e;
	}, a.update = function (e) {
		return e && Array.prototype.forEach.call(e.length ? e : [e], i), e;
	}), t.exports = a;
});
var renderer = new marked.Renderer();
renderer.table = function (header, body) {
    return '<table class="table">\n' + '<thead>\n' + header + '</thead>\n' + '<tbody>\n' + body + '</tbody>\n' + '</table>\n';
};

var MDPDisplay = React.createClass({
    displayName: 'MDPDisplay',

    render: function () {
        return React.createElement(
            'div',
            { id: 'markdown-previewer-display' },
            React.createElement('div', { dangerouslySetInnerHTML: this.translateMD() })
        );
    },

    translateMD: function () {
        var translatedMD = marked(this.props.data, { renderer: renderer });
        return {
            __html: translatedMD
        };
    }
});
var MDPInput = React.createClass({
    displayName: "MDPInput",

    render: function () {
        return React.createElement(
            "div",
            { id: "markdown-previewer-input" },
            React.createElement("textarea", { onChange: this.handleInputChange, value: this.props.data })
        );
    },

    handleInputChange(e) {
        this.props.updateText(e.target.value);
    }
});
var MDPApp = React.createClass({
    displayName: "MDPApp",

    render: function () {
        return React.createElement(
            "div",
            { id: "markdown-previewer-app" },
            React.createElement(
                "div",
                { className: "container-fluid" },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-6" },
                        React.createElement(MDPInput, { data: this.state.data, updateText: this.updateText }),
                        React.createElement(
                            "p",
                            { className: "text-center" },
                            React.createElement(
                                "small",
                                null,
                                "Built by ",
                                React.createElement(
                                    "a",
                                    { href: "http://www.zackward.net" },
                                    "Zack Ward"
                                ),
                                ". Hosted on ",
                                React.createElement(
                                    "a",
                                    { href: "https://github.com/ZackWard/zackward.github.io/tree/master/projects/markdown-previewer" },
                                    React.createElement("i", { className: "fa fa-github" }),
                                    " GitHub"
                                ),
                                "."
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-6" },
                        React.createElement("hr", { className: "visible-xs-block" }),
                        React.createElement(MDPDisplay, { data: this.state.data })
                    )
                )
            )
        );
    },

    getInitialState: function () {
        return {
            data: "Enter **markdown** here."
        };
    },

    updateText: function (newText) {
        this.setState({
            data: newText
        });
    }
});

ReactDOM.render(React.createElement(MDPApp, null), document.getElementById('app'));

// Set up autosize here
autosize($('textarea'));