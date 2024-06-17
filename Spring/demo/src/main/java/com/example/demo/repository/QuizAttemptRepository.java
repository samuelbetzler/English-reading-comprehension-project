package com.example.demo.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Quiz;
import com.example.demo.model.QuizAttempt;
import com.example.demo.model.User;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {

    List<QuizAttempt> findByUser(User user);

    List<QuizAttempt> findByQuiz(Quiz quiz);

    List<QuizAttempt> findByDate(Date date);
}
