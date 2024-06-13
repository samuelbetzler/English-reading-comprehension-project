from flask_restx import Namespace, Resource, fields, api
from flask_jwt_extended import jwt_required, get_jwt_identity
from .api_models import *
from .models import db, User, Quiz, QuizAttempt, QuizProgress, Questions, Answers, Story
from flask import request
from .schemas import UserSchema, QuizSchema, QuizAttemptSchema, QuizProgressSchema, QuestionSchema, AnswerSchema, StorySchema

authorizations = {
    'apikey': {
        'type': 'apiKey',
        'in': 'header',
        'name': 'Authorization'
    }
}

user_ns = Namespace('user', description='Operaciones relacionadas con usuarios', authorizations=authorizations)
quiz_ns = Namespace('quiz', description='Operaciones relacionadas con cuestionarios')
attempt_ns = Namespace('attempt', description='Operaciones relacionadas con intentos de cuestionarios')
progress_ns = Namespace('progress', description='Operaciones relacionadas con el progreso de cuestionarios')
question_ns = Namespace('question', description='Operaciones relacionadas con preguntas')
answer_ns = Namespace('answer', description='Operaciones relacionadas con respuestas')
story_ns = Namespace('story', description='Operaciones relacionadas con historias')


@user_ns.route('/')
class UserList(Resource):
    method_decorators = [jwt_required()]
    @api.doc(security='apikey')
    @user_ns.marshal_list_with(user_model)
    def get(self):
        users = User.query.all()
        return users
    
    method_decorators = [jwt_required()]
    @api.doc(security='apikey')
    @user_ns.expect(user_put_model)
    @user_ns.marshal_with(user_put_model, code=201)
    def post(self):
        data = request.json
        user_schema = UserSchema()
        errors = user_schema.validate(data)
        if errors:
            return errors, 400
        new_user = User(username=data['username'], email=data['email'], password=data['password'])
        db.session.add(new_user)
        db.session.commit()
        return new_user, 201

@user_ns.route('/<int:user_id>')
class UserDetail(Resource):
    @user_ns.marshal_with(user_model)
    def get(self, user_id):
        user = User.query.get_or_404(user_id)
        return user

    @user_ns.expect(user_put_model)
    @user_ns.marshal_with(user_model)
    def put(self, user_id):
        user = User.query.get_or_404(user_id)
        data = request.json
        user_schema = UserSchema()
        errors = user_schema.validate(data)
        if errors:
            return errors, 400
        user.username = data['username']
        user.email = data['email']
        user.password = data['password']
        db.session.commit()
        return user

    def delete(self, user_id):
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return '', 204

@quiz_ns.route('/')
class QuizList(Resource):
    @quiz_ns.marshal_list_with(quiz_model)
    def get(self):
        quizzes = Quiz.query.all()
        return quizzes

    @quiz_ns.expect(quiz_put_model)
    @quiz_ns.marshal_with(quiz_put_model, code=201)
    def post(self):
        data = request.json
        quiz_schema = QuizSchema()
        errors = quiz_schema.validate(data)
        if errors:
            return errors, 400
        new_quiz = Quiz(
            difficulty_level=data['difficulty_level'],
            title=data['title']
        )
        db.session.add(new_quiz)
        db.session.commit()
        return new_quiz, 201

@quiz_ns.route('/<int:quiz_id>')
class QuizDetail(Resource):
    @quiz_ns.marshal_with(quiz_model)
    def get(self, quiz_id):
        quiz = Quiz.query.get_or_404(quiz_id)
        return quiz

    @quiz_ns.expect(quiz_put_model)
    @quiz_ns.marshal_with(quiz_model)
    def put(self, quiz_id):
        quiz = Quiz.query.get_or_404(quiz_id)
        data = request.json
        errors = QuizSchema.validate(data, partial=True)
        if errors:
            return errors, 400
        quiz.difficulty_level = data['difficulty_level']
        quiz.title = data['title']
        db.session.commit()
        return quiz

    def delete(self, quiz_id):
        quiz = Quiz.query.get_or_404(quiz_id)
        db.session.delete(quiz)
        db.session.commit()
        return '', 204

@attempt_ns.route('/')
class QuizAttemptList(Resource):
    @attempt_ns.marshal_list_with(attempt_model)
    def get(self):
        attempts = QuizAttempt.query.all()
        return attempts

    @attempt_ns.expect(attempt_model)
    @attempt_ns.marshal_with(attempt_model, code=201)
    def post(self):
        data = request.json
        errors = QuizAttemptSchema.validate(data)
        if errors:
            return errors, 400
        new_attempt = QuizAttempt(
            user_id=data['user_id'],
            quiz_id=data['quiz_id'],
            date=data['date'],
            score=data['score']
        )
        db.session.add(new_attempt)
        db.session.commit()
        return new_attempt, 201

@attempt_ns.route('/<int:attempt_id>')
class QuizAttemptDetail(Resource):
    @attempt_ns.marshal_with(attempt_model)
    def get(self, attempt_id):
        attempt = QuizAttempt.query.get_or_404(attempt_id)
        return attempt

    @attempt_ns.expect(attempt_put_model)
    @attempt_ns.marshal_with(attempt_model)
    def put(self, attempt_id):
        attempt = QuizAttempt.query.get_or_404(attempt_id)
        data = request.json
        errors = QuizAttemptSchema.validate(data, partial=True)
        if errors:
            return errors, 400
        attempt.user_id = data['user_id']
        attempt.quiz_id = data['quiz_id']
        attempt.date = data['date']
        attempt.score = data['score']
        db.session.commit()
        return attempt

    def delete(self, attempt_id):
        attempt = QuizAttempt.query.get_or_404(attempt_id)
        db.session.delete(attempt)
        db.session.commit()
        return '', 204

@progress_ns.route('/')
class QuizProgressList(Resource):
    @progress_ns.marshal_list_with(progress_model)
    def get(self):
        progress = QuizProgress.query.all()
        return progress

    @progress_ns.expect(progress_model)
    @progress_ns.marshal_with(progress_model, code=201)
    def post(self):
        data = request.json
        errors = QuizProgressSchema.validate(data)
        if errors:
            return errors, 400
        new_progress = QuizProgress(
            attempt_id=data['attempt_id'],
            quiz_id=data['quiz_id'],
            completed=data['completed'],
            score=data['score']
        )
        db.session.add(new_progress)
        db.session.commit()
        return new_progress, 201

@progress_ns.route('/<int:progress_id>')
class QuizProgressDetail(Resource):
    @progress_ns.marshal_with(progress_model)
    def get(self, progress_id):
        progress = QuizProgress.query.get_or_404(progress_id)
        return progress

    @progress_ns.expect(progress_put_model)
    @progress_ns.marshal_with(progress_model)
    def put(self, progress_id):
        progress = QuizProgress.query.get_or_404(progress_id)
        data = request.json
        errors = QuizProgressSchema.validate(data, partial=True)
        if errors:
            return errors, 400
        progress.attempt_id = data['attempt_id']
        progress.quiz_id = data['quiz_id']
        progress.completed = data['completed']
        progress.score = data['score']
        db.session.commit()
        return progress

    def delete(self, progress_id):
        progress = QuizProgress.query.get_or_404(progress_id)
        db.session.delete(progress)
        db.session.commit()
        return '', 204

@question_ns.route('/')
class QuestionList(Resource):
    @question_ns.marshal_list_with(question_model)
    def get(self):
        questions = Questions.query.all()
        return questions

    @question_ns.expect(question_model)
    @question_ns.marshal_with(question_model, code=201)
    def post(self):
        data = request.json
        errors = QuestionSchema.validate(data)
        if errors:
            return errors, 400
        new_question = Questions(
            quiz_id=data['quiz_id'],
            text=data['text']
        )
        db.session.add(new_question)
        db.session.commit()
        return new_question, 201

@question_ns.route('/<int:question_id>')
class QuestionDetail(Resource):
    @question_ns.marshal_with(question_model)
    def get(self, question_id):
        question = Questions.query.get_or_404(question_id)
        return question

    @question_ns.expect(question_put_model)
    @question_ns.marshal_with(question_model)
    def put(self, question_id):
        question = Questions.query.get_or_404(question_id)
        data = request.json
        errors = QuestionSchema.validate(data, partial=True)
        if errors:
            return errors, 400
        question.quiz_id = data['quiz_id']
        question.text = data['text']
        db.session.commit()
        return question

    def delete(self, question_id):
        question = Questions.query.get_or_404(question_id)
        db.session.delete(question)
        db.session.commit()
        return '', 204
    
@answer_ns.route('/')
class AnswerList(Resource):
    @answer_ns.marshal_list_with(answer_model)
    def get(self):
        answers = Answers.query.all()
        return answers

    @answer_ns.expect(answer_model)
    @answer_ns.marshal_with(answer_model, code=201)
    def post(self):
        data = request.json
        errors = AnswerSchema.validate(data)
        if errors:
            return errors, 400
        new_answer = Answers(
            question_id=data['question_id'],
            text=data['text'],
            is_correct=data['is_correct']
        )
        db.session.add(new_answer)
        db.session.commit()
        return new_answer, 201

@answer_ns.route('/<int:answer_id>')
class AnswerDetail(Resource):
    @answer_ns.marshal_with(answer_model)
    def get(self, answer_id):
        answer = Answers.query.get_or_404(answer_id)
        return answer

    @answer_ns.expect(answer_put_model)
    @answer_ns.marshal_with(answer_model)
    def put(self, answer_id):
        answer = Answers.query.get_or_404(answer_id)
        data = request.json
        errors = AnswerSchema.validate(data, partial=True)
        if errors:
            return errors, 400
        answer.question_id = data['question_id']
        answer.text = data['text']
        answer.is_correct = data['is_correct']
        db.session.commit()
        return answer

    def delete(self, answer_id):
        answer = Answers.query.get_or_404(answer_id)
        db.session.delete(answer)
        db.session.commit()
        return '', 204

@story_ns.route('/')
class StoryList(Resource):
    @story_ns.marshal_list_with(story_model)
    def get(self):
        stories = Story.query.all()
        return stories

    @story_ns.expect(story_model)
    @story_ns.marshal_with(story_model, code=201)
    def post(self):
        data = request.json
        errors = StorySchema.validate(data)
        if errors:
            return errors, 400
        new_story = Story(
            quiz_id=data['quiz_id'],
            title=data['title'],
            author=data['author'],
            text=data['text']
        )
        db.session.add(new_story)
        db.session.commit()
        return new_story, 201

@story_ns.route('/<int:story_id>')
class StoryDetail(Resource):
    @story_ns.marshal_with(story_model)
    def get(self, story_id):
        story = Story.query.get_or_404(story_id)
        return story

    @story_ns.expect(story_put_model)
    @story_ns.marshal_with(story_model)
    def put(self, story_id):
        story = Story.query.get_or_404(story_id)
        data = request.json
        errors = StorySchema.validate(data, partial=True)
        if errors:
            return errors, 400
        story.quiz_id = data['quiz_id']
        story.title = data['title']
        story.author = data['author']
        story.text = data['text']
        db.session.commit()
        return story

    def delete(self, story_id):
        story = Story.query.get_or_404(story_id)
        db.session.delete(story)
        db.session.commit()
        return '', 204
