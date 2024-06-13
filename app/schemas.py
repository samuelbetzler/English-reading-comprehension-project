from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    user_id = fields.Int(dump_only=True)
    username = fields.Str(required=True, validate=validate.Length(min=1))
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=6))
    
class QuizSchema(Schema):
    quiz_id = fields.Int(dump_only=True)
    difficulty_level = fields.Str(required=True, validate=validate.Length(min=1))
    title = fields.Str(required=True, validate=validate.Length(min=1))

class QuizAttemptSchema(Schema):
    attempt_id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    quiz_id = fields.Int(required=True)
    date = fields.Date(required=True)
    score = fields.Int()

class QuizProgressSchema(Schema):
    progress_id = fields.Int(dump_only=True)
    attempt_id = fields.Int(required=True)
    quiz_id = fields.Int(required=True)
    completed = fields.Bool(required=True)
    score = fields.Int()

class QuestionSchema(Schema):
    question_id = fields.Int(dump_only=True)
    quiz_id = fields.Int(required=True)
    text = fields.Str(required=True, validate=validate.Length(min=1))

class AnswerSchema(Schema):
    answer_id = fields.Int(dump_only=True)
    question_id = fields.Int(required=True)
    text = fields.Str(required=True, validate=validate.Length(min=1))
    is_correct = fields.Bool(required=True)

class StorySchema(Schema):
    story_id = fields.Int(dump_only=True)
    quiz_id = fields.Int(required=True)
    title = fields.Str(required=True, validate=validate.Length(min=1))
    author = fields.Str(required=True, validate=validate.Length(min=1))
    text = fields.Str(required=True, validate=validate.Length(min=1))
