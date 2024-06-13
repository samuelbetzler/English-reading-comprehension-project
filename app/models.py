from .extensions import db

class User(db.Model):
    __tablename__ = 'User'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)

class Quiz(db.Model):
    __tablename__ = 'Quiz'
    quiz_id = db.Column(db.Integer, primary_key=True)
    difficulty_level = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)

class QuizAttempt(db.Model):
    __tablename__ = 'QuizAttempt'
    attempt_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.user_id'), nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('Quiz.quiz_id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    score = db.Column(db.Integer)
    user = db.relationship('User', backref=db.backref('quiz_attempts', lazy=True))
    quiz = db.relationship('Quiz', backref=db.backref('quiz_attempts', lazy=True))

class QuizProgress(db.Model):
    __tablename__ = 'QuizProgress'
    progress_id = db.Column(db.Integer, primary_key=True)
    attempt_id = db.Column(db.Integer, db.ForeignKey('QuizAttempt.attempt_id'), nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('Quiz.quiz_id'), nullable=False)
    completed = db.Column(db.Integer, nullable=False)
    score = db.Column(db.Integer)
    quiz_attempt = db.relationship('QuizAttempt', backref=db.backref('quiz_progress', lazy=True))
    quiz = db.relationship('Quiz', backref=db.backref('quiz_progress', lazy=True))

class Questions(db.Model):
    __tablename__ = 'Questions'
    question_id = db.Column(db.Integer, primary_key=True)
    quiz_id = db.Column(db.Integer, db.ForeignKey('Quiz.quiz_id'), nullable=False)
    text = db.Column(db.String, nullable=False)
    quiz = db.relationship('Quiz', backref=db.backref('questions', lazy=True))

class Answers(db.Model):
    __tablename__ = 'Answers'
    answer_id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('Questions.question_id'), nullable=False)
    text = db.Column(db.String, nullable=False)
    is_correct = db.Column(db.Boolean, nullable=False)
    question = db.relationship('Questions', backref=db.backref('answers', lazy=True))

class Story(db.Model):
    __tablename__ = 'Story'
    story_id = db.Column(db.Integer, primary_key=True)
    quiz_id = db.Column(db.Integer, db.ForeignKey('Quiz.quiz_id'), nullable=False)
    title = db.Column(db.String, nullable=False)
    author = db.Column(db.String, nullable=False)
    text = db.Column(db.String, nullable=False)
    quiz = db.relationship('Quiz', backref=db.backref('story', lazy=True))
