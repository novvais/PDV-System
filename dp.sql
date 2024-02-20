CREATE DATABASE pdv;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    description TEXT
);

INSERT INTO categories (description)
VALUES ('IT'),
('Cell Phones'),
('Beauty and Perfumery'),
('Market'),
('Books and Stationery'),
('Toys'),
('Fashion'),
('Baby'),
('Games');

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    stock_quantity INTEGER NOT NULL,
    value INTEGER NOT NULL,
    categorie_id INTEGER REFERENCES categories(id),
    product_image TEXT
);

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    cep VARCHAR(8) NOT NULL,
    street TEXT NOT NULL,
    number TEXT NOT NULL,
    district TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    observation TEXT,
    total_value INTEGER NOT NULL
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    product_quantity INTEGER NOT NULL,
    product_value INTEGER NOT NULL
);