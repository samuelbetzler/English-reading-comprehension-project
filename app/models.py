from .extensions import db

class User(db.Model):
    __tablename__ = 'User'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text)
    email = db.Column(db.Text)
    password = db.Column(db.Text)

class Quiz(db.Model):
    __tablename__ = 'Quiz'
    quiz_id = db.Column(db.Integer, primary_key=True)
    difficulty_level = db.Column(db.Text)
    title = db.Column(db.Text)

class QuizAttempt(db.Model):
    __tablename__ = 'QuizAttempt'
    attempt_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.user_id'))
    quiz_id = db.Column(db.Integer, db.ForeignKey('Quiz.quiz_id'))
    date = db.Column(db.Date)
    score = db.Column(db.Integer)
    user = db.relationship('User', backref='quiz_attempts')
    quiz = db.relationship('Quiz', backref='quiz_attempts')

class QuizProgress(db.Model):
    __tablename__ = 'QuizProgress'
    progress_id = db.Column(db.Integer, primary_key=True)
    attempt_id = db.Column(db.Integer, db.ForeignKey('QuizAttempt.attempt_id'))
    quiz_id = db.Column(db.Integer, db.ForeignKey('Quiz.quiz_id'))
    completed = db.Column(db.Integer)
    score = db.Column(db.Integer)
    quiz_attempt = db.relationship('QuizAttempt', backref='quiz_progress')
    quiz = db.relationship('Quiz', backref='quiz_progress')

class Questions(db.Model):
    __tablename__ = 'Questions'
    question_id = db.Column(db.Integer, primary_key=True)
    quiz_id = db.Column(db.Integer, db.ForeignKey('Quiz.quiz_id'))
    text = db.Column(db.Text)
    quiz = db.relationship('Quiz', backref='questions')

class Answers(db.Model):
    __tablename__ = 'Answers'
    answer_id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('Questions.question_id'))
    text = db.Column(db.Text)
    is_correct = db.Column(db.Integer)
    question = db.relationship('Questions', backref='answers')

class Story(db.Model):
    __tablename__ = 'Story'
    story_id = db.Column(db.Integer, primary_key=True)
    quiz_id = db.Column(db.Integer, db.ForeignKey('Quiz.quiz_id'))
    title = db.Column(db.Text)
    author = db.Column(db.Text)
    text = db.Column(db.Text)
    quiz = db.relationship('Quiz', backref='story')