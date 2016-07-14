"use strict";

var CamperLoading = React.createClass({
    displayName: "CamperLoading",

    render: function render() {
        if (this.props.loaded) {
            return null;
        } else {
            return React.createElement(
                "div",
                { className: "loader" },
                React.createElement(
                    "p",
                    null,
                    "Loading"
                )
            );
        }
    }
});
"use strict";

var CamperListing = React.createClass({
    displayName: "CamperListing",

    render: function render() {
        return React.createElement(
            "tr",
            { className: "camperListing" },
            React.createElement(
                "td",
                null,
                this.props.position
            ),
            React.createElement(
                "td",
                null,
                React.createElement(
                    "a",
                    { href: "http://www.freecodecamp.com/" + this.props.camper.username, target: "_blank" },
                    React.createElement("img", { src: this.props.camper.img }),
                    this.props.camper.username
                )
            ),
            React.createElement(
                "td",
                null,
                this.props.camper.recent
            ),
            React.createElement(
                "td",
                null,
                this.props.camper.alltime
            )
        );
    }
});
"use strict";

var CamperLeaderboard = React.createClass({
    displayName: "CamperLeaderboard",


    render: function render() {

        var camperListings = this.state.data.map(function (camper, position) {
            return React.createElement(CamperListing, { key: position, position: position + 1, camper: camper });
        });

        return React.createElement(
            "div",
            { id: "camper-leaderboard", className: "container" },
            React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "col-xs-12 text-center" },
                    React.createElement(
                        "h1",
                        null,
                        "FreeCodeCamp Leaderboard"
                    ),
                    React.createElement(
                        "p",
                        null,
                        React.createElement(
                            "small",
                            null,
                            "Built with ",
                            React.createElement("i", { className: "fa fa-heart" }),
                            " by ",
                            React.createElement(
                                "a",
                                { href: "http://www.zackward.net" },
                                "Zack Ward"
                            ),
                            ". Hosted on ",
                            React.createElement(
                                "a",
                                { target: "_blank", href: "https://github.com/ZackWard/zackward.github.io/tree/master/projects/camper-leaderboard" },
                                React.createElement("i", { className: "fa fa-github" }),
                                " GitHub"
                            )
                        )
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "col-xs-12" },
                    React.createElement(
                        "table",
                        { className: "table table-hover" },
                        React.createElement(
                            "thead",
                            null,
                            React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "th",
                                    null,
                                    "#"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "Camper"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    React.createElement(
                                        "a",
                                        { href: "#", onClick: this.showRecent },
                                        "Recent Points"
                                    )
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    React.createElement(
                                        "a",
                                        { href: "#", onClick: this.showAlltime },
                                        "All Time Points"
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            "tbody",
                            null,
                            camperListings
                        )
                    ),
                    React.createElement(CamperLoading, { loaded: this.state.loaded })
                )
            )
        );
    },

    getInitialState: function getInitialState() {
        return {
            data: [],
            allCampers: [],
            loaded: false
        };
    },

    getCamperList: function getCamperList(list) {
        return $.ajax({
            url: "https://fcctop100.herokuapp.com/api/fccusers/top/" + list,
            dataType: 'json'
        });
    },

    getUniqueCampers: function getUniqueCampers(recent, alltime) {

        var camperList = alltime.concat(recent);

        var compareFunc = function compareFunc(a, b) {
            return a.username.localeCompare(b.username);
        };
        camperList.sort(compareFunc);

        // Remove any duplicate entries for campers
        for (var i = 1; i < camperList.length;) {
            if (compareFunc(camperList[i], camperList[i - 1]) === 0) {
                camperList.splice(i, 1);
            } else {
                i++;
            }
        }

        return camperList;
    },

    sortCampers: function sortCampers(campers, field) {
        // Sort in descending order
        // field should be either 'recent' or 'alltime'
        campers.sort(function (a, b) {
            return b[field] - a[field];
        });
        // Return the top 100 campers
        return campers.slice(0, 100);
    },

    showRecent: function showRecent(e) {
        e.preventDefault();
        this.setState({
            data: this.sortCampers(this.state.allCampers, 'recent'),
            allCampers: this.state.allCampers
        });
    },

    showAlltime: function showAlltime(e) {
        e.preventDefault();
        this.setState({
            data: this.sortCampers(this.state.allCampers, 'alltime'),
            allCampers: this.state.allCampers
        });
    },

    updateCamperList: function updateCamperList() {
        $.when(this.getCamperList('recent'), this.getCamperList('alltime')).done(function (recent, alltime) {
            // Throw error if either call failed
            if (recent[1] !== 'success' || alltime[1] !== 'success') {
                console.log("Error! There was a problem with one of the ajax requests");
                return false;
            }

            // Merge the recent list and the all-time list
            var allCampers = this.getUniqueCampers(recent[0], alltime[0]);

            this.setState({
                data: this.sortCampers(allCampers, 'recent'),
                allCampers: allCampers,
                loaded: true
            });
        }.bind(this));
    },

    componentDidMount: function componentDidMount() {
        this.updateCamperList();
    }
});

ReactDOM.render(React.createElement(CamperLeaderboard, null), document.getElementById('app'));