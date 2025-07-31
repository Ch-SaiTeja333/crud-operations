import React from "react";
import '../App.css'
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
function Read() {
  // form
  let {register,handleSubmit, formState:{ errors }} = useForm();
  // displaying user-details
  let [usersData, setUsersData] = useState([]);
  let [isEditUser, setIsEditUser] = useState(false);
  let [editUserObj,setEditUserObj]=useState({});
  // displaying user details
  async function getUsersDetails() {
    let res = await fetch("http://localhost:3000/users");
    let data = await res.json();
    setUsersData(data);
    // console.log(data);
  }
  useEffect(() => {
    getUsersDetails();
  }, []);
  // delete user
  async function deleteUser(id) {
    try {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
        headers:{
            'Content-Type':'application/json'
        }
      });
      // console.log("Deleted succesfully");
      getUsersDetails();
    } catch (err) {
      console.log("err in Read:", err);
    }
  }
  if (usersData.length === 0) return <h1 className="text-center">No Data is Found</h1>;
  return (
    <div className="text-center">
      <h1 className="text-light">User-Details</h1>
      <table className="table table-bordered table-striped table-hover table-dark text-white w-75 mx-auto">
        <thead>
          <tr>
            <th className="text-danger">UserName</th>
            <th className="text-danger ">Email</th>
            <th className="text-danger">DateOfBirth</th>
            {/* <th className='text-primary'>PhoneNo</th> */}
            <th className="text-danger">Edit</th>
            <th className="text-danger">Delete</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((ele, idx) => (
            <tr key={idx}>
              <td><i>{ele.username}</i></td>
              <td><i>{ele.emailid}</i></td>
              <td><i>{ele.dob}</i></td>
              {/* <td>{ele.phnno}</td> */}
              <td>
                <button className="btn" onClick={()=>{
                  setIsEditUser(true);
                  setEditUserObj(ele);
                  }}>   
                  🔃
                </button>
              </td>
              <td>
                <button className="btn" onClick={() => deleteUser(ele.id)}>
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {
          isEditUser && <EditUser obj={editUserObj} set={setIsEditUser} disp={getUsersDetails}></EditUser>
          
      }
    </div>
  );
}

export default Read;
// edit user
 function EditUser(props) {
  console.log(props.obj);
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({defaultValues:props.obj});

  function SubmitForm(obj) {
    // console.log(obj);
    modifiedUser(obj);
    props.set(false);
    props.disp();
  }
  return (
    <div className="editForm relative">
      
      <form className="form bg-dark  text-white p-4 rounded-2" onSubmit={handleSubmit(SubmitForm)}>
        <button className="btn border text-white float-end" onClick={()=>setIsEditUser(false)}>&times;</button>
      {/* username */}
      <div className="mt-2">
        <label htmlFor="username" className="form-label">
          username
        </label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: true,
            minLength: 4,
            maxLength: 10,
          })}
          placeholder="Enter UserName"
          className="form-control"
        />
        {/* displaing-errors for userName  */}
        {errors.username?.type === "required" && (
          <p className="text-danger">UserName is required</p>
        )}
        {errors.username?.type === "minLength" && (
          <p className="text-danger">minimun length of userName is:4</p>
        )}
        {errors.username?.type === "maxLength" && (
          <p className="text-danger">maximum length of userName is:10</p>
        )}
      </div>
      {/* email */}
      <div className="mt-2">
        <label htmlFor="emailid" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="emailid"
          {...register("emailid", { required: true })}
          placeholder="Enter Email"
          className="form-control"
        />
        {/* displaying-errors for Email*/}
        {errors.emailid?.type === "required" && (
          <p className="text-danger">Email is Required</p>
        )}
      </div>
      {/* Date-of-Birth */}
      <div className="mt-2">
        <label htmlFor="dob" className="form-label">
          Choose DOB
        </label>
        <input
          type="date"
          className="form-control"
          id="dob"
          {...register("dob", { required: true })}
        />
        {/* displaying-erros for date-of-birth */}
        {errors.dob?.type === "required" && (
          <p className="text-danger">Date of Birth id Required</p>
        )}
      </div>
      <button className="btn btn-success mt-2" type="submit">
        Submit
      </button>
    </form>
    </div>
  );
}

async function modifiedUser(obj) {
  let res=await fetch(`http://localhost:3000/users/${obj.id}`,{
    method:"PUT",
    body:JSON.stringify(obj),
    headers:{
      'Content-Type':'application/json'
    }
  })
  
}
