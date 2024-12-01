create table users (
    id serial primary key,
    email varchar(255) not null unique,
    username varchar(255) not null unique,
    first_name varchar(255),
    last_name varchar(255),
    password_hash varchar(255) not null,
    oauth_provider varchar(50),
    oauth_id varchar(255),
    avatar_url varchar(255),
    type varchar(10) default 'customer',
    address varchar(255),
    city varchar(255),
    postCode varchar(255),
    country varchar(255),
    phone varchar(255),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

create index idx_users_email on users (email);

create index idx_users_oauth on users (oauth_provider, oauth_id);

create table