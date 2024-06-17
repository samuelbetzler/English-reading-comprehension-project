package com.example.demo.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class QuizDTO {

    private Long quizId;

    @NotNull(message = "Difficulty level cannot be null")
    @Size(min = 1, max = 50, message = "Difficulty level must be between 1 and 50 characters")
    private String difficultyLevel;

    @NotNull(message = "Title cannot be null")
    @Size(min = 1, max = 100, message = "Title must be between 1 and 100 characters")
    private String title;

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public String getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
