var apiEndpoint = 'http://vimeo.com/api/v2/';
var oEmbedEndpoint = 'http://vimeo.com/api/oembed.json';
var oEmbedCallback = 'switchVideo';
var videosCallback = 'setupGallery';
var vimeoUsername = 'copenhagenjs';

// Get the user's videos
$(document).ready(function() {
  $.getScript(apiEndpoint + vimeoUsername + '/videos.json?callback=' + videosCallback);
});

function getVideo(url) {
  $.getScript(oEmbedEndpoint + '?url=' + url + '&width=800&height=400&callback=' + oEmbedCallback);
}

function setupGallery(videos) {

  // Array for filling in months
  var months = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  // Add the videos to the gallery
  for (var i = 0; i < 9; i++) {
    var uploadYear = videos[i].upload_date.slice(0, 4);
    var uploadMonth = parseInt(videos[i].upload_date.slice(5, 7), 10);

    var html = '<li><div class="inner"><a href="' + videos[i].url + '" target="_blank"><img src="' + videos[i].thumbnail_large + '" class="thumb" />';
    html += '<h5>' + videos[i].title + '</h5></a>';
    html += '<p class="metadata">Uploaded ' + months[uploadMonth] + ', ' + uploadYear + '<br />';
    html += '</div></li>';

    $('.videos .thumbs ul').append(html);
  }

}


