CREATE TABLE Vehicles (
    id INT PRIMARY KEY,
    img VARCHAR(255),
    make VARCHAR(255),
    model VARCHAR(255),
    year VARCHAR(4),
    engine VARCHAR(255),
    price DECIMAL(10, 2)
);
CREATE TABLE BookedDates (
    vehicle_id INT,
    booked_date DATE,
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(id)
);
INSERT INTO Vehicles (id, img, make, model, year, engine, price)
VALUES (1, 'assets/toyota-corolla.jpg', 'Toyota', 'Corolla', '2022', '1.4 de 194cv', 50);

INSERT INTO Vehicles (id, img, make, model, year, engine, price)
VALUES (2, 'assets/ford-mustang.jpg', 'Ford', 'Mustang', '2022', '2.4 turbo de 200cv', 70);

INSERT INTO BookedDates (vehicle_id, booked_date)
VALUES (1, '2024-06-15'), (1, '2024-06-16'), (1, '2024-06-17');

INSERT INTO BookedDates (vehicle_id, booked_date)
VALUES (2, '2024-06-15'), (2, '2024-06-16'), (2, '2024-06-17');
