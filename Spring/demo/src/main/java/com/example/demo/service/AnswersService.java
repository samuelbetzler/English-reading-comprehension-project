package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.AnswerDTO;
import com.example.demo.model.Answers;
import com.example.demo.model.Questions;
import com.example.demo.repository.AnswersRepository;
import com.example.demo.repository.QuestionsRepository;

@Service
public class AnswersService {
@Autowired
private AnswersRepository answersRepository;
 @Autowired
private QuestionsRepository questionsRepository; // Add this line



public Answers getAnswerById(Long id) {
    return answersRepository.findById(id).orElse(null);
}

public List<Answers> getAllAnswers() {
    return answersRepository.findAll();
}
 // Convert a AnswerDTO to a Answers entity
    private Answers mapAnswerDTOToEntity(AnswerDTO answerDTO) {
        Answers answer = new Answers();
        answer.setId(answerDTO.getAnswerId());
        // Find the question entity based on the questionId provided in DTO
        Questions question = questionsRepository.findById(answerDTO.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found"));
        answer.setQuestion(question); // Set the question entity
        answer.setText(answerDTO.getText());
        answer.setIsCorrect(answerDTO.getIsCorrect());
        return answer;
    }

    // Convert a Answers entity to a AnswerDTO
    private AnswerDTO mapEntityToAnswerDTO(Answers answer) {
        AnswerDTO answerDTO = new AnswerDTO();
        answerDTO.setAnswerId(answer.getId());
        answerDTO.setQuestionId(answer.getQuestion().getId()); // Get the questionId from the question entity
        answerDTO.setText(answer.getText());
        answerDTO.setIsCorrect(answer.getIsCorrect());
        return answerDTO;
    }

    public AnswerDTO createAnswer(AnswerDTO answerDTO) {
        Answers answer = mapAnswerDTOToEntity(answerDTO);
        Answers savedAnswer = answersRepository.save(answer);
        return mapEntityToAnswerDTO(savedAnswer);
    }

    public AnswerDTO updateAnswer(Long id, AnswerDTO answerDTO) {
        return answersRepository.findById(id)
                .map(existingAnswer -> {
                    Questions question = questionsRepository.findById(answerDTO.getQuestionId())
                            .orElseThrow(() -> new RuntimeException("Question not found"));
                    existingAnswer.setQuestion(question); // Update the question entity
                    existingAnswer.setText(answerDTO.getText());
                    existingAnswer.setIsCorrect(answerDTO.getIsCorrect());
                    Answers updatedAnswer = answersRepository.save(existingAnswer);
                    return mapEntityToAnswerDTO(updatedAnswer);
                })
                .orElseGet(() -> {
                    // Handle the case where the answer doesn't exist
                    Answers newAnswer = mapAnswerDTOToEntity(answerDTO);
                    newAnswer.setId(id);
                    Answers savedNewAnswer = answersRepository.save(newAnswer);
                    return mapEntityToAnswerDTO(savedNewAnswer);
                });
    }


public void deleteAnswer(Long id) {
    answersRepository.deleteById(id);
}

public List<Answers> getAnswersByQuestionId(Long questionId) {
    return answersRepository.findByQuestion_QuestionId(questionId);
}

public List<Answers> getCorrectAnswers(Boolean isCorrect) {
    return answersRepository.findByIsCorrect(isCorrect);
}
}