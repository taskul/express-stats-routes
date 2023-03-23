const express = require('express');
const ErrorHandler = require('./errorHandler')
const { getMean, getMedian, getMode, writeToJson, getTimeStamp } = require('./helperFunctions')


app = express();
app.use(express.json());

function checkQueryEntry(query) {
    const numQuery = query
    let numsArr;
    // check if user entered something for nums values
    if (!numQuery) {
        throw new ErrorHandler('Nums are required', 400);
    }
    // check to make sure only numbers were passed in
    numsArr = numQuery.split(',')
    numsArr.forEach(num => {
        if (+num) {
            return +num
        } else {
            throw new ErrorHandler(`${num} is not a number`, 400);
        }
    })
    return numsArr
}

// -----------------------------------ROUTES------------------------------

app.get('/mean', function (req, res, next) {
    const numQuery = req.query.nums;
    try {
        const numsArr = checkQueryEntry(numQuery);
        const numsMean = getMean(numsArr)
        const currTime = getTimeStamp()
        const jsonRes = {
            timestamp: currTime,
            operation: "mean",
            value: numsMean
        }
        if (req.query.save === 'true') {
            writeToJson(jsonRes)
        }
        res.json(jsonRes)
    } catch (e) {
        next(e)
    }
});

app.get('/median', function (req, res, next) {
    const numQuery = req.query.nums;
    try {
        const numsArr = checkQueryEntry(numQuery);
        const numsMedian = getMedian(numsArr)
        const jsonRes = {
            timestamp: currTime,
            operation: "median",
            value: numsMedian
        }
        if (req.query.save === 'true') {
            writeToJson(jsonRes)
        }
        res.json(jsonRes)
    } catch (e) {
        next(e)
    }
});

app.get('/mode', function (req, res, next) {
    const numQuery = req.query.nums;
    try {
        const numsArr = checkQueryEntry(numQuery);
        const numsMode = getMode(numsArr)
        const jsonRes = {
            timestamp: currTime,
            operation: "mode",
            value: numsMode
        }
        if (req.query.save === 'true') {
            writeToJson(jsonRes)
        }
        res.json(jsonRes)
    } catch (e) {
        next(e)
    }
})

app.get('/all', function (req, res, next) {
    const numQuery = req.query.nums;
    try {
        const numsArr = checkQueryEntry(numQuery);
        const numsMean = getMean(numsArr)
        const numsMedian = getMedian(numsArr)
        const numsMode = getMode(numsArr)
        const jsonRes = {
            timestamp: currTime,
            operation: "all",
            mean: numsMean,
            median: numsMedian,
            mode: numsMode
        }
        if (req.query.save === 'true') {
            writeToJson(jsonRes)
        }
        res.json(jsonRes)
    } catch (e) {
        next(e)
    }
})



app.use((error, req, res, next) => {
    console.log(error)
    const message = error.msg;
    // so we have a defaul code for our errors
    const status = error.status || 500;

    return res.status(status).json({
        error: { message, status }
    })
})

app.listen(3000, function () {
    console.log('Node is listening on port 3000')
})

module.exports = { getMean, getMedian, getMode }