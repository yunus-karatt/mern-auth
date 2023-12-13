import React, { useEffect, useState } from 'react'
import { useUpdateUserDataMutation } from '../slices/adminApiSlice'
import { useNavigate, useParams } from 'react-router'
import { useGetUpdateUserDataMutation } from '../slices/adminApiSlice'
import FormContainer from '../components/FormContainer'
import { Button, Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'

const UpdateUserData = () => {

  const [updateUser,{isLoading}]=useUpdateUserDataMutation()
  const [getUpdateUserData]=useGetUpdateUserDataMutation()

  const [email,setEmail]=useState('')
  const [name,setName]=useState('')

  const {id}=useParams()

  const navigate=useNavigate()

  useEffect(()=>{
   async function fetchUser(){
      const res=await getUpdateUserData(id).unwrap()
      setEmail(res.email)
      setName(res.name)
    }
    fetchUser()
  },[id])

  const submitHandler=async(e)=>{
    e.preventDefault()
    if(!name||!email){
      toast.error("Fields can't be empty")
      return
    }
    await updateUser({email,name,_id:id})
    navigate('/admin/dashboard')
  }

  return (
    <FormContainer>
      
      <h1>Update User Info</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {isLoading && <Loader />}
        <div className="d-grid gap-2">
          <Button type="submit" variant="primary" className="mt-3">
            update
          </Button>
        </div>
      </Form>
    </FormContainer>
  )
}

export default UpdateUserData