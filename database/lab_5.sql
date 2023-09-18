CREATE TABLE client (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(255),
    surname VARCHAR(255)
)

CREATE TABLE request (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    client_id INTEGER,
    FOREIGN KEY (client_id) REFERENCES client (id) 
)

CREATE TABLE service (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    request_id INTEGER,
    FOREIGN KEY (request_id) REFERENCES request (id)
)