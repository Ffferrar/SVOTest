package com.example.SVOApp.entity;

import javax.persistence.*;

@Entity
@Table(name = "task")
public class Task {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String flight;

    private Integer workerId;

    private Integer startTime;

    private Integer endTime;

    public Task(){};

    public Task(String flight, Integer startTime, Integer endTime){
        this.flight = flight;
        this.workerId = 1000; // поменять на дефолтное
        this.startTime = startTime; // поменять на дефолтное
        this.endTime = endTime; // поменять на дефолтное
    }

    public Integer getId() {
        return id;
    }

    public String getFlight() {
        return flight;
    }

    public void setFlight(String flight) {
        this.flight = flight;
    }

    public Integer getWorker() {
        return workerId;
    }

    public void setWorker(Integer worker) {
        this.workerId = worker;
    }

    public Integer getStartTime() {
        return startTime;
    }

    public void setStartTime(Integer startTime) {
        this.startTime = startTime;
    }

    public Integer getEndTime() {
        return endTime;
    }

    public void setEndTime(Integer endTime) {
        this.endTime = endTime;
    }
}
