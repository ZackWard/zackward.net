// Parse csv data

var fs = require('fs');
var parse = require('csv-parse');

// Read our time use file
var timeUse = fs.createReadStream('timeuse.csv');

// Set up an array to hold the results
var results = {};
var finalResults = [];

// Final data shape: 
let exampleData = {
    year: 2004,
    age: 18,
    sex: 1,
    totalMinutes: 6999,
    individuals: 50
};

let testGroup = [];

// Set up our csv parser
var parser = parse({columns: true});

parser.on('readable', function () {
    var record;
    while (record = parser.read()) {
        // if (record.t120307 !== '0') {
            var dataIndex = record.tuyear + "-" + record.teage + "-" + record.tesex;
            if (results[dataIndex] == undefined) {
                results[dataIndex] = {
                    year: parseInt(record.tuyear),
                    age: parseInt(record.teage),
                    sex: (record.tesex == '1') ? "M" : "F",
                    totalMinutes: parseInt(record.t120307),
                    individuals: 1
                };
            } else {
                results[dataIndex].totalMinutes = results[dataIndex].totalMinutes + parseInt(record.t120307);
                results[dataIndex].individuals++;
            }

        // }
    }
});

parser.on('error', function (error) {
    console.log(error.message);
});

parser.on('finish', function () {

    var jsonResults = {};
    jsonResults.data = [];

    var keys = Object.keys(results);
    for (var i = 0; i < keys.length; i++) {
        results[keys[i]].averageMinutes = Math.round(results[keys[i]].totalMinutes / results[keys[i]].individuals);
        jsonResults.data.push(results[keys[i]]);
    }

    // write to file
    var json = JSON.stringify(jsonResults);
    fs.writeFile('timeuse.json', json, 'utf8', (error) => {
        if (error) throw error;
        console.log("File saved!");
    });

    console.log("All done!");
    console.log(jsonResults.data);
    console.log("Data points: " + jsonResults.data.length);
    console.log("Verify data");
    console.log(testGroup);
    console.log(results["2010-18-1"]);
});


timeUse.pipe(parser);

