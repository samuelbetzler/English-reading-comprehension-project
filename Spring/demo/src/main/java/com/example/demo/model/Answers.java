package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "\"Answers\"")
public class Answers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_id")
    private Long answerId;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Questions question;

    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "is_correct", nullable = false)
    private Boolean isCorrect;
    // Getters and setters...
    public Long getId() {
        return answerId;
    }

    public void setId(Long id) {
        this.answerId = id;
    }

    public Long getQuestionId() {
        return question.getId();
    }

    public void setQuestionId(Long questionId) {
        this.question.setId(questionId);
    }

    public Boolean getIsCorrect() {
        return isCorrect;
    }

    public void setIsCorrect(Boolean isCorrect) {
        this.isCorrect = isCorrect;
    }

    public void setQuestion(Questions question) {
        this.question = question;
    }
    
    public void setText(String text) {
        this.text = text;
    }
    
    // Also, make sure you have the corresponding getters
    public Questions getQuestion() {
        return question;
    }
    
    public String getText() {
        return text;
    }
    
}
