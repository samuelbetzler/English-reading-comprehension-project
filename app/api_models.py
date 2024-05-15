from flask_restx import fields
from .extensions import api

user_model = api.model('User', {
    'user_id': fields.Integer(),
    'username': fields.String(),
    'email': fields.String(),
    'password': fields.String()
})
user_put_model = api.model('UserPut', {
    'username': fields.String(),
    'email': fields.String(),
    'password': fields.String()
})

quiz_model = api.model('Quiz', {
    'quiz_id': fields.Integer(),
    'difficulty_level': fields.String(),
    'title': fields.String()
})
quiz_put_model = api.model('QuizPut', {
    'difficulty_level': fields.String(),
    'title': fields.String()
})

attempt_model = api.model('QuizAttempt', {
    'attempt_id': fields.Integer(),
    'user_id': fields.Integer(),
    'quiz_id': fields.Integer(),
    'date': fields.Date(),
    'score': fields.Integer()
})
attempt_put_model = api.model('QuizAttemptPut', {
    'user_id': fields.Integer(),
    'quiz_id': fields.Integer(),
    'date': fields.Date(),
    'score': fields.Integer()
})

question_model = api.model('Question', {
    'question_id': fields.Integer(),
    'quiz_id': fields.Integer(),
    'text': fields.String()
})
question_put_model = api.model('QuestionPut', {
    'quiz_id': fields.Integer(),
    'text': fields.String()
})

answer_model = api.model('Answer', {
    'answer_id': fields.Integer(),
    'question_id': fields.Integer(),
    'text': fields.String(),
    'is_correct': fields.Integer()
})
answer_put_model = api.model('AnswerPut', {
    'question_id': fields.Integer(),
    'text': fields.String(),
    'is_correct': fields.Integer()
})

story_model = api.model('Story', {
    'story_id': fields.Integer(),
    'quiz_id': fields.Integer(),
    'title': fields.String(),
    'author': fields.String(),
    'text': fields.String()
})
story_put_model = api.model('StoryPut', {
    'quiz_id': fields.Integer(),
    'title': fields.String(),
    'author': fields.String(),
    'text': fields.String()
})