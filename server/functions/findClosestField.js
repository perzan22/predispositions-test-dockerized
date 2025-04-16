function findClosestField(personalityPoint, fields) {
    
    // Ustawienie początkowych wartości na nieskończoność i null
    let smallestDistance = Infinity;
    let bestMatch = null;

    // Sprawdzenie całej tabeli kierunki
    fields.forEach(field => {
        // Wzór obliczający dystans punktu od punktu
        const distance = Math.sqrt(
            Math.pow(personalityPoint.x - field.x, 2) +
            Math.pow(personalityPoint.y - field.y, 2)
        );

        // Jeśli obliczony dystans jest mniejszy od najmniejszego to staje się 
        // nowym najmniejszym dystansem
        if (distance < smallestDistance) {
            smallestDistance = distance;
            bestMatch = field
        }
    });
    // Zwrócone jest id kierunku o najmniejszym dystansie od punktu osobowości
    return bestMatch.id_kierunku
};

module.exports = findClosestField;