package com.example.demo.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Quiz;
import com.example.demo.model.QuizAttempt;
import com.example.demo.model.User;
import com.example.demo.repository.QuizAttemptRepository;

@Service
public class QuizAttemptService {

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    public List<QuizAttempt> getAllQuizAttempts() {
        return quizAttemptRepository.findAll();
    }

    public QuizAttempt getQuizAttemptById(Long id) {
        return quizAttemptRepository.findById(id).orElse(null);
    }

    public QuizAttempt createQuizAttempt(QuizAttempt quizAttempt) {
        return quizAttemptRepository.save(quizAttempt);
    }

    public QuizAttempt updateQuizAttempt(QuizAttempt quizAttempt) {
        return quizAttemptRepository.save(quizAttempt);
    }

    public void deleteQuizAttempt(Long id) {
        quizAttemptRepository.deleteById(id);
    }

    public List<QuizAttempt> getQuizAttemptsByUser(User user) {
        return quizAttemptRepository.findByUser(user);
    }

    public List<QuizAttempt> getQuizAttemptsByQuiz(Quiz quiz) {
        return quizAttemptRepository.findByQuiz(quiz);
    }

    public List<QuizAttempt> getQuizAttemptsByDate(Date date) {
        return quizAttemptRepository.findByDate(date);
    }
}
