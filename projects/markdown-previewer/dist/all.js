var MDPDisplay = React.createClass({
    displayName: "MDPDisplay",

    render: function () {
        return React.createElement(
            "div",
            { id: "markdown-previewer-display" },
            React.createElement("div", { dangerouslySetInnerHTML: this.translateMD() })
        );
    },

    translateMD: function () {
        let translatedMD = marked(this.props.data);
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
            React.createElement("textarea", { onChange: this.handleInputChange, rows: "10", cols: "80", value: this.props.data })
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
                "h1",
                null,
                "Markdown Previewer"
            ),
            React.createElement(MDPInput, { data: this.state.data, updateText: this.updateText }),
            React.createElement(MDPDisplay, { data: this.state.data })
        );
    },

    getInitialState: function () {
        return {
            data: "This is a test"
        };
    },

    componentDidMount: function () {
        $.ajax({
            url: "https://dl.dropboxusercontent.com/u/13022985/example.md",
            dataType: 'text',
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    updateText: function (newText) {
        this.setState({
            data: newText
        });
    }
});

ReactDOM.render(React.createElement(MDPApp, null), document.getElementById('app'));