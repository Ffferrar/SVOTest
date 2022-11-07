package com.example.SVOApp.service;

import com.example.SVOApp.entity.Task;
import com.example.SVOApp.entity.Worker;
import com.example.SVOApp.repository.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

@Service
public class WorkerService {
    private WorkerRepository workerRepository;

    @PersistenceContext
    private EntityManager em;

    @Autowired
    public void setWorkerRepository(WorkerRepository workerRepository) {
        this.workerRepository = workerRepository;
    }

    public List<Worker> allWorkers() {
        return workerRepository.findAll();
    }

    public boolean delete(Worker worker) {
        workerRepository.delete(worker);
        return true;
    }

    public Worker getById(Integer id) {
        if (id == null){
            return null;
        }
        Optional<Worker> userFromDb = workerRepository.findById(id);
        return userFromDb.orElse(new Worker());
    }

    public Worker getWorkerByName(String username){
        Worker worker = workerRepository.findByName(username);
        return worker;
    }

    public boolean addWorker(Worker worker) {
        workerRepository.save(worker);
        return true;
    }
}
