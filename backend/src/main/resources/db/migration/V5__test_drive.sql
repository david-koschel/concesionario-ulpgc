create table test_drive_car (
    id int primary key auto_increment,
    car_model_id int not null
);

create table test_drive_request (
    id int primary key auto_increment,
    test_drive_car_id int not null,
    start_date datetime not null,
    end_date datetime not null,
    user_id int not null
);