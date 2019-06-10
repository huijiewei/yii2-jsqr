(function ($) {
    "use strict";

    $.jsQR = function (elem, callback) {
        var drawCanvasLine = function (canvas, begin, end, color) {
            canvas.beginPath();
            canvas.moveTo(begin.x, begin.y);
            canvas.lineTo(end.x, end.y);
            canvas.lineWidth = 4;
            canvas.strokeStyle = color;
            canvas.stroke();
        };

        var startWrap = elem.find('.jsqr-start');
        var jsqrWrap = elem.find('.jsqr-wrap');

        var lastResult = null;
        var refractoryTimeout = null;

        elem.find('.jsqr-btn-start').on('click', function () {
            startWrap.addClass('hidden');
            jsqrWrap.removeClass('hidden');

            var jsqrCanvas = jsqrWrap.find('.jsqr-canvas');

            var video = document.createElement("video");
            var canvas = jsqrCanvas[0];
            var context = canvas.getContext('2d');

            var current = elem[0];

            var tick = function () {
                if (video.readyState === video.HAVE_ENOUGH_DATA) {

                    var videoWidth = Math.floor(video.videoWidth);
                    var videoHeight = Math.floor(video.videoHeight);

                    canvas.setAttribute('width', videoWidth);
                    canvas.setAttribute('height', videoHeight);

                    context.drawImage(video, 0, 0, videoWidth, videoHeight);

                    var imageData = context.getImageData(0, 0, videoWidth, videoHeight);

                    var code = jsQR(imageData.data, imageData.width, imageData.height, {
                        inversionAttempts: "dontInvert"
                    });

                    if (code) {
                        drawCanvasLine(context, code.location.topLeftCorner, code.location.topRightCorner, "#61ff6d");
                        drawCanvasLine(context, code.location.topRightCorner, code.location.bottomRightCorner, "#61ff6d");
                        drawCanvasLine(context, code.location.bottomRightCorner, code.location.bottomLeftCorner, "#61ff6d");
                        drawCanvasLine(context, code.location.bottomLeftCorner, code.location.topLeftCorner, "#61ff6d");

                        var data = code.data;

                        if (lastResult != data) {
                            clearTimeout(refractoryTimeout);

                            refractoryTimeout = setTimeout(function () {
                                lastResult = null;
                            }, 5000);

                            lastResult = code.data;

                            callback(data);
                        }
                    }
                }

                requestAnimationFrame(tick);
            };

            navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: "environment"}})
                .then(function (stream) {
                    video.srcObject = stream;
                    video.setAttribute("playsinline", 'true');
                    video.play();

                    $.data(current, "stream", stream);

                    requestAnimationFrame(tick);
                })
                .catch(function () {
                    alert('没有摄像头权限, 或者没有找到摄像头，或者你所使用的浏览器不支持摄像头, Chrome 必须在 https 下才能开启摄像头, http 环境请使用 Firefox');
                });
        });

        elem.find('.jsqr-btn-close').on('click', function () {
            var videoTracks = elem.data('stream');

            if (videoTracks) {
                videoTracks.getVideoTracks().forEach(function (videoTrack) {
                    videoTrack.stop();
                });
            }

            startWrap.removeClass('hidden');
            jsqrWrap.addClass('hidden');
        });
    };
})(jQuery);
