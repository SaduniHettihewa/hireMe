package com.example.hireMe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/supplier")

public class SupplierController {
    @Autowired
    private SupplierRepository supplierRepository;

    @PostMapping( "/add")
    public  String  addUser(@RequestParam String nic,
                            @RequestParam String name,
                            @RequestParam String phoneNo,
                            @RequestParam String address,
                            @RequestParam Integer countOfCar){

        Supplier supplier = new Supplier();
        supplier.setNic(nic);
        supplier.setName(name);
        supplier.setPhoneNo(phoneNo);
        supplier.setAddress(address);
        supplier.setCountOfCar(countOfCar);
        supplierRepository.save(supplier);
        return "Supplier details added";

    }

    @GetMapping("/list")
    public Iterable<Supplier> listOfSuppliers(){
        return   supplierRepository.findAll();
    }

    @GetMapping("/search/{nic}")
    public Supplier findCarSupplierByNic(@PathVariable String nic){
        return supplierRepository.findSupplierByNic(nic);
    }

    @DeleteMapping("/delete/{nic}")
    public ResponseEntity<HttpStatus> deleteSupplier(@PathVariable("nic")String nic) {
        try {
            supplierRepository.deleteById(nic);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/update/{nic}")
    public ResponseEntity<Supplier> updateSupplier(@PathVariable String nic, @RequestBody Supplier supplier) {
        Optional<Supplier> supplierDetails = supplierRepository.findById(nic);

        if (supplierDetails.isPresent()) {
            Supplier _supplier = supplierDetails.get();
            _supplier.setPhoneNo(supplier.getPhoneNo());
            _supplier.setCountOfCar(supplier.getCountOfCar());
            _supplier.setAddress(supplier.getAddress());
            _supplier.setName(supplier.getName());
            return new ResponseEntity<>(supplierRepository.save(_supplier), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
