package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table; // Import the ManyToOne annotation

@Entity
@Table(name = "\"Questions\"")
public class Questions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long questionId;

    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @Column(name = "text", nullable = false)
    private String text;

    // Getters and setters...
    public Long getId() {
        return questionId; // Replace 'id' with 'questionId'
    }

    public void setId(Long id) {
        this.questionId = id; // Replace 'id' with 'questionId'
    }

    public Long getQuizId() {
        return questionId; // Replace 'quizId' with 'questionId'
    }

    public void setQuizId(Long quizId) {
        this.questionId = quizId; // Replace 'quizId' with 'questionId'
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }
}
