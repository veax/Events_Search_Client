// check for Geolocation support
const findPosition = () => {
    if (navigator.geolocation) {
        console.log('Geolocation is supported!');
    }
    else {
        console.log('Geolocation is not supported for this Browser/OS version yet.');
    }
    var startPos;
    var geoSuccess = function(position) {
        startPos = position;
        console.log(startPos.coords.latitude)
        console.log(startPos.coords.longitude)
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
    
}

export default findPosition
