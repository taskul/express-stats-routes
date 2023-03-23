const fs = require('fs');

function getMean(arr) {
    const numMean = arr.reduce((a, b) => +a + +b) / arr.length;
    return +numMean.toFixed(2)
}

function getMedian(arr) {
    // sort the array in ascending order
    arr.sort(function (a, b) {
        return a - b;
    });

    let median;
    let midIndex = Math.floor(arr.length / 2);

    if (arr.length % 2 === 0) {
        // if array length is even, find the average of the middle two elements
        median = (arr[midIndex - 1] + arr[midIndex]) / 2;
    } else {
        // if array length is odd, the median is the middle element
        median = arr[midIndex];
    }

    return +median;

}

function getMode(arr) {
    const numTracker = {};
    let numMode;
    let comparisonNum = 0;
    arr.forEach(num => {
        if (num in numTracker) {
            numTracker[num] += 1;
        } else {
            numTracker[num] = 1;
        }
    })
    for (let [key, value] of Object.entries(numTracker)) {
        if (value > comparisonNum) {
            comparisonNum = value;
            numMode = +key
        }
    }
    return Math.floor(numMode);
}

function writeToJson(content) {
    fs.writeFile('./results.json', JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Successfully saved as JSON file.')
        }
    })

}

function getTimeStamp() {
    // found this on stackoverflow.
    // https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
    const currentdate = new Date();
    const datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    return datetime
}

module.exports = {
    getMean, getMedian, getMode, writeToJson, getTimeStamp
}