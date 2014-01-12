var
   monitor = require('event-loop-monitor'),
   latestData = null,
   enabled = true,
   percentile = 'p95',
   maxLag = 1000; // in milliseconds. Default is 1s

monitor.on('data', function(stats){
   latestData = stats;
});

function isbusy() {
   // event loop monitor gives values in uS. Divide by 1000 to get milliseconds.
   return enabled && latestData && latestData[percentile] && (latestData[percentile] / 1000) > maxLag;
}

isbusy.configure = function(_percentile, _maxLag) {
   percentile = _percentile;
   maxLag = _maxLag;
};

isbusy.disable = function() {
   monitor.stop();
   enabled = false;
};

isbusy.enable = function() {
   monitor.resume();
   enabled = true;
};

module.exports = isbusy;