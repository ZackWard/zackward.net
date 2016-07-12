var MDPApp = React.createClass({
    render: function () {
        return (
            <div id="markdown-previewer-app">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6">
                            <MDPInput data={this.state.data} updateText={this.updateText}></MDPInput>
                            <p className="text-center"><small>Built by <a href="http://www.zackward.net">Zack Ward</a>. Hosted on <a href="https://github.com/ZackWard/zackward.github.io/tree/master/projects/markdown-previewer"><i className="fa fa-github"></i> GitHub</a>.</small></p>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <hr className="visible-xs-block" />
                            <MDPDisplay data={this.state.data}></MDPDisplay>
                        </div>
                    </div>
                </div>
            </div>
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

ReactDOM.render(
  <MDPApp />,
  document.getElementById('app')
);

// Set up autosize here
autosize($('textarea'));