package com.example.hireMe;

import org.springframework.data.repository.CrudRepository;

public interface SupplierRepository extends CrudRepository<Supplier,String> {
     Supplier findSupplierByNic(String nic);
}