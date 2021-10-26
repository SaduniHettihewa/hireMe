import React,{useState,useEffect} from 'react'
import './Table.css'



  

function TableDisplay() {
  const [user,setUser] = useState([{id:"", userName:"", firstName:"", lastName:"",email:"" }]);
 
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
        setUser(json) 
     })
     
      
     .catch((error) => {
        console.error(error);
      });
  };
  fetchData();
 
},[]);

  const DeleteAdmin = async (id) => {
   
    console.log("Deleted")
    await fetch(`http://localhost:8080/user/delete/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    
    })
    .then((response) => response.json())
    .then(() => {
      console.log("Delete admin")
      alert("Admin data deleted")
    }
    ) }

  
 

    return (
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
                                  
                                 user?.map((data, i) => (
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
    )
}

export default TableDisplay
