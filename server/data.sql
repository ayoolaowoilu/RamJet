create table users(
  id int auto_increment primary key ,
  email varchar(255) not null,
  password varchar(255) not null,
  name text not null,
    role enum('admin','user') default 'user',
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
   
 )

 create table secret_keys(
   id int auto_increment primary key , 
   user_id int not null ,
   plan enum('normal','pro','pro_plus') default 'normal',
   region varchar(255) not null,
   name text not null,
   _key text,
   is_active int default 0,
   created_at timestamp default current_timestamp,
   updated_at timestamp default current_timestamp on update current_timestamp
 )