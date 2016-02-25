document.addEventListener("DOMContentLoaded", function () {

    if (navigator.geolocation) {
        var parameters = {
            enableHighAccuracy: false,
            timeout: 3600,
            maximumAge: 60000
        };

        navigator.geolocation.getCurrentPosition(reportPosition, gpsError, parameters);
    } else {
        //browser does not support geolocation api
        alert("Oooppss")
    }
});

function reportPosition(position) {
    // create the canvas area 
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var dimensions = 400;
    canvas.height = dimensions;
    canvas.width = dimensions;


    var coordinates = position.coords.latitude + ',' + position.coords.longitude;

    var mapUrl = "http://maps.google.com/maps/api/staticmap?center=";
    mapUrl = mapUrl + coordinates + '&zoom=14&size=' + dimensions + 'x' + dimensions + '&maptype=terrain&sensor=true&markers=size:mid%7Ccolor:red%7C' + coordinates;

    document.getElementById("canvasdiv").appendChild(canvas);

    var imgsrc = new Image;

    imgsrc.src = mapUrl;

    imgsrc.onload = function () {
        context.drawImage(imgsrc, 0, 0);
        console.log(position);
    };
}


function gpsError(error) {
    var errors = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
    };
    alert("Error: " + errors[error.code]);
}
