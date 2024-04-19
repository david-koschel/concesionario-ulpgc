create table configurable_vehicle_model
(
    id          int primary key auto_increment,
    description varchar(511),
    image       mediumtext,
    name        varchar(127)
);
create table configurable_vehicle_model_make
(
    id          int primary key auto_increment,
    model_id     int references configurable_vehicle_model(id),
    price       float(24),
    description varchar(511),
    name        varchar(127)
);
create table configurable_vehicle_make_color
(
    id            int primary key auto_increment,
    make_id       int references configurable_vehicle_model_make (id),
    price         float(24),
    color         varchar(63),
    name          varchar(127),
    vehicle_image mediumtext
);

create table configurable_vehicle
(
    id          int primary key auto_increment,
    model_id    int references configurable_vehicle_model (id),
    description varchar(511)
);

create table engine
(
    id          int primary key auto_increment,
    price       float(24),
    description varchar(511),
    name        varchar(127)
);

create table configurable_vehicle_engine
(
    configurable_vehicle_engine_id int references engine (id),
    configurable_vehicle_id        int references configurable_vehicle (id)
);

create table extra
(
    id          int primary key auto_increment,
    price       float(24),
    description varchar(511),
    image       mediumtext,
    name        varchar(127)
);

create table configurable_vehicle_extra
(
    configurable_vehicle_extra_id int references extra (id),
    configurable_vehicle_id       int references configurable_vehicle (id)
);

create table rim
(
    id          int primary key auto_increment,
    price       float(24),
    description varchar(511),
    image       mediumtext,
    name        varchar(127)
);

create table configurable_vehicle_rim
(
    configurable_vehicle_rim_id int references rim (id),
    configurable_vehicle_id     int references configurable_vehicle (id)
);
