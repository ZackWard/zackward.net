var MDPInput = React.createClass({
    render: function () {
        return (
            <div id="markdown-previewer-input">
                <textarea onChange={this.handleInputChange} value={this.props.data}></textarea>
            </div>
        );
    },

    handleInputChange(e) {
        this.props.updateText(e.target.value);
    }
});