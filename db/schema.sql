-- start：psql -U user postgres
-- CREATE DATABASE neoncollab;
-- database: \c neoncolla
-- run: \i db/schema.sql


DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(60) NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    email VARCHAR(60) NOT NULL,
    password VARCHAR(255) NOT NULL,
    photo BYTEA,
    skill_level VARCHAR(50)
);

DROP TABLE IF EXISTS problems CASCADE;
CREATE TABLE problems (
    problem_id SERIAL PRIMARY KEY,
    problem_name VARCHAR(255) NOT NULL,
    description TEXT,
    difficulty VARCHAR(50) NOT NULL,
    problem_code TEXT,
    problem_number INTEGER NOT NULL
);

DROP TABLE IF EXISTS chat CASCADE;
CREATE TABLE chat (
    chat_id SERIAL PRIMARY KEY,
    problem_id INT REFERENCES problems(problem_id),
    solver_id INT REFERENCES users(user_id),
    reviewer_id INT REFERENCES users(user_id)
);

DROP TABLE IF EXISTS message CASCADE;
CREATE TABLE messages (
    chat_id INT REFERENCES chat(chat_id),
    user_id INT REFERENCES users(user_id),
    message VARCHAR(1000),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS tests CASCADE;
CREATE TABLE tests (
    test_id SERIAL PRIMARY KEY,
    problem_id INT REFERENCES problems(problem_id),
    test_case_input TEXT NOT NULL,
    test_case__output TEXT NOT NULL
);

DROP TABLE IF EXISTS submission CASCADE;
CREATE TABLE submission (
    user_id INT REFERENCES users(user_id),
    problem_id INT REFERENCES problems(problem_id),
    code TEXT,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    submission_date DATE DEFAULT CURRENT_DATE,
    score FLOAT,
    PRIMARY KEY (user_id, problem_id)
);

-- COPY users(user_id, username, first_name, last_name, email, password)
-- FROM '/Users/brandongomez/Desktop/users.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY problems(problem_id, problem_name, description, difficulty, problem_number)
-- FROM '/Users/brandongomez/Desktop/problems.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY chat(chat_id, problem_id, solver_id, reviewer_id)
-- FROM '/Users/brandongomez/Desktop/chat.csv'
-- DELIMITER ','
-- CSV HEADER;