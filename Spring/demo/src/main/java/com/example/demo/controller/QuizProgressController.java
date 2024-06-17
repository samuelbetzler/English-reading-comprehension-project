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

import com.example.demo.model.Quiz;
import com.example.demo.model.QuizAttempt;
import com.example.demo.model.QuizProgress;
import com.example.demo.service.QuizProgressService;

@RestController
@RequestMapping("/api/quizProgresses")
public class QuizProgressController {

    @Autowired
    private QuizProgressService quizProgressService;

    @GetMapping
    public List<QuizProgress> getAllQuizProgresses() {
        return quizProgressService.getAllQuizProgresses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuizProgress> getQuizProgressById(@PathVariable Long id) {
        QuizProgress quizProgress = quizProgressService.getQuizProgressById(id);
        if (quizProgress != null) {
            return ResponseEntity.ok(quizProgress);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping
    public QuizProgress createQuizProgress(@RequestBody QuizProgress quizProgress) {
        return quizProgressService.createQuizProgress(quizProgress);
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuizProgress> updateQuizProgress(@PathVariable Long id, @RequestBody QuizProgress newQuizProgress) {
        QuizProgress updatedQuizProgress = quizProgressService.updateQuizProgress(newQuizProgress);
        if (updatedQuizProgress != null) {
            return ResponseEntity.ok(updatedQuizProgress);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuizProgress(@PathVariable Long id) {
        quizProgressService.deleteQuizProgress(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/attempt/{attemptId}")
    public List<QuizProgress> getQuizProgressesByAttempt(@PathVariable Long attemptId) {
        QuizAttempt attempt = new QuizAttempt();
        attempt.setId(attemptId);
        return quizProgressService.getQuizProgressesByAttempt(attempt);
    }

    @GetMapping("/quiz/{quizId}")
    public List<QuizProgress> getQuizProgressesByQuiz(@PathVariable Long quizId) {
        Quiz quiz = new Quiz();
        quiz.setId(quizId);
        return quizProgressService.getQuizProgressesByQuiz(quiz);
    }

    @GetMapping("/completed/{completed}")
    public List<QuizProgress> getCompletedQuizProgresses(@PathVariable Integer completed) {
        return quizProgressService.getCompletedQuizProgresses(completed);
    }

    @GetMapping("/score/{score}")
    public List<QuizProgress> getQuizProgressesByScore(@PathVariable Integer score) {
        return quizProgressService.getQuizProgressesByScore(score);
    }
}
