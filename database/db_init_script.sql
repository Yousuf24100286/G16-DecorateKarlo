// database language postgresql
// create database named DecorateKarlo 


CREATE DATABASE decoratekarlo;
CREATE USER owner WITH PASSWORD 'olraketaroced';

GRANT ALL PRIVILEGES ON DATABASE decoratekarlo TO owner;
\c decoratekarlo;

CREATE TABLE users (
  id SERIAL NOT NULL ,
  username VARCHAR(25) NOT NULL,
  password_hash VARCHAR(256) NOT NULL,
  email VARCHAR(100) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  telephone VARCHAR(32) NOT NULL,
  priv VARCHAR(16) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE card (
  id SERIAL NOT NULL,
  user_id INT NOT NULL,
  card_network VARCHAR(16) NOT NULL,
  card_holder_name VARCHAR(100) NOT NULL,
  card_number VARCHAR(16) NOT NULL,
  card_expiry_date VARCHAR(5) NOT NULL,
  card_cvv VARCHAR(3) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);




CREATE TABLE discount (
  id SERIAL NOT NULL,
  discount_name VARCHAR(64) NOT NULL,
  discount_description VARCHAR(1000) NOT NULL,
  discount_percentage INT NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE category (
  id SERIAL NOT NULL,
  category_name VARCHAR(64) NOT NULL,
  category_description VARCHAR(1000) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE product (
  id SERIAL NOT NULL,
  product_name VARCHAR(64) NOT NULL,
  product_description VARCHAR(1000) NOT NULL,
  category_id INT NOT NULL,
  discount_id INT,
  FOREIGN KEY (category_id) REFERENCES category(id),
  FOREIGN KEY (discount_id) REFERENCES discount(id)
);

CREATE TABLE product_variant (
  id SERIAL NOT NULL,
  product_id INT NOT NULL,
  variant_attribute VARCHAR(64) NOT NULL,
  variant_level VARCHAR(64) NOT NULL,
  variant_price DECIMAL(10,2) NOT NULL,
  variant_quantity INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);



CREATE TABLE cart_session (
  id SERIAL NOT NULL,
  user_id INT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE cart_item (
  id SERIAL NOT NULL,
  session_id INT NOT NULL,
  product_variant_id INT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (session_id) REFERENCES cart_session(id),
  FOREIGN KEY (product_variant_id) REFERENCES product_variant(id)
);





CREATE TABLE delivery_address (
  id SERIAL NOT NULL,
  user_id INT NOT NULL,
  address_line_1 VARCHAR(100) NOT NULL,
  address_line_2 VARCHAR(100),
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  postcode VARCHAR(10) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE payment (
  id SERIAL NOT NULL,
  user_id INT NOT NULL,
  card_network VARCHAR(16) NOT NULL,
  card_holder_name VARCHAR(100) NOT NULL,
  card_number VARCHAR(16) NOT NULL,
  card_expiry_date VARCHAR(5) NOT NULL,
  card_cvv VARCHAR(3) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE order_details (
  id SERIAL NOT NULL,
  user_id INT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  delivery_address_id INT NOT NULL,
  payment_method VARCHAR(16) NOT NULL,
  payment_id INT,
  order_status VARCHAR(16) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (delivery_address_id) REFERENCES delivery_address(id),
  FOREIGN KEY (payment_id) REFERENCES payment(id)
);

CREATE TABLE order_item (
  id SERIAL NOT NULL,
  order_id INT NOT NULL,
  product_variant_id INT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (order_id) REFERENCES order_details(id),
  FOREIGN KEY (product_variant_id) REFERENCES product_variant(id)
);






CREATE TABLE reviews (
  id SERIAL NOT NULL,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  comment VARCHAR(1000) NOT NULL,
  rating INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);