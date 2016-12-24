var endpoint = "https://api.twitch.tv/kraken";
var apiData = {
  api_version: "3",
  client_id: "uvxppdwqo8gw9riygsplcw55eonjb6"
};

var checkProgress = function(collection, streamer) {
  streamer.complete++;
  if (streamer.complete == 2) {
    // Add streamer, all API calls are complete
    collection.streamers.push(streamer);
    if (collection.streamers.length == collection.names.length) {
      // All API calls are complete, update DOM
      updatePage(collection.streamers);
    }
  }
};

var getChannelInfo = function(collection, streamer) {
  $.ajax({
    url: endpoint + "/channels/" + streamer.name,
    data: apiData,
    headers: {
      'Client-ID': apiData.client_id
    },
    dataType: "jsonp",
    success: function(result) {

      // First, check to make sure that this streamer exists
      if (result.status == 404) {
        streamer.username = streamer.name;
        streamer.exists = false;
      } else {
        streamer.username = result.display_name;
      }

      // Attach results to streamer here
      streamer.url = "//www.twitch.tv/" + streamer.username;
      streamer.views = result.views;
      streamer.followers = result.followers;

      // Check for a logo, use the default if no logo is set
      if (result.logo == null) {
        streamer.logo = "https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_150x150.png";
      } else {
        streamer.logo = result.logo;
      }

      // Check for a profile banner, use the default if no banner is set
      if (result.profile_banner == null) {
        streamer.banner = "https://web-cdn.ttvnw.net/images/xarth/bg_glitch_pattern.png";
      } else {
        streamer.banner = result.profile_banner;
      }

      checkProgress(collection, streamer);
    }
  });
};

var getStreamInfo = function(collection, streamer) {
  $.ajax({
    url: endpoint + "/streams/" + streamer.name,
    data: apiData,
    headers: {
      'Client-ID': apiData.client_id
    },
    dataType: "jsonp",
    success: function(result) {

      if (result.stream == null) {
        // The streamer is offline, set values accordingly
        streamer.game = null;
        streamer.currentViewers = null;
        streamer.preview = null;
      } else {
        // The streamer is online! Yes! Get some info.
        streamer.game = result.stream.game;
        streamer.currentViewers = result.stream.viewers;
        streamer.preview = result.stream.preview.medium;
      }
      streamer.stream = result;
      checkProgress(collection, streamer);
    }
  });
};

var getBanner = function(streamer) {
  var banner = $('<div class="banner"></div>');
  banner.css({
    "background": "url(" + streamer.banner + ")"
  });
  if (streamer.banner != "https://web-cdn.ttvnw.net/images/xarth/bg_glitch_pattern.png") {
    banner.css({
      "background-size": "cover"
    });
  }
  return banner;
};

var getInfo = function(streamer) {
  var info = $('<div class="description"></div>');
  info.append('<img class="avatar" src="' + streamer.logo + '">');
  if (streamer.exists == false) {
    info.append('<h2><s>' + streamer.username + '</s></h2>');
  } else {
    info.append('<h2><a href="' + streamer.url + '" target="_blank">' + streamer.username + '</a></h2>');
  }

  return info;
};

var getStatus = function(streamer) {
  var status = $('<div class="status"></div>');
  if (streamer.exists == false) {
    status = status.append('<div class="panel panel-danger"><div class="panel-heading"><h4>Oops! User ' + streamer.username + ' does not exist.</h4></div></div>');
  } else if (streamer.game == null) {
    status = status.append('<div class="panel panel-warning"><div class="panel-heading"><h4>' + streamer.username + ' is currently offline.</h4></div></div>');
  } else {
    status = status.append('<div class="panel-primary"><div class="panel-heading"><h4>' + streamer.currentViewers + ' currently watching ' + streamer.username + ' stream ' + streamer.game + '!</h4><img class="preview" src="' + streamer.preview + '"></div></div>');
  }

  return status;
};

var updatePage = function(streamers) {
  // At this point, we have all of the information that we need to build the page
  // First we'll build an array of cards for the streamers
  var cards = streamers.map(function(streamer) {
    if (streamer.game == null || streamer.exists == false) {
      var statusClass = "status-offline";
    } else {
      var statusClass = "status-online";
    }

    var column = $('<div class="col-xs-12 col-md-6 ' + statusClass + '"></div>');
    var card = $('<div class="streamer-card"></div>');
    var banner = getBanner(streamer);
    var info = getInfo(streamer);
    var status = getStatus(streamer);

    // For now, we'll just add the cards right to the results area
    card.append(banner);
    card.append(info);
    card.append(status);
    column.append(card);
    $('#results').append(column);

  });
};

var getTwitchData = function(collection) {

  collection.names.map(function(name) {
    var streamer = {
      name: name,
      complete: 0
    };
    getChannelInfo(collection, streamer);
    getStreamInfo(collection, streamer);
  });
}

$(document).ready(function() {
  // For now we will attach our API call to a button so that we don't repeatedly call api on reload
  var streamerCollection = {
    names: ["Circon", "RukhSolette", "freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "brunofin", "comster404"],
    streamers: []
  };
  getTwitchData(streamerCollection);

  // Set up the event handler for our filter buttons
  $('#filterAll').on('click', function(e) {
    e.preventDefault();
    $('.hidden').removeClass('hidden');
  });
  $('#filterOnline').on('click', function(e) {
    e.preventDefault();
    $('.status-online').removeClass('hidden');
    $('.status-offline').addClass('hidden');
  });
  $('#filterOffline').on('click', function(e) {
    e.preventDefault();
    $('.status-offline').removeClass('hidden');
    $('.status-online').addClass('hidden');
  });
});