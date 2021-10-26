
import React, { useState, useEffect } from "react"
import { Button, } from "react-bootstrap"


function SupplierAddForm() {
  const [supplie, setSupplie] = useState([{ nic: "", name: "", phoneNo: "", address: "", countOfCar: "" }]);
  const [nic, setNic] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [countOfCar, setCountOfCar] = useState("");
  const [supplier, setSupplier] = useState({
    nic: " ",
    name: " ",
    address: " ",
    phoneNo: "",
    countOfCar: "",
  });


  const SubmitSupplier = (event) => {
    event.preventDefault()
    console.log("supplier data added")

    fetch(`http://localhost:8080/supplier/add?nic=${nic}&name=${name}&address=${address}&phoneNo=${phoneNo}&countOfCar=${countOfCar}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
    })
      .then(() => {
        console.log("submit");
        const SupplierfetchData = async () => {
          fetch(
            "http://localhost:8080/supplier/list",
            {
              method: "GET",
            }
          )
            .then((response) => response.json())
            .then((json) => {
              console.log(json)
              setSupplie(json)
            })
            .catch((error) => {
              console.error(error);
            });
        };
        SupplierfetchData();
      });
  }
  useEffect(() => {

    const SupplierfetchData = () => {
      fetch(
        "http://localhost:8080/supplier/list",
        {
          method: "GET",

        }
      )
        .then((response) => response.json())

        .then((json) => {
          console.log(json)
          setSupplie(json)

        })


        .catch((error) => {
          console.error(error);
        });
    };
    SupplierfetchData();

  }, []);



  const UpdateSupplier = (event) => {
    event.preventDefault()
    alert("supplier data updated")
    console.log("Supplier data updated")
    fetch(`http://localhost:8080/supplier/update/${supplier.nic}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nic: supplier.nic,
        name: supplier.name,
        address: supplier.address,
        phoneNo: supplier.phoneNo,
        countOfCar: supplier.countOfCar,

      })
    })
      .then((response) => response.json())
      .then((response) => {
        const SupplierfetchData = async () => {
          fetch(
            "http://localhost:8080/supplier/list",
            {
              method: "GET",
            }
          )
            .then((response) => response.json())
            .then((json) => {
              console.log(json)
              setSupplie(json)
            })
            .catch((error) => {
              console.error(error);
            });
        };
        SupplierfetchData();


        console.log(response)
      });
  }
  const SearchSupplier = async () => {

    const response = await fetch(`http://localhost:8080/supplier/search/${nic}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setSupplier({
          ...supplier,
          nic: responseJson.nic,
          name: responseJson.name,
          address: responseJson.address,
          phoneNo: responseJson.phoneNo,
          countOfCar: responseJson.countOfCar,

        });
      })

  }

  const DeleteSupplier = async (nic) => {

    await fetch(`http://localhost:8080/supplier/delete/${nic}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.

    })
      .then(() => {
        const SupplierfetchData = async () => {
          fetch(
            "http://localhost:8080/supplier/list",
            {
              method: "GET",
            }
          )
            .then((response) => response.json())
            .then((json) => {
              console.log(json)
              setSupplie(json)
            })
            .catch((error) => {
              console.error(error);
            });
        };
        SupplierfetchData();




      });

  }
  return (
    <div className="carD">
      <br /><br />
      <lable className="hedearForm">Add Supplier Details</lable>

      <div className="form">
        <input
          type="text"
          className="form-control"
          name="nic"
          placeholder="NIC"
          onChange={(e) => setNic(e.target.value)}

        />
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}

        />

        <input
          type="text"
          className="form-control"
          name="phoneNo"
          placeholder="phone Number"
          onChange={(e) => setPhoneNo(e.target.value)}

        />
        <input
          type="text"
          className="form-control"
          name="address"
          placeholder="address"
          onChange={(e) => setAddress(e.target.value)}

        />

        <input
          type="text"
          className="form-control"
          name="countOfCar"
          placeholder="Count of Car"
          onChange={(e) => setCountOfCar(e.target.value)}

        />
        <Button type="submit" className="submitB" onClick={SubmitSupplier} >Submit</Button>
        <div className="Display">
          <table className="table"  >

            <div className="tablep">
              <thead>

                <tr>
                  <th><strong className="header">NIC</strong></th>
                  <th><strong className="header">Name</strong></th>
                  <th><strong className="header">Phone Number</strong></th>
                  <th > <strong className="header">Count of Car</strong></th>

                </tr>
              </thead>

              {

                supplie?.map((data, i) => (
                  <tr key={i}>

                    <td className="data">{data.nic}</td>
                    <td className="data">{data.name}</td>
                    <td className="data">{data.phoneNo}</td>
                    <td className="data">{data.countOfCar}</td>
                    <td><button type="button" class="btn btn-outline-danger" onClick={() => DeleteSupplier(data.nic)} >Delete</button></td>


                  </tr>
                ))

              }

            </div>
          </table>
        </div>
      </div>
      <br /><br />
      <div classname="modify">
        <lable className="hedearForm2">Modify Supplier Details</lable>

        <div className="formModify">
          <input
            type="text"
            className="form-controlId"
            name="nic"
            placeholder="Enter NIC"
            onChange={(e) => setNic(
              e.target.value
            )}


          />

          <input
            type="text"
            className="form-controlUser"
            name="name"
            onChange={(e) => setSupplier({
              ...supplier,
              name: e.target.value
            })}
            value={supplier.name}
          />

          <input
            type="text"
            className="form-controlUser"
            name="firstName"
            onChange={(e) => setSupplier({
              ...supplier,
              phoneNo: e.target.value
            })}
            value={supplier.phoneNo}

          />

          <input
            type="text"
            className="form-controlUser"
            name="lastName"
            onChange={(e) => setSupplier({
              ...supplier,
              address: e.target.value
            })}
            value={supplier.address}

          />

          <input
            type="text"
            className="form-controlUserEmail"
            name="email"

            onChange={(e) => setSupplier({
              ...supplier,
              countOfCar: e.target.value
            })}
            value={supplier.countOfCar}
          />

          <Button type="update" className="Search" onClick={SearchSupplier}>Search</Button>
          <Button type="update" className="update" onClick={UpdateSupplier}>update</Button>
        </div>
      </div>
    </div>

  );
}


export default SupplierAddForm
