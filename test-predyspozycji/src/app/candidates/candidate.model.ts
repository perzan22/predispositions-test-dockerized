// candidate model represents candidate
// relation in the database

export interface Candidate {
    id_kandydata: number,
    imie: string,
    nazwisko: string,
    email: string,
    miasto: string,
    data: Date,
    kierunek: string
}