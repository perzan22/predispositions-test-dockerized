// function calculates personality type of candidate
// based on his answers

function calculatePersonality(answersArray, hexagonArray) {

    // group answers by personality type label
    const grouped = [];

    answersArray.forEach(answer => {
        const point = hexagonArray.find(p => p.label === answer.label);
        if (point) {
            let group = grouped.find(g => g.label === answer.label);
            if (!group) {
                group = { label: answer.label, sum: 0, count: 0 };
                grouped.push(group);
            }

            group.sum += answer.wartosc_punktowa;
            group.count += 1;
        }
    });

    // calculate average of every group

    grouped.forEach(group => group.sum /= group.count);

    // sum of averages from every group

    const sum = grouped.reduce((acc, g) => acc + g.sum, 0);


    // calculate final personality type of candidate
    // and set it on the hexagonal model

    let finalPoint = { x: 0, y: 0 };
    grouped.forEach(g => {
        const point = hexagonArray.find(p => p.label === g.label);
        if (point) {
            finalPoint.x += g.sum * point.x;
            finalPoint.y += g.sum * point.y;
        }
    })

    // point normalization
    
    if (sum !== 0) {
        finalPoint.x /= sum;
        finalPoint.y /= sum;
    } else {
        finalPoint = { x: 0, y: 0 };
    }

    return finalPoint;
}

module.exports = calculatePersonality