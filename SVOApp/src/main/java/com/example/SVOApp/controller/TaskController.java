package com.example.SVOApp.controller;

import com.example.SVOApp.entity.Task;
import com.example.SVOApp.entity.Worker;
import com.example.SVOApp.service.TaskService;
import com.example.SVOApp.service.WorkerService;
import org.hibernate.jdbc.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.lang.model.type.NullType;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin("*")
public class TaskController {
    public static final Integer FREE_TASK = 28957454;

    private TaskService taskService;
    private WorkerService workerService;

    @Autowired
    public void setTaskService(TaskService taskService) {
        this.taskService = taskService;
    }

    @Autowired
    public void setWorkerService(WorkerService workerService) {
        this.workerService = workerService;
    }

    @GetMapping("/") //В базе данных должна существовать запись с id 28957454
    public HashMap getAll() {

        HashMap <String, List<Task>> hashMap= new HashMap<String, List<Task>>();
        List<Task> taskList = taskService.allTasks();

        for (Task element: taskList){
            if (workerService.getById(element.getWorker()) != null) {
                Worker worker = workerService.getById(element.getWorker());
                if (hashMap.containsKey(worker.getName())) {

                    hashMap.get(worker.getName()).add(element);
                } else {
                    List<Task> list = new ArrayList<Task>();
                    list.add(element);
                    hashMap.put(worker.getName(), list);
                }
            }
            else {
                if (hashMap.containsKey(workerService.getById(FREE_TASK).getName())) {
                    hashMap.get(workerService.getById(FREE_TASK).getName()).add(element);
                } else {
                    List<Task> list = new ArrayList<Task>();
                    list.add(element);
                    hashMap.put(workerService.getById(FREE_TASK).getName(), list);
                }
            }
        }

        return hashMap;
    }

    @GetMapping("/show")
    public List getTasks() {
        List<Task> taskList = taskService.allTasks();

        return taskList;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteTask(@RequestBody Task task) {
        taskService.delete(task);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity deleteWorker(@RequestBody Worker worker) {
        workerService.delete(worker);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity editTask(@PathVariable("id") Integer id, Model model) {
        Task task = taskService.getById(id);
        model.addAttribute("task", task);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/add")
    public ResponseEntity addTask(@RequestBody Task task) throws URISyntaxException {
        taskService.add(task);
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity addWorker(@RequestBody Worker worker) throws URISyntaxException {
        workerService.addWorker(worker);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/move")
    public ResponseEntity moveTask(@RequestBody Worker worker, @RequestBody Task task){
        task.setWorker(worker.getId());
        return ResponseEntity.ok().build();
    }
}
