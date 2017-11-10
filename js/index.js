(function init() {
  var END_OF_SPRING_SEMESTER = '5-23';
  var START_OF_FALL_SEMESTER = '8-28';

  var daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  /**
   * Format:
   *  {
   *    'Monday': {
   *      'name': {String} // Display Name
   *      'open': {String} // 'hh:mm am/pm' or ''
   *      'close': {String} // 'hh:mm am/pm' or ''
   *      'customTemplate': {String} // HTML tag to override default section in template
   *    },
   *    ...
   *  }
   */
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
      'close': '9:00 pm',
      'customTemplate': '<td>7:30 am - &nbsp; 9:00 pm</td>'
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
    }
  };

  var summerHours = {
    'Monday': {
      'name': 'Monday',
      'open': '8:30 am',
      'close': '5:00 pm'
    },
    'Tuesday': {
      'name': 'Tuesday',
      'open': '8:30 am',
      'close': '5:00 pm'
    },
    'Wednesday': {
      'name': 'Wednesday',
      'open': '8:30 am',
      'close': '5:00 pm'
    },
    'Thursday': {
      'name': 'Thursday',
      'open': '8:30 am',
      'close': '5:00 pm'
    },
    'Friday': {
      'name': 'Friday',
      'open': '8:30 am',
      'close': '1:00 pm'
    },
    'Saturday': {
      'name': 'Saturday',
      'open': '',
      'close': ''
    },
    'Sunday': {
      'name': 'Sunday',
      'open': '',
      'close': ''
    }
  };

  var STORAGE_AVAILABLE = localStorageAvailable();

  function localStorageAvailable() {
    try {
      var val = '__storage_test__';
      localStorage.setItem(val, val);
      localStorage.removeItem(val);
      return true;
    } catch(e) {
      return false;
    }
  }

  function isSummer() {
    return moment().isBetween(
      moment(END_OF_SPRING_SEMESTER, 'MM-DD'),
      moment(START_OF_FALL_SEMESTER, 'MM-DD'),
      'day', // Comparing the day
      '()' // Not Inclusive
    );
  }

  function generateDays(hoursObj) {
    var counter = 1;
    do {
      var day = hoursObj[daysOfWeek[counter]];
      var template = '' +
        '<tr id="' + day.name + '">' +
          '<td>' + day.name + '</td>' +
          (day.open && day.close
            ? (day.customTemplate ? day.customTemplate : '<td>' + day.open + ' - ' + day.close + '</td>')
            : '<td>Closed</td>'
          ) +
        '</tr>';

      $('#hours').append(template);

      counter = (counter + 1) % 7;
    } while(counter !== 1);
  }

  function highlightDay() {
    $('#' + daysOfWeek[moment().day()]).addClass('highlight');
  }

  function showStatus(hoursObj) {
    var todaysHours = hoursObj[daysOfWeek[moment().day()]];
    var status = $('#status');

    if (todaysHours.open
      && todaysHours.close
      && moment().isBetween(moment(todaysHours.open, 'HH:mm a'), moment(todaysHours.close, 'HH:mm a'))) {
      status.html('Open!').removeClass('closed').addClass('open');
    } else {
      status.html('Closed!').removeClass('open').addClass('closed');
    }
  }

  function setImage() {
    var timestamp = moment().unix();

    $('#image')
      .attr('src', '')
      // Since the image name never changes, add a dummy query parameter which does change to prevent caching
      .attr('src', 'https://library.rit.edu/javawallys/images/webcam.jpg?w=1920&nocache=' + timestamp);

    if (STORAGE_AVAILABLE) {
      // Keep track of the last image update so that the image
      // can be fresh upon first page visit but refreshing the page
      // won't update the image and overload the webcam.
      localStorage.setItem('last_update', timestamp);
    }

    //In the case of a new day, update the day to be highlighted,
    //this allows for the correct day to be highlighted without needing to be refreshed
    highlightDay();
  }

  function fetchImage() {
    $.ajax({
      url: 'https://library.rit.edu/javawallys/php/dl-webcam.php',
      method: 'POST',
      dataType: 'jsonp' // For CORS
    }).always(function() {
      setImage();
    });
  }

  function updateImage(firstVisit) {
    firstVisit = !!firstVisit; // Make either 'true' or 'false'

    if (STORAGE_AVAILABLE) {
      var lastTimestamp = localStorage.getItem('last_update');
      // User doesn't have the localStorage value set
      // or 1 minute has passed
      if (!lastTimestamp || moment().diff(moment.unix(lastTimestamp), 'seconds') > 60) {
        fetchImage();
      } else {
        setImage(); // 1 minutes hasn't passed; use the most current image
      }
    } else {
      // If localStorage is not available, retain previous
      // webcam overload-prevention behavior. Don't update the image
      // if it is the first visit; wait 2 minutes to update.
      if (firstVisit) {
        setImage();
      } else {
        fetchImage();
      }
    }
  }

  generateDays(isSummer() ? summerHours : hours);
  highlightDay();
  showStatus(isSummer() ? summerHours : hours);
  updateImage(true);
  setInterval(updateImage, 120000); // 2 Minutes
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
