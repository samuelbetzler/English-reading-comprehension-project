from flask import Flask

from.extensions import api, db, jwt, ma
from.resources import user_ns, quiz_ns, attempt_ns, question_ns, answer_ns, story_ns

def create_app():
    
     app = Flask(__name__)
     
     app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://EnglishDataBase_owner:Wnehj0QqT4iy@ep-old-tree-a521qufj.us-east-2.aws.neon.tech/EnglishDataBase?sslmode=require'
     app.config["JWT_SECRET_KEY"] = "super-secret"
     
     api.init_app(app)
     ma.init_app(app)
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