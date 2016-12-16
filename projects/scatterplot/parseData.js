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
    minutes: 6999,
    avgWeeklyEarnings: 1000
};

let testGroup = [];

// Set up our csv parser
var parser = parse({columns: true});

parser.on('readable', function () {
    var record;
    while (record = parser.read()) {
        var dataIndex = record.tuyear + "-" + record.teage + "-" + record.tesex;
        if (results[dataIndex] == undefined) {
            results[dataIndex] = [];
        }
        results[dataIndex].push({
                year: parseInt(record.tuyear),
                age: parseInt(record.teage),
                sex: (record.tesex == '1') ? "M" : "F",
                minutes: parseInt(record.t120307),
                weight: parseInt(record.tufnwgtp),
                weeklyEarnings: parseInt(record.trernwa)
        });

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
        console.log(results[keys[i]]);
        // Calculate weighted results here
        var accMinutes = 0,
            accWeight = 0,
            accEarnings = 0,
            respondents = results[keys[i]].length;
        for (var j = 0; j < results[keys[i]].length; j++) {
            accMinutes = accMinutes + results[keys[i]][j].minutes * results[keys[i]][j].weight;
            accWeight = accWeight + results[keys[i]][j].weight;
            accEarnings = accEarnings + (results[keys[i]][j].weeklyEarnings > 0 ? results[keys[i]][j].weeklyEarnings : 0);
        }
        jsonResults.data.push({
            year: results[keys[i]][0].year,
            age: results[keys[i]][0].age,
            sex: results[keys[i]][0].sex,
            minutes: Math.round(accMinutes / accWeight),
            avgWeeklyEarnings: Math.round((accEarnings / respondents) / 100)
        });
    }

    console.log(jsonResults.data);

    // write to file
    var json = JSON.stringify(jsonResults);
    fs.writeFile('timeuse.json', json, 'utf8', (error) => {
        if (error) throw error;
        console.log("File saved!");
    });

    console.log("All done!");
    console.log("Sample data from 2014, 18 yo males:");
    var testResults = results["2014-18-1"];
    console.log(testResults);

    var accMinutes = 0, accWeight = 0;
    for (var i = 0; i < testResults.length; i++) {
        accMinutes = accMinutes + (testResults[i].minutes * testResults[i].weight);
        accWeight = accWeight + testResults[i].weight;
    }
    var estMinutes = accMinutes / accWeight;
    console.log("Estimate: " + estMinutes);
});


timeUse.pipe(parser);

