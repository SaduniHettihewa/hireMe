import React, { useState ,useEffect} from "react"
import { Button, } from "react-bootstrap"
import './CardDetailsForm.css'

function CarDetailsForm() {
  const [carD,setCarD] = useState([{carNo:"", brand:"", hourRate:"", noOfSeats:"",registeredYear:"" }]);
    const [carNo, setCarNo] = useState("");
    const [brand, setBrand] = useState("");
    const [hourRate, sethourRate] = useState("");
    const [noOfSeats, setNoOfSeats] = useState("");
    const [registeredYear, setRegisteredYear] = useState("");
    const [car, setCar] = useState({
        carNo: " ",
        brand: " ",
        hourRate: " ",
        noOfSeats:"",
        registeredYear:"",
    });
    
  
    useEffect(() => {
      const fetchData = async () => {
        fetch(
          "http://localhost:8080/car/list",
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
         .then((json) =>{
             console.log(json)
            setCarD(json) 
         })
         .catch((error) => {
            console.error(error);
          });
      };
      fetchData();
    },[]);

    const SubmitCarDetails = async (event) => {
      event.preventDefault()
        await fetch(`http://localhost:8080/car/add?carNo=${carNo}&brand=${brand}&hourRate=${hourRate}&noOfSeats=${noOfSeats}&registeredYear=${registeredYear}`, {
    
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
        })
          .then(() => {
            const fetchData = async () => {
              fetch(
                "http://localhost:8080/car/list",
                {
                  method: "GET",
                }
              )
                .then((response) => response.json())
               .then((json) =>{
                   console.log(json)
                  setCarD(json) 
               })
               .catch((error) => {
                  console.error(error);
                });
            };
            fetchData();
          });
            alert("car data added")
          }
        
          const DeleteCar = async (carNo) => {
            await fetch(`http://localhost:8080/car/delete/${carNo}`, {
              method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            })
             .then(()=>{
              alert("Car data deleted")
              const fetchData = async () => {
                fetch(
                  "http://localhost:8080/car/list",
                  {
                    method: "GET",
                  }
                )
                  .then((response) => response.json())
                 .then((json) =>{
                     console.log(json)
                    setCarD(json) 
                 })
                 .catch((error) => {
                    console.error(error);
                  });
              };
              fetchData();
            });}

          const UpdateCar = async (event) => {
            event.preventDefault()
            console.log("update car details")
            await fetch(`http://localhost:8080/car/update/${car.carNo}`, {
              method: 'PUT', // *GET, POST, PUT, DELETE, etc.
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({   
             carNo:car.carNo,
             brand:car.brand,
             hourRate:car.hourRate,
             noOfSeats:car.noOfSeats,
             registeredYear:car.registeredYear
              }) }) 
            .then(()=>{
              alert("car data updated")
              const fetchData = async () => {
                fetch(
                  "http://localhost:8080/car/list",
                  {
                    method: "GET",
                  }
                )
                  .then((response) => response.json())
                 .then((json) =>{
                     console.log(json)
                    setCarD(json) 
                 })
                 .catch((error) => {
                    console.error(error);
                  });
              };
              fetchData();
            });
             
          }

          const SearchCar = async () => {
        
            const response = await fetch(`http://localhost:8080/car/search/${carNo}`, {
              method: 'GET', // *GET, POST, PUT, DELETE, etc.
            })
              .then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson);
                setCar({
                  ...car,
                  carNo:responseJson.carNo,
             brand:responseJson.brand,
             hourRate:responseJson.hourRate,
             noOfSeats:responseJson.noOfSeats,
             registeredYear:responseJson.registeredYear
                });
              })
            }

    return (
        <div className="carD">
        <br/><br/>
              <lable className="hedearForm">Add Car Details</lable>
        
        <div className="form">
              <input
                type="text"
                className="form-control"
                name="carNo"
                placeholder="CarNumber"
                onChange={(e) => setCarNo(e.target.value)}
               
              />
               <input
                type="text"
                className="form-control"
                name="brand"
                placeholder="brand"
                onChange={(e) => setBrand(e.target.value)}
               
              />
             
              <input
                type="text"
                className="form-control"
                name="Registered Year"
                placeholder="Registered Year"
                onChange={(e) => setRegisteredYear(e.target.value)}
            
              />
              <input
                type="text"
                className="form-control"
                name="noOfSeats"
                placeholder="Number of seats"
                onChange={(e) => setNoOfSeats(e.target.value)}
                
              />
             
             <input
                type="text"
                className="form-control"
                name="hourRate"
                placeholder="Rate for hour"
                onChange={(e) => sethourRate(e.target.value)}
               
              />
              <Button type="submit" className="submitB" onClick={SubmitCarDetails}>Submit</Button>
              <div className="Display">
        <table className="table"  >
                          
                        <div className="tablep">
                          <thead>
                          
                            <tr>
                            <th><strong className="header">Car Number</strong></th>
                            <th><strong className="header">Brand</strong></th>
                            <th><strong className="header">Rate Of Hour</strong></th>
                              <th > <strong className="header">No of Seats</strong></th>
                              
                              </tr>
                          </thead>
                         
                          {
                                  
                                  carD?.map((data, i) => (
                                        <tr key={i}>
                                          
                                            <td className="data">{data.carNo}</td>
                                            <td className="data">{data.brand}</td>
                                            <td className="data">{data.hourRate}</td>
                                            <td className="data">{data.noOfSeats}</td>
                                            <td><button type="button" class="btn btn-outline-danger" onClick={() =>DeleteCar(data.carNo)}>Delete</button></td>
                                         
                                       
                                    </tr>
                                ))
                                
                                    }
                                 
                                    </div>
                          </table>
</div>
            </div>
            <br/><br/>
        <div classname="modify">
            <lable className="hedearForm2">Modify Car Details</lable>
        
        <div className="formModify">
              <input
                type="text"
                className="form-controlId"
                name="Id"
                placeholder="Car Number"
                onChange={(e) => setCarNo(
                   e.target.value
                )}
               
               
              />
              
               <input
                type="text"
                className="form-controlUser"
                name="userName"
                onChange={(e) => setCar({
                  ...car,
                  brand: e.target.value
                })}
                value={car.brand} 
              />
            
              <input
                type="text"
                className="form-controlUser"
                name="firstName"
                onChange={(e) => setCar({
                  ...car,
                  registeredYear: e.target.value
                })}
                value={car.registeredYear} 
            
              />
              
              <input
                type="text"
                className="form-controlUser"
                name="lastName"
                onChange={(e) => setCar({
                  ...car,
                  hourRate: e.target.value
                })}
                value={car.hourRate} 
                
              />
             
             <input
                type="text"
                className="form-controlUserEmail"
                name="email"
               
                onChange={(e) => setCar({
                  ...car,
                  noOfSeats: e.target.value
                })}
                value={car.noOfSeats} 
              />
             
              <Button type="update" className="Search" onClick={SearchCar}>Search</Button>
              <Button type="update" className="update" onClick={UpdateCar}>update</Button>
            </div>
          </div>
          </div>
          
          );
        }
        
    


export default CarDetailsForm
