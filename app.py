import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request, jsonify
CREATE_USER_TABLE = (
    "CREATE TABLE IF NOT EXISTS \"User\" ("
    "\"user_id\" SERIAL PRIMARY KEY,"
    "\"username\" TEXT,"
    "\"email\" TEXT,"
    "\"password\" TEXT"
    ");"
)

INSERT_USER_RETURN_ID = (
    "INSERT INTO \"User\" (\"username\", \"email\", \"password\") "
    "VALUES (%s, %s, %s) RETURNING \"user_id\";"
)

CREATE_QUIZ_TABLE = (
    "CREATE TABLE IF NOT EXISTS \"Quiz\" ("
    "\"quiz_id\" SERIAL PRIMARY KEY,"
    "\"difficulty_level\" TEXT,"
    "\"title\" TEXT"
    ");"
)

CREATE_QUIZ_ATTEMPT_TABLE = (
    "CREATE TABLE IF NOT EXISTS \"QuizAttempt\" ("
    "\"attempt_id\" SERIAL PRIMARY KEY,"
    "\"user_id\" INTEGER,"
    "\"quiz_id\" INTEGER,"
    "\"date\" DATE,"
    "\"score\" INTEGER,"
    "FOREIGN KEY(\"quiz_id\") REFERENCES \"Quiz\"(\"quiz_id\"),"
    "FOREIGN KEY(\"user_id\") REFERENCES \"User\"(\"user_id\")"
    ");"
)

CREATE_QUIZ_PROGRESS_TABLE = (
    "CREATE TABLE IF NOT EXISTS \"QuizProgress\" ("
    "\"progress_id\" SERIAL PRIMARY KEY,"
    "\"attempt_id\" INTEGER,"
    "\"quiz_id\" INTEGER,"
    "\"completed\" INTEGER,"
    "\"score\" INTEGER,"
    "FOREIGN KEY(\"quiz_id\") REFERENCES \"Quiz\"(\"quiz_id\"),"
    "FOREIGN KEY(\"attempt_id\") REFERENCES \"QuizAttempt\"(\"attempt_id\")"
    ");"
)

CREATE_QUESTIONS_TABLE = (
    "CREATE TABLE IF NOT EXISTS \"Questions\" ("
    "\"question_id\" SERIAL PRIMARY KEY,"
    "\"quiz_id\" INTEGER,"
    "\"text\" TEXT,"
    "FOREIGN KEY(\"quiz_id\") REFERENCES \"Quiz\"(\"quiz_id\")"
    ");"
)

CREATE_ANSWERS_TABLE = (
    "CREATE TABLE IF NOT EXISTS \"Answers\" ("
    "\"answer_id\" SERIAL PRIMARY KEY,"
    "\"question_id\" INTEGER,"
    "\"text\" TEXT,"
    "\"is_correct\" INTEGER,"
    "FOREIGN KEY(\"question_id\") REFERENCES \"Questions\"(\"question_id\")"
    ");"
)

CREATE_STORY_TABLE = (
    "CREATE TABLE IF NOT EXISTS \"Story\" ("
    "\"story_id\" SERIAL PRIMARY KEY,"
    "\"quiz_id\" INTEGER,"
    "\"title\" TEXT,"
    "\"author\" TEXT,"
    "\"text\" TEXT,"
    "FOREIGN KEY(\"quiz_id\") REFERENCES \"Quiz\"(\"quiz_id\")"
    ");"
)


load_dotenv()

app = Flask(__name__)
url=os.getenv('DATABASE_URL')
connection=psycopg2.connect(url)

@app.post("/api/user")
def create_user():
    # Extract user data from the request
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_USER_TABLE)
            cursor.execute(INSERT_USER_RETURN_ID, (username, email, password))
            user_id = cursor.fetchone()[0]
    return {"username": username, "email": email, "password": password}, 201