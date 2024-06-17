package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class StoryDTO {

    private Long storyId; // Optional, depending on whether you want to expose this in the DTO

    @NotNull(message = "Quiz ID cannot be null")
    private Long quizId;

    @NotBlank(message = "Title is required")
    @Size(max = 100, message = "Title must be less than 100 characters")
    private String title;

    @NotBlank(message = "Author is required")
    @Size(max = 100, message = "Author must be less than 100 characters")
    private String author;

    @NotBlank(message = "Text is required")
    private String text;

    // Getters
    public Long getStoryId() {
        return storyId;
    }

    public Long getQuizId() {
        return quizId;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String getText() {
        return text;
    }

    // Setters
    public void setStoryId(Long storyId) {
        this.storyId = storyId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setText(String text) {
        this.text = text;
    }
}
