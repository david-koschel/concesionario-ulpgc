create table payment
(
    id                int primary key auto_increment,
    order_number      varchar(16),
    amount            int,
    status            int,
    payment_type      varchar(31),
    modification_date datetime
);

alter table user_vehicle
    add payment_id            int references payment (id),
    add payment_status        varchar(31),
    add user_configuration_id int;

alter table user_configuration
    add hidden boolean default false;