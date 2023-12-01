--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5 (Ubuntu 15.5-1.pgdg22.04+1)
-- Dumped by pg_dump version 16.1 (Ubuntu 16.1-1.pgdg22.04+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
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
-- Name: comments_cid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_cid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments_cid_seq OWNER TO postgres;

--
-- Name: comments_cid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_cid_seq OWNED BY public.comments.cid;


--
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
-- Name: posts_pid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_pid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.posts_pid_seq OWNER TO postgres;

--
-- Name: posts_pid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_pid_seq OWNED BY public.posts.pid;


--
-- Name: comments cid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN cid SET DEFAULT nextval('public.comments_cid_seq'::regclass);


--
-- Name: posts pid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN pid SET DEFAULT nextval('public.posts_pid_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (cid, pid, name, text, comment_date) FROM stdin;
1	1	John	nice car!	11/28/2023
2	1	Adma	looks great!	11/28/2023
3	2	Buyer1	What model is it?	11/30/2023
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (pid, caption, image_path, post_date) FROM stdin;
1	Check out my new car!	images/1701396445857_Car.jpeg	11/30/2023
2	Used car selling	images/1701396467877_Car2.jpeg	11/30/2023
3	Good Evening!	images/1701396507168_Evening.jpeg	11/30/2023
4	We went to a park today!	images/1701396532619_Gardens.JPG	11/30/2023
\.


--
-- Name: comments_cid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_cid_seq', 3, true);


--
-- Name: posts_pid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_pid_seq', 4, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (cid);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (pid);


--
-- Name: comments comments_pid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pid_fkey FOREIGN KEY (pid) REFERENCES public.posts(pid);


--
-- PostgreSQL database dump complete
--

