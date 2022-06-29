-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS cats;

CREATE TABLE cats (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  age INT,
  eyes VARCHAR,
  fur VARCHAR
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