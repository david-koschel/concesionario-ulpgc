alter table user
add name varchar(255) not null default 'Nombre',
add address varchar(255) not null default 'Dirección';

alter table user
alter name drop default,
alter address drop default;
