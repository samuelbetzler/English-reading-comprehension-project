package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.StoryDTO;
import com.example.demo.model.Story;
import com.example.demo.repository.StoryRepository;

@Service
public class StoryService {

    @Autowired
    private StoryRepository storyRepository;

    public Story createStory(StoryDTO storyDTO) {
        Story story = new Story();
        story.setQuizId(storyDTO.getQuizId());
        story.setTitle(storyDTO.getTitle());
        story.setAuthor(storyDTO.getAuthor());
        story.setText(storyDTO.getText());
        return storyRepository.save(story);
    }

    public Story getStoryById(Long id) {
        return storyRepository.findById(id).orElse(null);
    }

    public List<Story> getAllStories() {
        return storyRepository.findAll();
    }

    public Story updateStory(Long id, StoryDTO storyDTO) {
        Story existingStory = storyRepository.findById(id).orElse(null);
        if (existingStory != null) {
            existingStory.setQuizId(storyDTO.getQuizId());
            existingStory.setTitle(storyDTO.getTitle());
            existingStory.setAuthor(storyDTO.getAuthor());
            existingStory.setText(storyDTO.getText());
            return storyRepository.save(existingStory);
        } else {
            return null; // or throw an exception
        }
    }

    public void deleteStory(Long id) {
        storyRepository.deleteById(id);
    }

    public List<Story> getStoriesByQuizId(Long quizId) {
        return storyRepository.findByQuizId(quizId);
    }

    public Story getStoryByTitle(String title) {
        return storyRepository.findByTitle(title);
    }

    public Story getStoryByAuthor(String author) {
        return storyRepository.findByAuthor(author);
    }
}
