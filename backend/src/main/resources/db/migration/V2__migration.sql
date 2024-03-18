create table contact_message (
    id      int primary key auto_increment,
    name    varchar(255) unique not null,
    email   varchar(255) unique not null,
    subject varchar(255)        not null,
    message varchar(2100)       not null,
    answered boolean
);

insert into contact_message(id, name, email, subject, message, answered) values (1, 'Pablo', 'pablo@testmail.t', 'Primer mensaje de la Bandeja', 'ASAHHASGHAGSHGHAJSHAHSAHSH', false);
insert into contact_message(id, name, email, subject, message, answered) values (2, 'Luis', 'luis@testmail.t', 'Solicitud prueba vehículo', 'Quiero probar uno de sus coches', false);
