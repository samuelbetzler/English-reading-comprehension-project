package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Questions;

@Repository
public interface QuestionsRepository extends JpaRepository<Questions, Long> {
    List<Questions> findByText(String text);

    List<Questions> findByQuiz_QuizId(Long quizId);

    void deleteByText(String text);

    List<Questions> findAllByOrderByText();
}
