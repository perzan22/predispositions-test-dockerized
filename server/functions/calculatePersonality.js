function calculatePersonality(answersArray, hexagonArray) {

    // Grupowanie odpowiedzi według etykiety
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

    // Obliczanie średniej wartości dla każdej grupy
    grouped.forEach(group => group.sum /= group.count);

    // Suma średnich wszystkich odpowiedzi
    const sum = grouped.reduce((acc, g) => acc + g.sum, 0);


    // Obliczenie finalnego punktu typu osobowości
    let finalPoint = { x: 0, y: 0 };
    grouped.forEach(g => {
        const point = hexagonArray.find(p => p.label === g.label);
        if (point) {
            finalPoint.x += g.sum * point.x;
            finalPoint.y += g.sum * point.y;
        }
    })

    // Normalizacja punktu
    if (sum !== 0) {
        finalPoint.x /= sum;
        finalPoint.y /= sum;
    } else {
        finalPoint = { x: 0, y: 0 };
    }

    return finalPoint;
}

module.exports = calculatePersonality