// result model represents result
// relation in the database

export interface Result {
    id_wyniku: number,
    data: Date,
    id_kandydata: number,
    id_kierunku: number,
    wynik: number
}