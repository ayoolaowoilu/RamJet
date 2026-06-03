create table users(
  id int auto_increment primary key ,
  email varchar(255),
  password varchar(255),
  name text,
    role enum('admin','user') default 'user',
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
  
 )