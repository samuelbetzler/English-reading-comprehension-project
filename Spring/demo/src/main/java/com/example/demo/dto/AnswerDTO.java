package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class AnswerDTO {

    private Long answerId;

    @NotNull(message = "Question ID cannot be null")
    private Long questionId;

    @NotBlank(message = "Text is required")
    @Size(max = 255, message = "Text must be less than or equal to 255 characters")
    private String text;

    @NotNull(message = "IsCorrect flag cannot be null")
    private Boolean isCorrect;

    // Getters and setters
    public Long getAnswerId() {
        return answerId;
    }

    public void setAnswerId(Long answerId) {
        this.answerId = answerId;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Boolean getIsCorrect() {
        return isCorrect;
    }

    public void setIsCorrect(Boolean isCorrect) {
        this.isCorrect = isCorrect;
    }
}
