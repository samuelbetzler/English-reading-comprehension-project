package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.QuestionDTO;
import com.example.demo.model.Questions;
import com.example.demo.model.Quiz;
import com.example.demo.repository.QuestionsRepository;

@Service
public class QuestionsService {

    @Autowired
    private QuestionsRepository questionsRepository;
    @Autowired
    private QuizService quizService; // Inject QuizService
   
    public Questions getQuestionById(Long id) {
        return questionsRepository.findById(id).orElse(null);
    }

    public List<Questions> getAllQuestions() {
        return questionsRepository.findAll();
    }
      public QuestionDTO createQuestion(QuestionDTO questionDTO) {
        Questions question = convertToEntity(questionDTO);
        Questions savedQuestion = questionsRepository.save(question);
        return convertToDTO(savedQuestion);
    }

    public QuestionDTO updateQuestion(QuestionDTO questionDTO) {
        Questions question = convertToEntity(questionDTO);
        Questions updatedQuestion = questionsRepository.save(question);
        return convertToDTO(updatedQuestion);
    }

    // Helper method to convert DTO to entity
    private Questions convertToEntity(QuestionDTO questionDTO) {
        Questions question = new Questions();
        if (questionDTO.getQuestionId() != null) {
            question.setId(questionDTO.getQuestionId());
        }
        // You need to set the Quiz entity here. Assuming you have a method to get it.
        Quiz quiz = quizService.getQuizById(questionDTO.getQuizId());
        question.setQuiz(quiz);
        question.setText(questionDTO.getText());
        return question;
    }

    // Helper method to convert entity to DTO
    private QuestionDTO convertToDTO(Questions question) {
        QuestionDTO questionDTO = new QuestionDTO();
        questionDTO.setQuestionId(question.getId());
        questionDTO.setQuizId(question.getQuiz().getId()); // Assuming your Quiz entity has a getId() method.
        questionDTO.setText(question.getText());
        return questionDTO;
    }

    public void deleteQuestion(Long id) {
        questionsRepository.deleteById(id);
    }
}
