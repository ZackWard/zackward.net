var CamperLoading = React.createClass({
    render: function () {
        if (this.props.loaded) {
            return null;
        } else {
            return (
                <div className="loader">
                    <p>Loading</p>
                </div>
            );
        }
    }
});