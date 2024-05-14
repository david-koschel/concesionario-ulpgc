create table rent_vehicle (
    id int primary key auto_increment,
    img mediumtext,
    model varchar(255),
    year int,
    engine varchar(255),
    price float(24)
);

create table rent_request (
    id int primary key auto_increment,
    rent_vehicle_id int not null,
    start_date date not null,
    end_date date not null,
    name varchar(255) not null,
    email varchar(255) not null
);