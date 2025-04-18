// method returns field of study which is the
// closest on the hexagonal model
// to candidate personality type

function findClosestField(personalityPoint, fields) {
    
    let smallestDistance = Infinity;
    let bestMatch = null;

    // check every study field

    fields.forEach(field => {

        // calculate distance from study filed to personality type

        const distance = Math.sqrt(
            Math.pow(personalityPoint.x - field.x, 2) +
            Math.pow(personalityPoint.y - field.y, 2)
        );

        // if calculated distance is smaller than the previous smallest on
        // then this is now best match

        if (distance < smallestDistance) {
            smallestDistance = distance;
            bestMatch = field
        }
    });
    return bestMatch.id_kierunku
};

module.exports = findClosestField;