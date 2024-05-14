create table rent_vehicle
(
    id     int primary key auto_increment,
    img    mediumtext,
    model  varchar(255),
    year   int,
    engine varchar(255),
    price  float(24)
);

create table rent_request
(
    id              int primary key auto_increment,
    rent_vehicle_id int references rent_vehicle (id),
    payment_id      int references payment (id),
    user_id         int references user (id),
    start_date      date not null,
    end_date        date not null
);