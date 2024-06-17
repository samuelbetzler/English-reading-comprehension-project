package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "\"Quiz\"")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quiz_id")
    private Long quizId;
    @Column(name = "difficulty_level", nullable = false)
    private String difficultyLevel;


    @Column(name = "title", nullable = false)
    private String title;

    public Long getId() {
        return quizId;
    }
    public void setId(Long id) {
        this.quizId = id;
    }

    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }
    public String getDifficultyLevel() {
        return difficultyLevel;
    }
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
