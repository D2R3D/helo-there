create table users (
id serial primary key,
username varchar(25),
password text,
profile_pic text
)
insert into users (username, password, profile_pic)
values ('D2','coolpassword','profile pic rocks man!')

create table posts (
id serial primary key,
title varchar(50),
img text,
content text,
author_id integer references users(id)
)

insert into posts (title, img, content, author_id)
values ('new title from user','2nd img from user', '2nd posts from user', 1)