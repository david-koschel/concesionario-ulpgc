create table rent_vehicle (
    id int primary key auto_increment,
    img mediumtext,
    make varchar(255),
    model varchar(255),
    year int,
    engine varchar(255),
    price float(24),
    start_date date,
    end_date date
);
/*
INSERT INTO rent_vehicle (id, img, make, model, year, engine, price)
VALUES (1, 'assets/toyota-corolla.jpg', 'Toyota', 'Corolla', '2022', '1.4 de 194cv', 50);

INSERT INTO rent_vehicle (id, img, make, model, year, engine, price)
VALUES (2, 'assets/ford-mustang.jpg', 'Ford', 'Mustang', '2022', '2.4 turbo de 200cv', 70);

INSERT INTO rent_vehicle (vehicle_id, booked_date)
VALUES (1, '2024-06-15'), (1, '2024-06-16'), (1, '2024-06-17');

INSERT INTO rent_vehicle (vehicle_id, booked_date)
VALUES (2, '2024-06-15'), (2, '2024-06-16'), (2, '2024-06-17');*/
