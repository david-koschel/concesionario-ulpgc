create table user (
    id int primary key auto_increment,
    username varchar(255) unique not null,
    email varchar(255) unique not null,
    password varchar(255) not null,
    role varchar(255) not null
);

insert into user values (1, 'user-test', 'user-test@test.es', 'test123','ADMIN');
