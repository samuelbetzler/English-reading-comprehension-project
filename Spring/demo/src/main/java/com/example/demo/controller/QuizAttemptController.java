package com.example.demo.controller;

import java.util.Date;
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

import com.example.demo.model.Quiz;
import com.example.demo.model.QuizAttempt;
import com.example.demo.model.User;
import com.example.demo.service.QuizAttemptService;

@RestController
@RequestMapping("/api/quizAttempts")
public class QuizAttemptController {

    @Autowired
    private QuizAttemptService quizAttemptService;

    @GetMapping
    public List<QuizAttempt> getAllQuizAttempts() {
        return quizAttemptService.getAllQuizAttempts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuizAttempt> getQuizAttemptById(@PathVariable Long id) {
        QuizAttempt quizAttempt = quizAttemptService.getQuizAttemptById(id);
        if (quizAttempt != null) {
            return ResponseEntity.ok(quizAttempt);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping
    public QuizAttempt createQuizAttempt(@RequestBody QuizAttempt quizAttempt) {
        return quizAttemptService.createQuizAttempt(quizAttempt);
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuizAttempt> updateQuizAttempt(@PathVariable Long id, @RequestBody QuizAttempt newQuizAttempt) {
        QuizAttempt updatedQuizAttempt = quizAttemptService.updateQuizAttempt(newQuizAttempt);
        if (updatedQuizAttempt != null) {
            return ResponseEntity.ok(updatedQuizAttempt);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuizAttempt(@PathVariable Long id) {
        quizAttemptService.deleteQuizAttempt(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public List<QuizAttempt> getQuizAttemptsByUser(@PathVariable Long userId) {
        User user = new User();
        user.setId(userId);
        return quizAttemptService.getQuizAttemptsByUser(user);
    }

    @GetMapping("/quiz/{quizId}")
    public List<QuizAttempt> getQuizAttemptsByQuiz(@PathVariable Long quizId) {
        Quiz quiz = new Quiz();
        quiz.setId(quizId);
        return quizAttemptService.getQuizAttemptsByQuiz(quiz);
    }

    @GetMapping("/date/{date}")
    public List<QuizAttempt> getQuizAttemptsByDate(@PathVariable Date date) {
        return quizAttemptService.getQuizAttemptsByDate(date);
    }
}
