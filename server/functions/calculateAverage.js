function calculateAverage(array) {
    if (array.length === 0) return 0;
    const sum = array.reduce((acc, val) => acc + val, 0);
    return Math.round(sum / array.length);
}

module.exports = calculateAverage