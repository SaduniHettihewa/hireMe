package com.example.hireMe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/car")
public class CarController {
    @Autowired
    private CarRepository carRepository;


    @PostMapping( "/add")
    public  String  addUser(@RequestParam String carNo,
                            @RequestParam String brand,
                            @RequestParam Double hourRate,
                            @RequestParam Integer noOfSeats,
                            @RequestParam String registeredYear){

        Car car = new Car();
        car.setCarNo(carNo);
        car.setBrand(brand);
        car.setHourRate(hourRate);
        car.setNoOfSeats(noOfSeats);
        car.setRegisteredYear(registeredYear);
        carRepository.save(car);
        return "car details added";

    }
    @GetMapping("/list")
    public  Iterable<Car> listOfUser(){
        return   carRepository.findAll();
    }

    @GetMapping("/search/{carNo}")
    public Car findCarByCarNo(@PathVariable String carNo){
        return carRepository. findCarByCarNo(carNo);
    }

    @DeleteMapping("/delete/{carNo}")
    public ResponseEntity<HttpStatus> deleteCar(@PathVariable("carNo")String carNo) {
        try {
            carRepository.deleteById(carNo);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/update/{carNo}")
    public ResponseEntity<Car> updateCar(@PathVariable String carNo, @RequestBody Car car) {
        Optional<Car> carDetails = carRepository.findById(carNo);

        if (carDetails.isPresent()) {
            Car _car = carDetails.get();
            _car.setBrand(car.getBrand());
            _car.setHourRate(car.getHourRate());
            _car.setNoOfSeats(car.getNoOfSeats());
            return new ResponseEntity<>(carRepository.save(_car), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



}
