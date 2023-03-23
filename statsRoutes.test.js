const { getMean, getMedian, getMode } = require('./statsRoutes')

test('getMean function', function () {
    const numsArr = [12, 10, 13, 5, 22, 12, 4];
    const numMean = getMean(numsArr);
    expect(numMean).toEqual(11.14)
})

test('getMedian function', function () {
    const numsArr = [12, 10, 13, 5, 22, 12, 4];
    const numMedian = getMedian(numsArr);
    expect(numMedian).toEqual(12);
})

test('getMode function', function () {
    const numsArr = [12, 10, 13, 5, 22, 12, 4];
    const numMode = getMode(numsArr);
    expect(numMode).toEqual(12);
})