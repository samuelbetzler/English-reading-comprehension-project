package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.QuestionDTO;
import com.example.demo.model.Questions;
import com.example.demo.service.QuestionsService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/questions")
public class QuestionsController {

    @Autowired
    private QuestionsService questionsService;

    @GetMapping
    public List<Questions> getAllQuestions() {
        return questionsService.getAllQuestions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Questions> getQuestionById(@PathVariable Long id) {
        Questions question = questionsService.getQuestionById(id);
        if (question != null) {
            return ResponseEntity.ok(question);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

   @PostMapping
    public ResponseEntity<QuestionDTO> createQuestion(@Valid @RequestBody QuestionDTO questionDTO) {
        QuestionDTO createdQuestion = questionsService.createQuestion(questionDTO);
        if (createdQuestion != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdQuestion);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuestionDTO> updateQuestion(@PathVariable Long id, @Valid @RequestBody QuestionDTO questionDTO) {
        questionDTO.setQuestionId(id); // Set the ID from the path variable
        QuestionDTO updatedQuestion = questionsService.updateQuestion(questionDTO);
        if (updatedQuestion != null) {
            return ResponseEntity.ok(updatedQuestion);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionsService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
}
