import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import '../App.css';
function CreateUser() {
  const navigate=useNavigate();
  const {register,handleSubmit,formState:{errors}}=useForm();
  async function SubmitForm(obj){
    let res=await fetch("http://localhost:3000/users",{
      method:'POST',
      body:JSON.stringify(obj),
      headers:{
        'context-type':'application/json'
      }
    });
    // console.log(obj);
    navigate("/read");
  }
  return (
    <div className='from-cont'>
      <div className='container w-50 border bg-dark text-white rounded-2 p-4 form-card'>
    <div className='d-flex justify-content-between'>  
      <h1 className='text-center'>CreateUser</h1>
      <button className='btn border fw-bold text-white' onClick={()=>navigate('/read')}>x</button>
    </div>
    <form className='form' onSubmit={handleSubmit(SubmitForm)}>
      {/* username */}
      <div className='mt-2'>
        <label htmlFor="username" className='form-label'>username</label>
        <input type="text" id="username" {...register("username",{required:true,minLength:4,maxLength:10})} placeholder='Enter UserName' className='form-control' />
        {/* displaing-errors for userName  */}
        {errors.username?.type==='required' && <p className='text-danger'>UserName is required</p>}
        {errors.username?.type==='minLength' && <p className='text-danger'>minimun length of userName is:4</p>}
        {errors.username?.type==='maxLength' && <p className='text-danger'>maximum length of userName is:10</p>}
      </div>
      {/* email */}
      <div className='mt-2'>
        <label htmlFor="emailid" className="form-label">Email</label>
        <input type="email" id="emailid" {...register("emailid",{required:true})} placeholder='Enter Email' className="form-control" />
        {/* displaying-errors for Email*/}
        {errors.emailid?.type==="required" && <p className='text-danger'>Email is Required</p>}
      </div>
      {/* Date-of-Birth */}
      <div className='mt-2'>
        <label htmlFor="dob" className='form-label'>Choose DOB</label>
        <input type="date"  className="form-control" id='dob' {...register("dob",{required:true})}/>
        {/* displaying-erros for date-of-birth */}
        {errors.dob?.type==="required" && <p className='text-danger'>Date of Birth id Required</p>}
      </div>
      {/* phone Number */}
      {/* <div className='mt-2'>
        <label htmlFor="phnno" className="form-label">Phone Number</label>
        <input type="number" placeholder='Enter phone number' {...register("phnno",{minLength:10,maxLength:10})} className="form-control" />
        {errors.phnno?.type==="required" && <p className='text-danger'>Phone Number is Required</p>}
        {errors.phnno?.type==="minlength" && <p className='text-danger'>Invalid</p>}
        {errors.phnno?.type==="maxLength" && <p className='text-danger'>Invalid</p>}
      </div>  
      */}
      <button className='btn btn-success mt-2' type='submit'>Submit</button>
    </form>
      </div>
    </div>
  )
}

export default CreateUser
