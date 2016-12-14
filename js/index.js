(function init() {
  var daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  var hours = {
    'Monday': {
      'name': 'Monday',
      'open': '7:30 am',
      'close': '10:30 pm'
    },
    'Tuesday': {
      'name': 'Tuesday',
      'open': '7:30 am',
      'close': '10:30 pm'
    },
    'Wednesday': {
      'name': 'Wednesday',
      'open': '7:30 am',
      'close': '10:30 pm'
    },
    'Thursday': {
      'name': 'Thursday',
      'open': '7:30 am',
      'close': '10:30 pm'
    },
    'Friday': {
      'name': 'Friday',
      'open': '7:30 am',
      'close': '9:00 pm'
    },
    'Saturday': {
      'name': 'Saturday',
      'open': '11:30 am',
      'close': '9:00 pm'
    },
    'Sunday': {
      'name': 'Sunday',
      'open': '11:30 am',
      'close': '9:00 pm'
    },
  };

  function generateDays() {
    var counter = 1;
    do {
      var day = hours[daysOfWeek[counter]];
      var template = '' +
        '<tr id="' + day.name + '">' +
          '<td>' + day.name + '</td>' +
          '<td>' + day.open + ' -' + (day.name === 'Friday' ? '&nbsp; ' : ' ') + day.close + '</td>' +
        '</tr>';

      $('#hours').append(template);

      counter = (counter + 1) % 7;
    } while(counter !== 1);
  }

  function highlightDay() {
    $('#' + daysOfWeek[moment().day()]).addClass('highlight');
  }

  function showStatus() {
    var todaysHours = hours[daysOfWeek[moment().day()]];
    var status = $('#status');

    if (moment().isBetween(moment(todaysHours.open, 'HH:mm a'), moment(todaysHours.close, 'HH:mm a'))) {
      status.html('Open!').removeClass('closed').addClass('open');
    } else {
      status.html('Closed!').removeClass('open').addClass('closed');
    }
  }

  generateDays();
  highlightDay();
  showStatus();
})();

(function(global){
  // Image Height & Width
  var imageHeight = 1080;
  var imageWidth = 1920;

  // If the Image Doesn't Take Up the Full Frame
  var innerImageWidth = 1920;
  var imageLetterBoxWidth = imageWidth - innerImageWidth;

  // Aspect Ratio
  var imageApspectRatio = imageWidth / imageHeight;
  var innerImageApspectRatio = innerImageWidth / imageHeight;

  var documentEl = document.documentElement;

  var image = document.getElementById('image');

  // Resize the Image
  function resizeImage(){
    var width, height, scale;
    var windowWidth = documentEl.clientWidth;
    var windowHeight = documentEl.clientHeight;
    var windowAspectRatio = windowWidth / windowHeight;

    // Mobile Phone Screen Shaped
    if (windowAspectRatio < innerImageApspectRatio) {
        scale = windowWidth / innerImageWidth;
        height = windowHeight;
        width = height * imageApspectRatio;
    }
    // Normal Screen Shaped
    else {
        scale = windowWidth / innerImageWidth;
        width = windowWidth + (imageLetterBoxWidth * scale);
        height = width / imageApspectRatio;
    }

    image.style.width = width + 'px';
    image.style.height = height + 'px';
  }

  function onWindowResize() {
    resizeImage();
  }

  global.addEventListener('resize', onWindowResize);

  resizeImage();
})(window);
