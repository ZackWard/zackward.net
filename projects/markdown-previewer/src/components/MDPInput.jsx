var MDPInput = React.createClass({
    render: function () {
        return (
            <div id="markdown-previewer-input">
                <textarea onChange={this.handleInputChange} rows="10" cols="80" value={this.props.data}></textarea>
            </div>
        );
    },

    handleInputChange(e) {
        this.props.updateText(e.target.value);
    }
});