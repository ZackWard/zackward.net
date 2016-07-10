var MDPDisplay = React.createClass({
    render: function () {
        return (
            <div id="markdown-previewer-display">
                <div dangerouslySetInnerHTML={this.translateMD()}></div>
            </div>
        );
    },

    translateMD: function () {
        let translatedMD = marked(this.props.data);
        return {
            __html: translatedMD
        };
    }
});