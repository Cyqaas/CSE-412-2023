--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2023-12-02 22:34:28

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 842 (class 1247 OID 16561)
-- Name: status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.status AS ENUM (
    'pending',
    'friends',
    'self'
);


ALTER TYPE public.status OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16688)
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    cid integer NOT NULL,
    pid integer NOT NULL,
    name character varying(50) NOT NULL,
    text character varying(500) NOT NULL,
    comment_date character varying(32) NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16693)
-- Name: comments_cid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_cid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_cid_seq OWNER TO postgres;

--
-- TOC entry 3359 (class 0 OID 0)
-- Dependencies: 217
-- Name: comments_cid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_cid_seq OWNED BY public.comments.cid;


--
-- TOC entry 215 (class 1259 OID 16670)
-- Name: person; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.person (
    uid integer NOT NULL,
    email character varying(45) NOT NULL,
    password character varying(100) NOT NULL,
    name character varying(32) NOT NULL,
    date_of_birth date NOT NULL,
    biography character varying(200) DEFAULT ''::character varying NOT NULL,
    post_count integer DEFAULT 0 NOT NULL,
    friend_count integer DEFAULT 0 NOT NULL,
    profile_picture bytea DEFAULT '\x'::bytea NOT NULL,
    visibility boolean DEFAULT true NOT NULL,
    CONSTRAINT person_friend_count_check CHECK ((friend_count > '-1'::integer)),
    CONSTRAINT person_post_count_check CHECK ((post_count > '-1'::integer))
);


ALTER TABLE public.person OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16669)
-- Name: person_uid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.person_uid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.person_uid_seq OWNER TO postgres;

--
-- TOC entry 3360 (class 0 OID 0)
-- Dependencies: 214
-- Name: person_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.person_uid_seq OWNED BY public.person.uid;


--
-- TOC entry 218 (class 1259 OID 16694)
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    pid integer NOT NULL,
    caption character varying(100) NOT NULL,
    image_path text DEFAULT 'images/empty.jpeg'::text NOT NULL,
    post_date character varying(32) NOT NULL
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16700)
-- Name: posts_pid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_pid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_pid_seq OWNER TO postgres;

--
-- TOC entry 3361 (class 0 OID 0)
-- Dependencies: 219
-- Name: posts_pid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_pid_seq OWNED BY public.posts.pid;


--
-- TOC entry 3192 (class 2604 OID 16701)
-- Name: comments cid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN cid SET DEFAULT nextval('public.comments_cid_seq'::regclass);


--
-- TOC entry 3186 (class 2604 OID 16673)
-- Name: person uid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person ALTER COLUMN uid SET DEFAULT nextval('public.person_uid_seq'::regclass);


--
-- TOC entry 3193 (class 2604 OID 16702)
-- Name: posts pid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN pid SET DEFAULT nextval('public.posts_pid_seq'::regclass);


--
-- TOC entry 3350 (class 0 OID 16688)
-- Dependencies: 216
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (cid, pid, name, text, comment_date) FROM stdin;
1	1	John	nice car!	11/28/2023
2	1	Adma	looks great!	11/28/2023
3	2	Buyer1	What model is it?	11/30/2023
\.


--
-- TOC entry 3349 (class 0 OID 16670)
-- Dependencies: 215
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.person (uid, email, password, name, date_of_birth, biography, post_count, friend_count, profile_picture, visibility) FROM stdin;
66	jes20221168@gmail.comdsdf	dfgs	sdfgd	2023-11-29		0	0	\\x	t
67	myFakeEmail@email.com	123password	Jesse Fake	2023-12-11		0	0	\\x	t
71	fakeMail	sdafds	fasdf	2023-12-04		0	0	\\x	t
33	emailsdfadsfsdsdfsadfsdfafsdsfadfsdfd@.com	123password	sampleName	1997-04-30		0	0	\\x	t
38	asdfsad	fdasdfsa	fasdfasdfas	2023-12-06		0	0	\\x	t
40	jes20221168@gmail.com	123password	jesse	2023-12-12		0	0	\\x	t
48	jes20221168@gmail.comd	fsdfas	asdfsad	2023-12-12		0	0	\\x	t
56	jes20221168@gmail.comdadfsdf	fsdfas	asdfsad	2023-12-12		0	0	\\x	t
\.


--
-- TOC entry 3352 (class 0 OID 16694)
-- Dependencies: 218
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (pid, caption, image_path, post_date) FROM stdin;
1	Check out my new car!	images/1701396445857_Car.jpeg	11/30/2023
2	Used car selling	images/1701396467877_Car2.jpeg	11/30/2023
3	Good Evening!	images/1701396507168_Evening.jpeg	12/2/2023
8	xue	images\\1701579687221_DarkXue.png	12/2/2023
\.


--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 217
-- Name: comments_cid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_cid_seq', 3, true);


--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 214
-- Name: person_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.person_uid_seq', 75, true);


--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 219
-- Name: posts_pid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_pid_seq', 8, true);


--
-- TOC entry 3202 (class 2606 OID 16704)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (cid);


--
-- TOC entry 3198 (class 2606 OID 16686)
-- Name: person person_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_email_key UNIQUE (email);


--
-- TOC entry 3200 (class 2606 OID 16684)
-- Name: person person_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (uid);


--
-- TOC entry 3204 (class 2606 OID 16706)
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (pid);


--
-- TOC entry 3205 (class 2606 OID 16707)
-- Name: comments comments_pid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pid_fkey FOREIGN KEY (pid) REFERENCES public.posts(pid);


-- Completed on 2023-12-02 22:34:28

--
-- PostgreSQL database dump complete
--

