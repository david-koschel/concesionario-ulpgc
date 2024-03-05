create table user (
    id int,
    username varchar(255) unique not null,
    email varchar(255) unique not null,
    password varchar(255) not null,
    role varchar(255) not null
);

insert into user (username, email, password, role) values ('david.koschel', 'david.koschel101@alu.ulpgc.es', 'test123','ADMIN');
