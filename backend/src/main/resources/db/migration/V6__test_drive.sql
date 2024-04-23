create table test_drive_car (
    id int primary key auto_increment,
    model varchar(255) not null,
    car_license varchar(255) not null
);

create table test_drive_request (
    id int primary key auto_increment,
    test_drive_car_id int not null,
    start_date datetime not null,
    end_date datetime not null,
    name varchar(255) not null,
    email varchar(255) not null,
    accepted boolean not null
);