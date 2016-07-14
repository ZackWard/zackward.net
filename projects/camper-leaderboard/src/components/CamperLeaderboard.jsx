var CamperLeaderboard = React.createClass({

    render: function () {
        
        let camperListings = this.state.data.map(function (camper, position) {
            return (
                <CamperListing key={position} position={position + 1} camper={camper}></CamperListing>
            );
        });

        return (
            <div id="camper-leaderboard" className="container">
                <div className="row">
                    <div className="col-xs-12 text-center">
                        <h1>FreeCodeCamp Leaderboard</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Camper</th>
                                    <th><a href="#" onClick={this.showRecent}>Recent Points</a></th>
                                    <th><a href="#" onClick={this.showAlltime}>All Time Points</a></th>
                                </tr>
                            </thead>
                            <tbody>
                                {camperListings}
                            </tbody>
                        </table>
                        <CamperLoading loaded={this.state.loaded}></CamperLoading>
                    </div>
                </div>
            </div>
        );
    },

    getInitialState: function () {
        return {
            data: [],
            allCampers: [],
            loaded: false
        };
    },

    getCamperList: function (list) {
        return $.ajax({
             url: "https://fcctop100.herokuapp.com/api/fccusers/top/" + list,
             dataType: 'json'
         });
    },

    getUniqueCampers: function (recent, alltime) {

        let camperList = alltime.concat(recent);

        let compareFunc = function (a, b) {
            return a.username.localeCompare(b.username);
        };
        camperList.sort(compareFunc);

        // Remove any duplicate entries for campers
        for (let i = 1; i < camperList.length; ) {
            if (compareFunc(camperList[i], camperList[i-1]) === 0) {
                camperList.splice(i, 1);
            } else {
                i++;
            }
        }

        return camperList;
    },

    sortCampers: function (campers, field) {
        // Sort in descending order
        // field should be either 'recent' or 'alltime'
        campers.sort(function(a, b) {
            return b[field] - a[field];
        });
        // Return the top 100 campers
        return campers.slice(0, 100);
    },

    showRecent: function (e) {
        e.preventDefault();
        this.setState({
            data: this.sortCampers(this.state.allCampers, 'recent'),
            allCampers: this.state.allCampers
        });
    },

    showAlltime: function (e) {
        e.preventDefault();
        this.setState({
            data: this.sortCampers(this.state.allCampers, 'alltime'),
            allCampers: this.state.allCampers
        });
    },

    updateCamperList: function () {
        $.when(this.getCamperList('recent'), this.getCamperList('alltime')).done(function (recent, alltime) {
            // Throw error if either call failed
            if (recent[1] !== 'success' || alltime[1] !== 'success') {
                console.log("Error! There was a problem with one of the ajax requests");
                return false;
            }

            // Merge the recent list and the all-time list
            let allCampers = this.getUniqueCampers(recent[0], alltime[0]);

            this.setState({
                data: this.sortCampers(allCampers, 'recent'),
                allCampers: allCampers,
                loaded: true
            });
        }.bind(this));
    },

    componentDidMount: function () {
        this.updateCamperList();
    }
});

ReactDOM.render(
    <CamperLeaderboard />,
    document.getElementById('app')
);