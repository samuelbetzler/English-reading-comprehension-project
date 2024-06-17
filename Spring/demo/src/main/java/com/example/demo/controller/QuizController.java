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

import com.example.demo.dto.QuizDTO;
import com.example.demo.model.Quiz;
import com.example.demo.service.QuizService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        List<Quiz> quizzes = quizService.getAllQuizzes();
        return ResponseEntity.ok(quizzes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id) {
        Quiz quiz = quizService.getQuizById(id);
        if (quiz != null) {
            return ResponseEntity.ok(quiz);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

     @PostMapping
    public ResponseEntity<QuizDTO> createQuiz(@Valid @RequestBody QuizDTO quizDTO) {
        QuizDTO createdQuizDTO = quizService.createQuiz(quizDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdQuizDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuizDTO> updateQuiz(@PathVariable Long id, @Valid @RequestBody QuizDTO quizDTO) {
        // Set the ID from the path variable to ensure the correct quiz is updated
        quizDTO.setQuizId(id);
        
        QuizDTO updatedQuizDTO = quizService.updateQuiz(quizDTO);
        if (updatedQuizDTO != null) {
            return ResponseEntity.ok(updatedQuizDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {
        quizService.deleteQuiz(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/difficulty/{level}")
    public ResponseEntity<List<Quiz>> getQuizzesByDifficultyLevel(@PathVariable String level) {
        List<Quiz> quizzes = quizService.getQuizzesByDifficultyLevel(level);
        return ResponseEntity.ok(quizzes);
    }

    @GetMapping("/title/{title}")
    public ResponseEntity<Quiz> getQuizByTitle(@PathVariable String title) {
        Quiz quiz = quizService.getQuizByTitle(title);
        if (quiz != null) {
            return ResponseEntity.ok(quiz);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
