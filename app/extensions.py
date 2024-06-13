from flask_sqlalchemy import SQLAlchemy
from flask_restx import Api
from flask_jwt_extended import JWTManager  
from flask_marshmallow import Marshmallow


api = Api()
db = SQLAlchemy()
jwt = JWTManager()
ma = Marshmallow()