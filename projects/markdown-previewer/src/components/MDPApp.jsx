var MDPApp = React.createClass({
    render: function () {
        return (
            <div className="markdown-previewer-app">
                <h1>Markdown Previewer</h1>
                <MDPInput data={this.state.data} updateText={this.updateText}></MDPInput>
                <MDPDisplay data={this.state.data}></MDPDisplay>
            </div>
        );
    },

    getInitialState: function () {
        return {
            data: "This is a test"
        };
    },

    updateText: function (newText) {
        this.setState({
            data: newText
        });
    }
});

ReactDOM.render(
  <MDPApp />,
  document.getElementById('app')
);