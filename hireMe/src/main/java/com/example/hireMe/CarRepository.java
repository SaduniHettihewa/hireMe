package com.example.hireMe;


import org.springframework.data.repository.CrudRepository;

public interface CarRepository extends CrudRepository<Car,String>{
    Car findCarByCarNo(String carNo);
}