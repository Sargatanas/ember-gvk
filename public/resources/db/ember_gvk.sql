PGDMP         2                w         	   ember_gvk    9.6.16    9.6.16 +    x           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            y           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            z           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            {           1262    16393 	   ember_gvk    DATABASE     �   CREATE DATABASE ember_gvk WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';
    DROP DATABASE ember_gvk;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            |           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    12387    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            }           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    16394 	   addresses    TABLE       CREATE TABLE public.addresses (
    id integer NOT NULL,
    street character(100) NOT NULL,
    house integer NOT NULL,
    build character varying(5),
    floor integer,
    flat integer,
    CONSTRAINT flat CHECK ((flat > 0)),
    CONSTRAINT house CHECK ((house > 0))
);
    DROP TABLE public.addresses;
       public         postgres    false    3            �            1259    16442    addresses_id_seq    SEQUENCE     y   CREATE SEQUENCE public.addresses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.addresses_id_seq;
       public       postgres    false    185    3            ~           0    0    addresses_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.addresses_id_seq OWNED BY public.addresses.id;
            public       postgres    false    189            �            1259    16436    tasks    TABLE     �   CREATE TABLE public.tasks (
    content character(255) NOT NULL,
    id integer NOT NULL,
    plane_duration time without time zone NOT NULL
);
    DROP TABLE public.tasks;
       public         postgres    false    3            �            1259    16453    manipulations_id_seq    SEQUENCE     }   CREATE SEQUENCE public.manipulations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.manipulations_id_seq;
       public       postgres    false    3    187                       0    0    manipulations_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.manipulations_id_seq OWNED BY public.tasks.id;
            public       postgres    false    190            �            1259    16439    requests    TABLE       CREATE TABLE public.requests (
    date timestamp(4) without time zone,
    "isComplete" boolean,
    real_duration time without time zone,
    id integer NOT NULL,
    team integer,
    task integer NOT NULL,
    address integer NOT NULL,
    index integer NOT NULL
);
    DROP TABLE public.requests;
       public         postgres    false    3            �            1259    16462    tasks_id_seq    SEQUENCE     u   CREATE SEQUENCE public.tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.tasks_id_seq;
       public       postgres    false    3    188            �           0    0    tasks_id_seq    SEQUENCE OWNED BY     @   ALTER SEQUENCE public.tasks_id_seq OWNED BY public.requests.id;
            public       postgres    false    191            �            1259    16433    teams    TABLE     �   CREATE TABLE public.teams (
    index smallint NOT NULL,
    shift_start time without time zone NOT NULL,
    shift_end time without time zone NOT NULL,
    id integer NOT NULL
);
    DROP TABLE public.teams;
       public         postgres    false    3            �            1259    16470    teams_id_seq    SEQUENCE     u   CREATE SEQUENCE public.teams_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.teams_id_seq;
       public       postgres    false    3    186            �           0    0    teams_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.teams_id_seq OWNED BY public.teams.id;
            public       postgres    false    192            �           2604    16444    addresses id    DEFAULT     l   ALTER TABLE ONLY public.addresses ALTER COLUMN id SET DEFAULT nextval('public.addresses_id_seq'::regclass);
 ;   ALTER TABLE public.addresses ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    189    185            �           2604    16464    requests id    DEFAULT     g   ALTER TABLE ONLY public.requests ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);
 :   ALTER TABLE public.requests ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    191    188            �           2604    16455    tasks id    DEFAULT     l   ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.manipulations_id_seq'::regclass);
 7   ALTER TABLE public.tasks ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    190    187            �           2604    16472    teams id    DEFAULT     d   ALTER TABLE ONLY public.teams ALTER COLUMN id SET DEFAULT nextval('public.teams_id_seq'::regclass);
 7   ALTER TABLE public.teams ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    192    186            n          0    16394 	   addresses 
   TABLE DATA               J   COPY public.addresses (id, street, house, build, floor, flat) FROM stdin;
    public       postgres    false    185   �+       �           0    0    addresses_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.addresses_id_seq', 1, false);
            public       postgres    false    189            �           0    0    manipulations_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.manipulations_id_seq', 1, false);
            public       postgres    false    190            q          0    16439    requests 
   TABLE DATA               e   COPY public.requests (date, "isComplete", real_duration, id, team, task, address, index) FROM stdin;
    public       postgres    false    188   .,       p          0    16436    tasks 
   TABLE DATA               <   COPY public.tasks (content, id, plane_duration) FROM stdin;
    public       postgres    false    187   -       �           0    0    tasks_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.tasks_id_seq', 1, false);
            public       postgres    false    191            o          0    16433    teams 
   TABLE DATA               B   COPY public.teams (index, shift_start, shift_end, id) FROM stdin;
    public       postgres    false    186   �-       �           0    0    teams_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.teams_id_seq', 1, false);
            public       postgres    false    192            �           2606    16452    addresses addresses_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.addresses DROP CONSTRAINT addresses_pkey;
       public         postgres    false    185    185            �           2606    16497    addresses floor    CHECK CONSTRAINT     U   ALTER TABLE public.addresses
    ADD CONSTRAINT floor CHECK ((floor > 0)) NOT VALID;
 4   ALTER TABLE public.addresses DROP CONSTRAINT floor;
       public       postgres    false    185    185            �           2606    16460    tasks manipulations_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT manipulations_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.tasks DROP CONSTRAINT manipulations_pkey;
       public         postgres    false    187    187            �           2606    16469    requests tasks_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.requests
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);
 =   ALTER TABLE ONLY public.requests DROP CONSTRAINT tasks_pkey;
       public         postgres    false    188    188            �           2606    16477    teams teams_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.teams DROP CONSTRAINT teams_pkey;
       public         postgres    false    186    186            �           1259    16495    fki_address    INDEX     C   CREATE INDEX fki_address ON public.requests USING btree (address);
    DROP INDEX public.fki_address;
       public         postgres    false    188            �           1259    16489    fki_task    INDEX     =   CREATE INDEX fki_task ON public.requests USING btree (task);
    DROP INDEX public.fki_task;
       public         postgres    false    188            �           1259    16483    fki_team    INDEX     =   CREATE INDEX fki_team ON public.requests USING btree (team);
    DROP INDEX public.fki_team;
       public         postgres    false    188            �           2606    16490    requests address    FK CONSTRAINT     }   ALTER TABLE ONLY public.requests
    ADD CONSTRAINT address FOREIGN KEY (address) REFERENCES public.addresses(id) NOT VALID;
 :   ALTER TABLE ONLY public.requests DROP CONSTRAINT address;
       public       postgres    false    188    2028    185            �           2606    16484    requests task    FK CONSTRAINT     s   ALTER TABLE ONLY public.requests
    ADD CONSTRAINT task FOREIGN KEY (task) REFERENCES public.tasks(id) NOT VALID;
 7   ALTER TABLE ONLY public.requests DROP CONSTRAINT task;
       public       postgres    false    188    187    2032            �           2606    16478    requests team    FK CONSTRAINT     s   ALTER TABLE ONLY public.requests
    ADD CONSTRAINT team FOREIGN KEY (team) REFERENCES public.teams(id) NOT VALID;
 7   ALTER TABLE ONLY public.requests DROP CONSTRAINT team;
       public       postgres    false    188    186    2030            n   `   x�3�0�b�Ŏ�.츰��ZNC�89�L�^#Ns.C��k���a2�1����@�l�ih�eJ_�M�6�r�s���fC����b���� �Ŕ�      q   �   x���[!�o]E70�y�����SDS[R�8��qB.(��nD����N�@��n����l��oV����eiX5��6{�,FY�k�h��m�ny��&��[�录�u��0++kܢGn��N������t��11<1x,��9���X�;MLq���?.K��1^�:��zfOК�z�ݞv�mY�
�Rlg��׆j��1#?�9���z�      p   �   x���M�0�����LE6=�����pB$�x�77r�Ƹr&iӟ��K��i1K-�΍�
<��#`Ƅ^�z�{)���Jv�F|tQ��u�i�V{+:[g��KRY0|ej<զ�[��2�2�0����	��u���Mz86��K�.�N��A���ns��*M�P�1��3=      o   O   x�]�A�0D�5��PJ�g���(�Ƅ��e
�����m>+,�	��[�o������==��K�����Y1�>Tu3c�     