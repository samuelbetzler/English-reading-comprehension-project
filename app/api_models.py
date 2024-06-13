from flask_restx import fields
from .extensions import api

user_model = api.model('User', {
    'user_id': fields.Integer(readOnly=True),
    'username': fields.String(required=True),
    'email': fields.String(required=True),
    'password': fields.String(required=True)
})

user_put_model = api.model('UserPut', {
    'username': fields.String(),
    'email': fields.String(),
    'password': fields.String()
})

quiz_model = api.model('Quiz', {
    'quiz_id': fields.Integer(readOnly=True),
    'difficulty_level': fields.String(required=True),
    'title': fields.String(required=True)
})

quiz_put_model = api.model('QuizPut', {
    'difficulty_level': fields.String(),
    'title': fields.String()
})

attempt_model = api.model('QuizAttempt', {
    'attempt_id': fields.Integer(readOnly=True),
    'user_id': fields.Integer(required=True),
    'quiz_id': fields.Integer(required=True),
    'date': fields.Date(required=True),
    'score': fields.Integer()
})

attempt_put_model = api.model('QuizAttemptPut', {
    'user_id': fields.Integer(),
    'quiz_id': fields.Integer(),
    'date': fields.Date(),
    'score': fields.Integer()
})

progress_model = api.model('QuizProgress', {
    'progress_id': fields.Integer(readOnly=True),
    'attempt_id': fields.Integer(required=True),
    'quiz_id': fields.Integer(required=True),
    'completed': fields.Boolean(required=True),
    'score': fields.Integer()
})

progress_put_model = api.model('QuizProgressPut', {
    'attempt_id': fields.Integer(),
    'quiz_id': fields.Integer(),
    'completed': fields.Boolean(),
    'score': fields.Integer()
})

question_model = api.model('Question', {
    'question_id': fields.Integer(readOnly=True),
    'quiz_id': fields.Integer(required=True),
    'text': fields.String(required=True)
})

question_put_model = api.model('QuestionPut', {
    'quiz_id': fields.Integer(),
    'text': fields.String()
})

answer_model = api.model('Answer', {
    'answer_id': fields.Integer(readOnly=True),
    'question_id': fields.Integer(required=True),
    'text': fields.String(required=True),
    'is_correct': fields.Boolean(required=True)
})

answer_put_model = api.model('AnswerPut', {
    'question_id': fields.Integer(),
    'text': fields.String(),
    'is_correct': fields.Boolean()
})

story_model = api.model('Story', {
    'story_id': fields.Integer(readOnly=True),
    'quiz_id': fields.Integer(required=True),
    'title': fields.String(required=True),
    'author': fields.String(required=True),
    'text': fields.String(required=True)
})

story_put_model = api.model('StoryPut', {
    'quiz_id': fields.Integer(),
    'title': fields.String(),
    'author': fields.String(),
    'text': fields.String()
})
