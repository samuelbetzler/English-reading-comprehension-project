package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.QuizDTO;
import com.example.demo.model.Quiz;
import com.example.demo.repository.QuizRepository;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id).orElse(null);
    }

    public QuizDTO createQuiz(QuizDTO quizDTO) {
        Quiz quiz = convertToEntity(quizDTO);
        Quiz savedQuiz = quizRepository.save(quiz);
        return convertToDTO(savedQuiz);
    }

    public QuizDTO updateQuiz(QuizDTO quizDTO) {
        Quiz quiz = convertToEntity(quizDTO);
        Quiz updatedQuiz = quizRepository.save(quiz);
        return convertToDTO(updatedQuiz);
    }

    // Helper method to convert DTO to entity
    private Quiz convertToEntity(QuizDTO quizDTO) {
        Quiz quiz = new Quiz();
        if (quizDTO.getQuizId() != null) {
            quiz.setId(quizDTO.getQuizId());
        }
        quiz.setDifficultyLevel(quizDTO.getDifficultyLevel());
        quiz.setTitle(quizDTO.getTitle());
        return quiz;
    }

    // Helper method to convert entity to DTO
    private QuizDTO convertToDTO(Quiz quiz) {
        QuizDTO quizDTO = new QuizDTO();
        quizDTO.setQuizId(quiz.getId());
        quizDTO.setDifficultyLevel(quiz.getDifficultyLevel());
        quizDTO.setTitle(quiz.getTitle());
        return quizDTO;
    }
    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }

    public List<Quiz> getQuizzesByDifficultyLevel(String difficultyLevel) {
        return quizRepository.findByDifficultyLevel(difficultyLevel);
    }

    public Quiz getQuizByTitle(String title) {
        return quizRepository.findByTitle(title);
    }
}
