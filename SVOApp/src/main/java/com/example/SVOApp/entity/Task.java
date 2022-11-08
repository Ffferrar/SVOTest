package com.example.SVOApp.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.sql.Time;

@Entity
@Table(name = "task")
public class Task {
    public static final Integer FREE_TASK = 28957454;
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "flight")
    private String flight;

    private Integer workerId;

    private Time startTime;

    private Time endTime;

    public Task(){this.startTime = new Time(0);
        this.endTime = new Time(0);};

    public Task(String flight, Long startTime, Long endTime){
        this.startTime = new Time(startTime);
        this.endTime = new Time(endTime);
        this.flight = flight;
        this.workerId = FREE_TASK; // поменять на дефолтное
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

    public Long getStartTime() {
        return startTime.getTime();
    }

    public void setStartTime(Integer startTime) {
        this.startTime.setTime(startTime);
    }

    public Long getEndTime() {
        return endTime.getTime();
    }

    public void setEndTime(Integer endTime) {
        this.endTime.setTime(endTime);
    }
}
