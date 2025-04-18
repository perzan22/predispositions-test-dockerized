// answer model represents answer
// relation in the database

export interface Answer {
    id_odpowiedzi: number,
    tresc: string,
    wartosc_punktowa: number,
    id_pytania: number,
    label: string
}