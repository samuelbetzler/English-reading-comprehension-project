package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class QuestionDTO {

    private Long questionId;

    @NotNull(message = "Quiz ID cannot be null")
    private Long quizId;

    @NotBlank(message = "Question text cannot be blank")
    @Size(min = 1, max = 255, message = "Question text must be between 1 and 255 characters")
    private String text;

    // Getters and setters
    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
