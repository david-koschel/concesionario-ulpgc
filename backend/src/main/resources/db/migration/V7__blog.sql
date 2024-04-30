create table blog (
  id int primary key auto_increment,
  title varchar(255) unique,
  description varchar(255),
  image varchar(255),
  data text,
  modification_date datetime,
  end_date datetime,
  published boolean
);