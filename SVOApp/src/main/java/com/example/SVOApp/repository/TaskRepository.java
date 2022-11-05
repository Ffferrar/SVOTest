package com.example.SVOApp.repository;

import com.example.SVOApp.entity.Task;
import com.example.SVOApp.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
}