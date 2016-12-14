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

  function isOnMobile() {
    // See: http://stackoverflow.com/a/11381730
    var regex1 = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
    var regex2 = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
    return regex1.test((navigator.userAgent || navigator.vendor || window.opera).substr(0, 4)) || regex2.test((navigator.userAgent || navigator.vendor || window.opera).substr(0, 4));
  }

  if (!isOnMobile()) {
    global.addEventListener('resize', onWindowResize);
  }

  resizeImage();
})(window);
