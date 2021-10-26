package com.example.hireMe;
import javax.persistence.Entity;
import javax.persistence.Id;
@Entity
public class Supplier {
    @Id
    private String nic;
    private String name;
    private  String phoneNo;
    private Integer countOfCar;
    private String address;

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public Integer getCountOfCar() {
        return countOfCar;
    }

    public void setCountOfCar(Integer countOfCar) {
        this.countOfCar = countOfCar;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
