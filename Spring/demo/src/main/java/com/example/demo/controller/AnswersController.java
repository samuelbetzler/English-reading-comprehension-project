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

import com.example.demo.dto.AnswerDTO;
import com.example.demo.model.Answers;
import com.example.demo.service.AnswersService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/answers")
public class AnswersController {

    @Autowired
    private AnswersService answersService;

   

    @GetMapping("/{id}")
    public Answers getAnswerById(@PathVariable Long id) {
        return answersService.getAnswerById(id);
    }

    @GetMapping
    public List<Answers> getAllAnswers() {
        return answersService.getAllAnswers();
    }
    @PostMapping
    public ResponseEntity<AnswerDTO> createAnswer( @Valid @RequestBody AnswerDTO answerDTO) {
        AnswerDTO createdAnswer = answersService.createAnswer(answerDTO);
        return new ResponseEntity<>(createdAnswer, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnswerDTO> updateAnswer( @PathVariable Long id, @Valid @RequestBody AnswerDTO answerDTO) {
        AnswerDTO updatedAnswer = answersService.updateAnswer(id, answerDTO);
        return new ResponseEntity<>(updatedAnswer, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void deleteAnswer(@PathVariable Long id) {
        answersService.deleteAnswer(id);
    }

    @GetMapping("/question/{questionId}")
    public List<Answers> getAnswersByQuestionId(@PathVariable Long questionId) {
        return answersService.getAnswersByQuestionId(questionId);
    }

    @GetMapping("/correct/{isCorrect}")
    public List<Answers> getAnswersByIsCorrect(@PathVariable Boolean isCorrect) {
        return answersService.getCorrectAnswers(isCorrect);
    }
}
