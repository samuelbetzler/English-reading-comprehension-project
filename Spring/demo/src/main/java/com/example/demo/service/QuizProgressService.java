package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Quiz;
import com.example.demo.model.QuizAttempt;
import com.example.demo.model.QuizProgress;
import com.example.demo.repository.QuizProgressRepository; // Import the Quiz class

@Service
public class QuizProgressService {

    @Autowired
    private QuizProgressRepository quizProgressRepository;

    public List<QuizProgress> getAllQuizProgresses() {
        return quizProgressRepository.findAll();
    }

    public QuizProgress getQuizProgressById(Long id) {
        return quizProgressRepository.findById(id).orElse(null);
    }

    public QuizProgress createQuizProgress(QuizProgress quizProgress) {
        return quizProgressRepository.save(quizProgress);
    }

    public QuizProgress updateQuizProgress(QuizProgress quizProgress) {
        return quizProgressRepository.save(quizProgress);
    }

    public void deleteQuizProgress(Long id) {
        quizProgressRepository.deleteById(id);
    }

    public List<QuizProgress> getQuizProgressesByAttempt(QuizAttempt attempt) {
        return quizProgressRepository.findByAttempt(attempt);
    }

    public List<QuizProgress> getQuizProgressesByQuiz(Quiz quiz) {
        return quizProgressRepository.findByQuiz(quiz);
    }

    public List<QuizProgress> getCompletedQuizProgresses(Integer completed) {
        return quizProgressRepository.findByCompleted(completed);
    }

    public List<QuizProgress> getQuizProgressesByScore(Integer score) {
        return quizProgressRepository.findByScore(score);
    }
}
