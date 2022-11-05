package com.example.SVOApp.service;

import com.example.SVOApp.entity.Task;
import com.example.SVOApp.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService{
    private TaskRepository taskRepository;

    @Autowired
    public void setTaskRepository(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    public List<Task> allTasks(){
        return taskRepository.findAll();
    }

    public void add(Task task) {
        taskRepository.save(task);
    }

    public void delete(Task task) {
        taskRepository.delete(task);
    }

    public Task getById(Integer id) {
        Optional<Task> taskFromDb = taskRepository.findById(id);
        return taskFromDb.orElse(new Task());
    }
}
