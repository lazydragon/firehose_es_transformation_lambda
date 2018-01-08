'use strict';
console.log('Loading function');

var geoip = require('geoip-lite');

exports.handler = (event, context, callback) => {
    /* Process the list of records and transform them */
    const output = event.records.map(function(record){
        var data = record.data;
        // find ip information and transform it to geo ip
        var ip = data["ip"];
        var geo = geoip.lookup(ip);
        data["location"] = geo.ll;
        return {
            recordId: record.recordId,
            result: 'Ok',
            data: data,
        }
    });
    console.log(`Processing completed.  Successful records ${output.length}.`);
    callback(null, { records: output });
};