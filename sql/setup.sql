-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS cat_users CASCADE;
DROP TABLE IF EXISTS cats CASCADE;


CREATE TABLE cat_users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE cats (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT,  
  name VARCHAR NOT NULL,
  age INT,
  eyes VARCHAR,
  fur VARCHAR,
  FOREIGN KEY (user_id) REFERENCES cat_users(id)
);

INSERT INTO cats (
  name,
  age,
  eyes,
  fur
)
VALUES 
  ('Soup', 3, 'blue', 'tan'),
  ('Cricket', 16, 'black', 'brown'),
  ('Bear', 8, 'brown', 'black'),
  ('Pasta', 1, 'yellow', 'gold'),
  ('Howard', 9, 'red', 'brown'),
  ('Otter', 0, 'blue', 'white');