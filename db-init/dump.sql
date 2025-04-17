--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-04-16 15:57:39

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;



--
-- TOC entry 230 (class 1259 OID 40962)
-- Name: administrator_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.administrator_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.administrator_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 24602)
-- Name: administrator; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.administrator (
    id_admin integer DEFAULT nextval('public.administrator_id_seq'::regclass) NOT NULL,
    login character varying(20) NOT NULL,
    haslo character(60) NOT NULL
);


ALTER TABLE public.administrator OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 49157)
-- Name: id_typu_osobowosci_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.id_typu_osobowosci_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.id_typu_osobowosci_seq OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 32770)
-- Name: kandydat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kandydat_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.kandydat_id_seq OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 24582)
-- Name: kandydat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kandydat (
    id_kandydata integer DEFAULT nextval('public.kandydat_id_seq'::regclass) NOT NULL,
    imie character varying(20) NOT NULL,
    nazwisko character varying(30) NOT NULL,
    email character varying(40) NOT NULL,
    miasto character varying(30) NOT NULL
);


ALTER TABLE public.kandydat OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24639)
-- Name: kierunek_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kierunek_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.kierunek_id_seq OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24577)
-- Name: kierunek; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kierunek (
    id_kierunku integer DEFAULT nextval('public.kierunek_id_seq'::regclass) NOT NULL,
    nazwa character varying(60) NOT NULL,
    wydzial character varying(40) NOT NULL,
    x double precision DEFAULT 0 NOT NULL,
    y double precision DEFAULT 0.0 NOT NULL
);


ALTER TABLE public.kierunek OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 24637)
-- Name: odpowiedz_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.odpowiedz_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.odpowiedz_id_seq OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24622)
-- Name: odpowiedz; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.odpowiedz (
    id_odpowiedzi integer DEFAULT nextval('public.odpowiedz_id_seq'::regclass) NOT NULL,
    tresc character varying(60) NOT NULL,
    wartosc_punktowa real NOT NULL,
    id_pytania integer NOT NULL
);


ALTER TABLE public.odpowiedz OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24635)
-- Name: pytanie_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pytanie_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pytanie_id_seq OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 24612)
-- Name: pytanie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pytanie (
    id_pytania integer DEFAULT nextval('public.pytanie_id_seq'::regclass) NOT NULL,
    tresc character varying(100) NOT NULL,
    instrukcja character varying(30) NOT NULL,
    ilosc_odpowiedzi integer NOT NULL,
    id_typu integer NOT NULL
);


ALTER TABLE public.pytanie OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 49152)
-- Name: typ_osobowosci; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.typ_osobowosci (
    id_typu_osobowosci integer DEFAULT nextval('public.id_typu_osobowosci_seq'::regclass) NOT NULL,
    nazwa character varying(30) NOT NULL,
    label character(1) NOT NULL,
    x real NOT NULL,
    y real NOT NULL
);


ALTER TABLE public.typ_osobowosci OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 24633)
-- Name: typ_pytania_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.typ_pytania_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.typ_pytania_id_seq OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24607)
-- Name: typ_pytania; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.typ_pytania (
    id_typu integer DEFAULT nextval('public.typ_pytania_id_seq'::regclass) NOT NULL,
    nazwa_typu character varying(20) NOT NULL,
    label character(1) NOT NULL
);


ALTER TABLE public.typ_pytania OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 32772)
-- Name: wynik_testu_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.wynik_testu_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.wynik_testu_id_seq OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24587)
-- Name: wynik_testu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wynik_testu (
    id_wyniku integer DEFAULT nextval('public.wynik_testu_id_seq'::regclass) NOT NULL,
    data date NOT NULL,
    id_kandydata integer NOT NULL,
    id_kierunku integer NOT NULL,
    wynik double precision NOT NULL
);


ALTER TABLE public.wynik_testu OWNER TO postgres;

--
-- TOC entry 4854 (class 0 OID 24602)
-- Dependencies: 220
-- Data for Name: administrator; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.administrator (id_admin, login, haslo) FROM stdin;
1	admin	$2a$10$G8ChJvxbq.ffBOQmwmZauOT418zfGLGDn7KqU1bDGky7dq1Bwcuze                                                          
\.


--
-- TOC entry 4851 (class 0 OID 24577)
-- Dependencies: 217
-- Data for Name: kierunek; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kierunek (id_kierunku, nazwa, wydzial, x, y) FROM stdin;
2	Informatyka	Mechaniczno-elektryczny	-0.2109375	0.49
1	Stosunki międzynarodowe	Nauk humanistycznych i społecznych	-0.15093749999999995	-0.21999999999999997
9	Mechanika i budowa maszyn	Mechaniczno-elektryczny	-0.25093750000000004	0.82
10	Mechatronika	Mechaniczno-elektryczny	-0.04093750000000007	0.78
11	Automatyka i robotyka	Mechaniczno-elektryczny	0.2690625	0.78
12	Pedagogika	Nauk humanistycznych i społecznych	0.19906249999999992	-0.73
14	Zarządzanie kapitałem ludzkim	Nauk humanistycznych i społecznych	-0.39093749999999994	-0.52
16	Bezpieczeństwo w transporcie	Dowodzenia i operacji morskich	-0.3309375000000001	0.24
18	Nawigacja	Nawigacji i uzbrojenia morskiego	-0.6909375	0.3999999999999999
20	Logistyka	Dowodzenia i operacji morskich	-0.5409375	-0.040000000000000036
19	Hydrografia morska	Nawigacji i uzbrojenia okrętowego	-0.3509374999999999	0.3799999999999999
13	Pedagogika przedszkolna i wczesnoszkolna	Nauk humanistycznych i społecznych	0.6990625000000001	-0.3999999999999999
17	Systemy informacyjne w bezpieczeństwie, spedycji i logistyce	Dowodzenia i operacji morskich	-0.4509375	0.43999999999999995
3	Bezpieczeństwo Narodowe	Wydział Dowodzenia i Operacji Morskich	-0.5609375	-0.19999999999999996
15	Bezpieczeństwo wewnętrzne	Dowodzenia i operacji morskich	-0.29093750000000007	-0.24
\.


--
-- TOC entry 4857 (class 0 OID 24622)
-- Dependencies: 223
-- Data for Name: odpowiedz; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.odpowiedz (id_odpowiedzi, tresc, wartosc_punktowa, id_pytania) FROM stdin;
8	Raczej nie	0.33	1
3	Raczej tak	0.66	1
2	Nie	0	1
1	Tak	1	1
5	Nie	0	2
4	Tak	1	2
6	Tak	1	3
7	Nie	0	3
13	Nie	0	9
14	Raczej nie	0.25	9
17	Tak	1	9
23	Nie	0	11
24	Raczej nie	0.25	11
25	Nie mam zdania	0.5	11
26	Raczej tak	0.75	11
27	Tak	1	11
28	Nie	0	12
30	Nie mam zdania	0.5	12
29	Raczej nie	0.25	12
15	Nie mam zdania	0.5	9
16	Raczej tak	0.75	9
32	Tak	1	12
31	Raczej tak	0.75	12
\.


--
-- TOC entry 4856 (class 0 OID 24612)
-- Dependencies: 222
-- Data for Name: pytanie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pytanie (id_pytania, tresc, instrukcja, ilosc_odpowiedzi, id_typu) FROM stdin;
1	Czy lubisz programować?	Wybierz odpowiedź	4	2
2	Artystyczny	Czy pasuje do ciebie?	2	4
3	Charyzmatyczny	Czy pasuje do ciebie?	2	5
9	Czy lubisz rozwiązywać ciężkie problemy?	Wybierz odpowiedź	5	1
11	Czy podejmujesz decyzje w zespole?	Wybierz odpowiedź	5	6
12	Czy lubisz pracować z narzędziami?	Wybierz odpoweidź	5	3
\.


--
-- TOC entry 4865 (class 0 OID 49152)
-- Dependencies: 231
-- Data for Name: typ_osobowosci; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.typ_osobowosci (id_typu_osobowosci, nazwa, label, x, y) FROM stdin;
1	Typ realistyczny	R	-0.5	0.866
2	Typ badacza	B	0.5	0.866
3	Typ artystyczny	A	1	0
4	Typ społeczny	S	0.5	-0.866
5	Typ przedsiębiorczy	P	-0.5	-0.866
6	Typ konwencjonalny	K	-1	0
\.


--
-- TOC entry 4855 (class 0 OID 24607)
-- Dependencies: 221
-- Data for Name: typ_pytania; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.typ_pytania (id_typu, nazwa_typu, label) FROM stdin;
1	Typ badacza	B
2	Typ konwencjonalny	K
3	Typ realistyczny	R
4	Typ artystyczny	A
5	Typ społeczny	S
6	Typ przedsiębiorczy	P
\.



--
-- TOC entry 4872 (class 0 OID 0)
-- Dependencies: 230
-- Name: administrator_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.administrator_id_seq', 6, true);


--
-- TOC entry 4873 (class 0 OID 0)
-- Dependencies: 232
-- Name: id_typu_osobowosci_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.id_typu_osobowosci_seq', 6, true);


--
-- TOC entry 4874 (class 0 OID 0)
-- Dependencies: 228
-- Name: kandydat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kandydat_id_seq', 40, true);


--
-- TOC entry 4875 (class 0 OID 0)
-- Dependencies: 227
-- Name: kierunek_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kierunek_id_seq', 21, true);


--
-- TOC entry 4876 (class 0 OID 0)
-- Dependencies: 226
-- Name: odpowiedz_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.odpowiedz_id_seq', 35, true);


--
-- TOC entry 4877 (class 0 OID 0)
-- Dependencies: 225
-- Name: pytanie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pytanie_id_seq', 13, true);


--
-- TOC entry 4878 (class 0 OID 0)
-- Dependencies: 224
-- Name: typ_pytania_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.typ_pytania_id_seq', 6, true);


--
-- TOC entry 4879 (class 0 OID 0)
-- Dependencies: 229
-- Name: wynik_testu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.wynik_testu_id_seq', 31, true);


--
-- TOC entry 4693 (class 2606 OID 24606)
-- Name: administrator administrator_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administrator
    ADD CONSTRAINT administrator_pkey PRIMARY KEY (id_admin);


--
-- TOC entry 4689 (class 2606 OID 24586)
-- Name: kandydat kandydat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kandydat
    ADD CONSTRAINT kandydat_pkey PRIMARY KEY (id_kandydata);


--
-- TOC entry 4687 (class 2606 OID 24581)
-- Name: kierunek kierunek_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kierunek
    ADD CONSTRAINT kierunek_pkey PRIMARY KEY (id_kierunku);


--
-- TOC entry 4699 (class 2606 OID 24626)
-- Name: odpowiedz odpowiedz_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.odpowiedz
    ADD CONSTRAINT odpowiedz_pkey PRIMARY KEY (id_odpowiedzi);


--
-- TOC entry 4697 (class 2606 OID 24616)
-- Name: pytanie pytanie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pytanie
    ADD CONSTRAINT pytanie_pkey PRIMARY KEY (id_pytania);


--
-- TOC entry 4701 (class 2606 OID 49156)
-- Name: typ_osobowosci typ_osobowosci_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.typ_osobowosci
    ADD CONSTRAINT typ_osobowosci_pkey PRIMARY KEY (id_typu_osobowosci);


--
-- TOC entry 4695 (class 2606 OID 24611)
-- Name: typ_pytania typ_pytania_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.typ_pytania
    ADD CONSTRAINT typ_pytania_pkey PRIMARY KEY (id_typu);


--
-- TOC entry 4691 (class 2606 OID 24591)
-- Name: wynik_testu wynik_testu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wynik_testu
    ADD CONSTRAINT wynik_testu_pkey PRIMARY KEY (id_wyniku);


--
-- TOC entry 4705 (class 2606 OID 24627)
-- Name: odpowiedz odpowiedz_id_pytania_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.odpowiedz
    ADD CONSTRAINT odpowiedz_id_pytania_fkey FOREIGN KEY (id_pytania) REFERENCES public.pytanie(id_pytania);


--
-- TOC entry 4704 (class 2606 OID 24617)
-- Name: pytanie pytanie_id_typu_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pytanie
    ADD CONSTRAINT pytanie_id_typu_fkey FOREIGN KEY (id_typu) REFERENCES public.typ_pytania(id_typu);


--
-- TOC entry 4702 (class 2606 OID 65541)
-- Name: wynik_testu wynik_testu_id_kandydat_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wynik_testu
    ADD CONSTRAINT wynik_testu_id_kandydat_fkey FOREIGN KEY (id_kandydata) REFERENCES public.kandydat(id_kandydata) ON DELETE SET NULL;


--
-- TOC entry 4703 (class 2606 OID 65536)
-- Name: wynik_testu wynik_testu_id_kierunku_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wynik_testu
    ADD CONSTRAINT wynik_testu_id_kierunku_fkey FOREIGN KEY (id_kierunku) REFERENCES public.kierunek(id_kierunku) ON DELETE SET NULL;


-- Completed on 2025-04-16 15:57:39

--
-- PostgreSQL database dump complete
--

