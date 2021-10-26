import React, { useState ,useEffect} from "react"
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap"
import './AdminForm.css'


function AdminForm() {

  const [admin,setAdmin] = useState([{id:"", userName:"", firstName:"", lastName:"",email:"" }]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [id, setId] = useState("");
  const [user, setUser] = useState({
    firstName: " ",
    lastName: " ",
    email: " ",
    id:"",
    userName:"",
  });

  //display table
  useEffect(() => {
    const fetchData = async () => {
      fetch(
        "http://localhost:8080/user/list",
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
       .then((json) =>{
           console.log(json)
          setAdmin(json) 
       })
       .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
  },[]);

  //Submit Admin form

  const SubmitAdminDetails = async (event) => {
    event.preventDefault()
    await fetch(`http://localhost:8080/user/add?id=${id}&email=${email}&firstName=${firstName}&lastName=${lastName}&userName=${userName}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
    })
      .then(() => {
        console.log("Admin data added")
        alert("Admin data added")
        const fetchData = async () => {
          fetch(
            "http://localhost:8080/user/list",
            {
              method: "GET",
            }
          )
            .then((response) => response.json())
           .then((json) =>{
               console.log(json)
              setAdmin(json) 
           })
           .catch((error) => {
              console.error(error);
            });
        };
        fetchData();
      } )}

//update form

      const UpdateAdmin = async (event) => {
        event.preventDefault()
        console.log("updated")
    
        await fetch(`http://localhost:8080/user/update/${user.id}`, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id:user.id,
            userName:user.userName,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
          })}) 
          .then((response) => response.json())
        .then(()=>{
          alert("Admin data updated")
          const fetchData = async () => {
            fetch(
              "http://localhost:8080/user/list",
              {
                method: "GET",
              }
            )
              .then((response) => response.json())
             .then((json) =>{
                 console.log(json)
                setAdmin(json) 
             })
             .catch((error) => {
                console.error(error);
              });
          };
          fetchData();
          });  }

          // search 

      const SearchAdmin = async () => {
        const response = await fetch(`http://localhost:8080/user/search/${id}`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            setUser({
              ...user,
              firstName: responseJson.firstName,
              lastName: responseJson.lastName,
              id: responseJson.id,
              email: responseJson.email,
              userName: responseJson.userName,
            }); }) }

            //Delete 

        const DeleteAdmin = async (id) => {
         
          await fetch(`http://localhost:8080/user/delete/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }, // *GET, POST, PUT, DELETE, etc.
          })
          .then(() => {
            alert("Admin data deleted")
            const fetchData = async () => {
              fetch(
                "http://localhost:8080/user/list",
                {
                  method: "GET",
                }
              )
                .then((response) => response.json())
               .then((json) =>{
                   console.log(json)
                  setAdmin(json) 
               }) 
               .catch((error) => {
                  console.error(error);
                });
            };
            fetchData(); } ) }

  return (
    <div>
<br/><br/>
      <lable className="hedearForm">Add Admin Panel</lable>

<div className="form">
      <input
        type="text"
        className="form-control"
        name="Id"
        placeholder="id"
        onChange={(e) => setId(e.target.value)}
       
      />
       <input
        type="text"
        className="form-control"
        name="userName"
        placeholder="User Name"
        onChange={(e) => setUserName(e.target.value)}
       
      />
     
      <input
        type="text"
        className="form-control"
        name="firstName"
        placeholder="First Name"
        onChange={(e) => setFirstName(e.target.value)}
    
      />
      <input
        type="text"
        className="form-control"
        name="lastName"
        placeholder="Last Name"
        onChange={(e) => setLastName(e.target.value)}
        
      />
     
     <input
        type="text"
        className="form-control"
        name="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        
      />
      <Button type="submit" className="submitB" onClick={SubmitAdminDetails}>Submit</Button>
     
    </div>
    <div className="Display">
        <table className="table"  >
                          
                        <div className="tablep">
                          <thead>
                          
                            <tr>
                            <th><strong className="header">ID</strong></th>
                            <th><strong className="header">First Name</strong></th>
                            <th><strong className="header">Last Name</strong></th>
                              <th > <strong className="header">Email</strong></th>
                              
                              </tr>
                          </thead>
                         
                          {
                                  
                                 admin?.map((data, i) => (
                                        <tr key={i}>
                                          
                                            <td className="data">{data.id}</td>
                                            <td className="data">{data.firstName}</td>
                                            <td className="data">{data.lastName}</td>
                                            <td className="data">{data.email}</td>
                                            <td><button type="button" class="btn btn-outline-danger" onClick={() =>DeleteAdmin(data.id)}>Delete</button></td>
                                         
                                       
                                    </tr>
                                ))
                                
                                    }
                                 
                                    </div>
                          </table>
</div>
    <br/><br/>
<div classname="modify">
    <lable className="hedearForm2">Modify Admin Panel</lable>

<div className="formModify">
      <input
        type="text"
        className="form-controlId"
        name="Id"
        placeholder="Enter Your id"
        onChange={(e) => setId(
           e.target.value
        )}
       
       
      />
      
       <input
        type="text"
        className="form-controlUser"
        name="userName"
        onChange={(e) => setUser({
          ...user,
          userName: e.target.value
        })}
        value={user.userName} 
      />
    
      <input
        type="text"
        className="form-controlUser"
        name="firstName"
        onChange={(e) => setUser({
          ...user,
          firstName: e.target.value
        })}
        value={user.firstName} 
    
      />
      
      <input
        type="text"
        className="form-controlUser"
        name="lastName"
        onChange={(e) => setUser({
          ...user,
          lastName: e.target.value
        })}
        value={user.lastName} 
        
      />
     
     <input
        type="text"
        className="form-controlUserEmail"
        name="email"
        placeholder="Email"
        onChange={(e) => setUser({
          ...user,
          email: e.target.value
        })}
        value={user.email} 
      />
     
      <Button type="update" className="Search" onClick={SearchAdmin}>Search</Button>
      <Button type="update" className="update" onClick={UpdateAdmin}>update</Button>
    </div>
  </div>
  </div>
  
  );
}

export default AdminForm;