package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Story;

@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {

    List<Story> findByQuizId(Long quizId);

    Story findByTitle(String title);

    Story findByAuthor(String author);
}

