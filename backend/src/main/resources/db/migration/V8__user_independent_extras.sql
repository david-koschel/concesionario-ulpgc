create table user_independent_extras
(
    id          int primary key auto_increment,
    price       float,
    description varchar(511),
    image       mediumtext,
    name        varchar(127),
    user_id     int references user (id)
);