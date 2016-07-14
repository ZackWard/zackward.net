var CamperListing = React.createClass({
    render: function () {
        return (
            <tr className="camperListing">
                <td>{this.props.position}</td>
                <td>
                    <a href={"http://www.freecodecamp.com/" + this.props.camper.username} target="_blank">
                        <img src={this.props.camper.img} />
                        {this.props.camper.username}
                    </a>
                </td>
                <td>{this.props.camper.recent}</td>
                <td>{this.props.camper.alltime}</td>
            </tr>
        );
    }
});