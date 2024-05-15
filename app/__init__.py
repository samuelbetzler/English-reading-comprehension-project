from flask import Flask

from.extensions import api, db, jwt
from.resources import user_ns, quiz_ns, attempt_ns, question_ns, answer_ns, story_ns

def create_app():
    
     app = Flask(__name__)
     
     app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://sam:1234@localhost:5432/EnglishDataBase'
     app.config["JWT_SECRET_KEY"] = "super-secret"
     
     api.init_app(app)
     db.init_app(app)
     jwt.init_app(app)
     
     api.add_namespace(user_ns)
     api.add_namespace(user_ns)
     api.add_namespace(quiz_ns)
     api.add_namespace(attempt_ns)
     api.add_namespace(question_ns)
     api.add_namespace(answer_ns)
     api.add_namespace(story_ns)

     
     return app