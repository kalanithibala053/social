import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { Link, useParams } from 'react-router-dom'
import { Card, CardBody, CardText, Col, Container, Row } from 'reactstrap'
import {toast} from 'react-toastify';
import { loadPost } from '../services/post-service'
import { BASE_URL } from '../services/helper';
const PostPage=()=> {


  const {postId}=useParams()

  const [post,setPost]=useState(null)
  useEffect(()=>{
     // load post postId

     loadPost(postId).then(data=>{
        console.log(data);
        setPost(data)
     }).catch(error=>{
         console.log(error);
         toast.error("Error in loading Post")
     })

  },[])

  const printDate=(numbers)=>{
  return new Date(numbers).toLocaleDateString()
  }

  return (
    <Base>
      {/* <div>
        <h1> this is post page</h1>
        <h1>{postId}</h1>
      </div> */}

      <Container className='mt-4'>

        <Link to="/">Home</Link> / {post && (<Link to="">{post.title}</Link>)}

        <Row>
          <Col md={{
             size:12
          }}>
            
            <Card className='mt-3'>
              {
                (post) && (
                  <CardBody>
                      <CardText> Posted By <b>{post.user.name}</b> on <b>{printDate(post.addedDate)}</b> </CardText>
                      <CardText>
                        <span className='text-muted'>{post.category.categoryTitle}</span>
                      </CardText>
                      
                      <CardText className='mt-3'>
                        <h2>{post.title}</h2>
                      </CardText>
                      <div className='image-container mt-3'>
                          <img className='img-fluid' src={BASE_URL+"/post/image/"+post.imageName} />
                      </div>
                      <CardText className='mt-5' dangerouslySetInnerHTML={{__html:post.content}}>

                      </CardText>

                  </CardBody>
                )
              }
            </Card>
          </Col>
        </Row>

        <Row className='mt-2'>
           <Col md={
             {
              size:6,
              offset:4
             }

           }>
           
             {/* <h2>Comments</h2>
             {
               post && post.commments.map((c,index)=>(
                <Card className='mt-2' key={index}>
                    <CardBody>
                        <CardText> {c.content}</CardText>
                    </CardBody>

                </Card>
                  
               ))
             } */}
           </Col>
        </Row>

      </Container>
    </Base>
  )
}

export default PostPage