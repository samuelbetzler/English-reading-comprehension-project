from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ProjectoFlaskbd.db'
db = SQLAlchemy(app)

# Define SQLAlchemy models (User, Quiz, QuizAttempt, QuizProgress, Questions, Answers, Story)

# User Management Endpoints
@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.json
    new_user = User(username=data['username'], email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login_user():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and user.password == data['password']:
        return jsonify({'message': 'Login successful', 'user_id': user.user_id})
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({'user_id': user.user_id, 'username': user.username, 'email': user.email})
    else:
        return jsonify({'error': 'User not found'}), 404

@app.route('/api/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    user = User.query.get(user_id)
    if user:
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.password = data.get('password', user.password)
        db.session.commit()
        return jsonify({'message': 'User details updated successfully'})
    else:
        return jsonify({'error': 'User not found'}), 404

# Quiz Endpoints
@app.route('/api/quizzes', methods=['GET'])
def get_quizzes():
    quizzes = Quiz.query.all()
    quiz_list = [{'quiz_id': quiz.quiz_id, 'title': quiz.title, 'difficulty_level': quiz.difficulty_level} for quiz in quizzes]
    return jsonify({'quizzes': quiz_list})

@app.route('/api/quiz/<int:quiz_id>', methods=['GET'])
def get_quiz_details(quiz_id):
    quiz = Quiz.query.get(quiz_id)
    if quiz:
        questions = Question.query.filter_by(quiz_id=quiz_id).all()
        question_list = [{'question_id': question.question_id, 'text': question.text} for question in questions]
        return jsonify({'quiz_id': quiz.quiz_id, 'title': quiz.title, 'questions': question_list})
    else:
        return jsonify({'error': 'Quiz not found'}), 404

@app.route('/api/quizzes/<int:quiz_id>/attempts', methods=['POST'])
def start_quiz_attempt(quiz_id):
    data = request.json
    user_id = data.get('user_id')
    if user_id is None:
        return jsonify({'error': 'User ID is required'}), 400

    new_attempt = QuizAttempt(user_id=user_id, quiz_id=quiz_id)
    db.session.add(new_attempt)
    db.session.commit()

    return jsonify({'message': 'Quiz attempt started successfully', 'attempt_id': new_attempt.attempt_id}), 201

@app.route('/api/attempts/<int:attempt_id>/submit', methods=['POST'])
def submit_quiz_answers(attempt_id):
    answers = request.json.get('answers')
    if answers is None:
        return jsonify({'error': 'Answers are required'}), 400

    score = calculate_score(answers)  # Implementing scoring logic

    quiz_attempt = QuizAttempt.query.get(attempt_id)
    if quiz_attempt:
        quiz_attempt.score = score
        db.session.commit()
        return jsonify({'message': 'Quiz answers submitted successfully', 'score': score})
    else:
        return jsonify({'error': 'Quiz attempt not found'}), 404

# Helper function to calculate score 
def calculate_score(answers):
    return sum(answer['is_correct'] for answer in answers)

if __name__ == '__main__':
    app.run(debug=True)
