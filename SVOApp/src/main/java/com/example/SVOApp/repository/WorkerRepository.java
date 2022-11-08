package com.example.SVOApp.repository;

import com.example.SVOApp.entity.Task;
import com.example.SVOApp.entity.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkerRepository extends JpaRepository<Worker, Integer> {
    Worker findByName(String username);
}
