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

import com.example.demo.dto.StoryDTO;
import com.example.demo.model.Story;
import com.example.demo.service.StoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/stories")
public class StoryController {

    @Autowired
    private StoryService storyService;

    @GetMapping
    public List<Story> getAllStories() {
        return storyService.getAllStories();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Story> getStoryById(@PathVariable Long id) {
        Story story = storyService.getStoryById(id);
        if (story != null) {
            return ResponseEntity.ok(story);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<Story> createStory(@Valid @RequestBody StoryDTO storyDTO) {
        Story createdStory = storyService.createStory(storyDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Story> updateStory(@PathVariable Long id,@Valid @RequestBody StoryDTO storyDTO) {
        Story updatedStory = storyService.updateStory(id, storyDTO);
        if (updatedStory != null) {
            return ResponseEntity.ok(updatedStory);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStory(@PathVariable Long id) {
        storyService.deleteStory(id);
        return ResponseEntity.noContent().build();
    }
}
