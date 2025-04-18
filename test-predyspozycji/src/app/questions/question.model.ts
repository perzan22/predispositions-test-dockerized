// question model represents question
// relation in the database

export interface Question {
    id_pytania: number
    tresc: string
    instrukcja: string
    ilosc_odpowiedzi: number
    typ: number
}