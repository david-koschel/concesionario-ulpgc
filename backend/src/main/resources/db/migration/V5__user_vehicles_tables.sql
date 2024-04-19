create table user_configuration
(
    id                  int primary key auto_increment,
    selected_color_id   int references configurable_vehicle_color (id),
    selected_engine_id  int references engine (id),
    selected_rim_id     int references rim (id),
    selected_vehicle_id int references configurable_vehicle (id),
    user_id             int references user (id)
);

create table user_configuration_extra
(
    user_configuration_id         int references user_configuration (id),
    configurable_vehicle_extra_id int references extra (id)
);

create table user_vehicle
(
    id          int primary key auto_increment,
    total_price float,
    user_id     int references user (id),
    brand       varchar(127),
    color       varchar(63),
    color_name  varchar(127),
    engine_name varchar(127),
    image       mediumtext,
    model       varchar(127),
    rim_name    varchar(127)
);

create table user_vehicle_extra
(
    id                      int primary key auto_increment,
    configurable_vehicle_id int references user_vehicle (id),
    name                    varchar(127),
    description             varchar(511)
);
