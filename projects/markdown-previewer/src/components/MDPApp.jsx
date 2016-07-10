var MDPApp = React.createClass({
    render: function () {
        return (
            <div id="markdown-previewer-app">
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

    componentDidMount: function() {
        $.ajax({
            url: "https://dl.dropboxusercontent.com/u/13022985/example.md",
            dataType: 'text',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
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

ReactDOM.render(
  <MDPApp />,
  document.getElementById('app')
);