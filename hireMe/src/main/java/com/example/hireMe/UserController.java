package com.example.hireMe;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;


      @PostMapping( "/add")
    public  String  addUser(@RequestParam Integer id,
                             @RequestParam String email,
                            @RequestParam String firstName,
                            @RequestParam String lastName,
                            @RequestParam String userName){

          User user = new User();
          user.setId(id);
          user.setEmail(email);
          user.setUserName(userName);
          user.setFirstName(firstName);
          user.setLastName(lastName);
          userRepository.save(user);
          return "user details added";

      }
      @GetMapping("/list")
    public  Iterable<User> listOfUser(){
        return   userRepository.findAll();
      }
      @GetMapping("/search/{id}")
    public User findUserById(@PathVariable Integer id){
          return userRepository.findUserById(id);
      }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("id")Integer id) {
        try {
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateRoute(@PathVariable Integer id, @RequestBody User user) {
        Optional<User> userDetails = userRepository.findById(id);

        if (userDetails.isPresent()) {
            User _user = userDetails.get();
            _user.setUserName(user.getUserName());
            _user.setFirstName(user.getFirstName());
            _user.setEmail(user.getEmail());
            _user.setLastName(user.getLastName());
            return new ResponseEntity<>(userRepository.save(_user), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
