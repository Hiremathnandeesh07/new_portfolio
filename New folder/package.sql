PGDMP     *    '                 |         	   portfolio    15.4    15.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16608 	   portfolio    DATABASE     |   CREATE DATABASE portfolio WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE portfolio;
                postgres    false            �            1259    16621    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255),
    work character varying(255),
    about text,
    links0 character varying(255),
    links1 character varying(255),
    skills character varying(255),
    project_title0 character varying(255),
    project_brief0 text,
    project_links0 character varying(255),
    project_title1 character varying(255),
    project_brief1 text,
    project_links1 character varying(255),
    project_title2 character varying(255),
    project_brief2 text,
    project_links2 character varying(255)
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16620    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    215            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    214            e           2604    16624    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            �          0    16621    users 
   TABLE DATA           �   COPY public.users (id, email, password, name, work, about, links0, links1, skills, project_title0, project_brief0, project_links0, project_title1, project_brief1, project_links1, project_title2, project_brief2, project_links2) FROM stdin;
    public          postgres    false    215          �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 42, true);
          public          postgres    false    214            g           2606    16628    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            �   �  x�ŗێ� ���]���p�w�{CRM�n�4}��E��M�I���c~�G�Vt���;���1��ptC�S�)	@BA��|���֘�īy�y��[��P�;�Ʈ����c�pI����9�J`cJ��{��F�%�pk���⃫�'�}����㛁.f`m�~klk����O�B RJ������<��}�O�n>�a�gNq��}��?>�A��%T����и�$,��˺f��f�<���Fg�����?(�V�SQ��?���A���`�>���N�鯊zB��}e��Rd%|��V�a-��2y�h-,�!j�s�~z�7�����(ͷcӘ
�S��K �1�+�kg��j �䃗�	BJ������UWU���&V     