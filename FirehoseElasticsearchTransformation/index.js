'use strict';
console.log('Loading function');

var geoip = require('geoip-lite');

exports.handler = (event, context, callback) => {
    /* Process the list of records and transform them */
    const output = event.records.map(function(record){
        // decode base64 json data
        var buffer = new Buffer(record.data, 'base64');
        var data = JSON.parse(buffer);
        // find ip information and transform it to geo ip
        var ip = data["ip"];
        var geo = geoip.lookup(ip);
        if (geo){
            data["location"] = geo.ll;
        }
        // encode the data to base64
        var data_str = JSON.stringify(data)
        var result = new Buffer(data_str).toString('base64');
        return {
            recordId: record.recordId,
            result: 'Ok',
            data: result 
        }
    });
    console.log(`Processing completed.  Successful records ${output.length}.`);
    callback(null, { records: output });
};