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

    var image = document.getElementById("image");

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

    global.addEventListener("resize", onWindowResize);

    resizeImage();
})(window);
