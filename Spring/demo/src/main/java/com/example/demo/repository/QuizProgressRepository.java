package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Quiz;
import com.example.demo.model.QuizAttempt;
import com.example.demo.model.QuizProgress;

@Repository
public interface QuizProgressRepository extends JpaRepository<QuizProgress, Long> {

    List<QuizProgress> findByAttempt(QuizAttempt attempt);

    List<QuizProgress> findByQuiz(Quiz quiz);

    List<QuizProgress> findByCompleted(Integer completed);

    List<QuizProgress> findByScore(Integer score);
}
