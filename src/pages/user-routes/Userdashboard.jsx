import React, { useEffect, useState } from 'react'
import Base from '../../components/Base';
import AddPost from '../../components/AddPost';
import { Container } from 'reactstrap';
import NewFeed from '../NewFeed';
import { getCurrentUserDetails } from '../../auth';
import { loasPostUserWise } from '../../services/category-service';
import { toast } from 'react-toastify';
const Userdashboard =()=> {


  const[user,setUser]=useState({})
  const[posts, setPosts]=useState([])
  useEffect(()=>{
    console.log(getCurrentUserDetails())
    setUser(getCurrentUserDetails())


    loasPostUserWise(getCurrentUserDetails().id).then(data=>{
       console.log(data)
       setPosts([...data])
    })
    .catch(error=>{
      console.log(error)
      toast.error("error in loading user posts")
    })

  },[])

  return (
   <Base>
    <Container>
      <AddPost/>
      {/* <h3 className='my-3'>Post Count : ({posts.length})</h3> */}
    </Container>
    <NewFeed/>
   </Base>
  )
}

export default Userdashboard
