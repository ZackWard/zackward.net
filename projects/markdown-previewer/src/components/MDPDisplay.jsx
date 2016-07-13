var renderer = new marked.Renderer();
renderer.table = function (header, body) {
    return '<table class="table">\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

var MDPDisplay = React.createClass({
    render: function () {
        return (
            <div id="markdown-previewer-display">
                <div dangerouslySetInnerHTML={this.translateMD()}></div>
            </div>
        );
    },

    translateMD: function () {
        var translatedMD = marked(this.props.data, {renderer: renderer});
        return {
            __html: translatedMD
        };
    }
});