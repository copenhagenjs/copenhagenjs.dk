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
    $.getScript(oEmbedEndpoint + '?url=' + url + '&width=600&height=334&callback=' + oEmbedCallback);
  }

  function setupGallery(videos) {

    // Load the first video
    getVideo(videos[0].url);

    // Add the videos to the gallery
    for (var i = 0; i < videos.length; i++) {
      var html = '<li><a href="' + videos[i].url + '"><img src="' + videos[i].thumbnail_medium + '" class="thumb" />';
      html += '<p>' + videos[i].title + '</p></a></li>';
      $('.videos .thumbs ul').append(html);
    }

    // Switch to the video when a thumbnail is clicked
    $('.videos .thumbs a').click(function(event) {
      event.preventDefault();
      getVideo(this.href);
      return false;
    });

  }

  function switchVideo(video) {
    $('.videos .embed').html(unescape(video.html));
  }
