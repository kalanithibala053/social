import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'

const Post=({post={title:"This is default post title",content:"This is default post content"}})=> {
  return (
    <Card className='border-0 shadow-sm mt-4'>
         <CardBody>
            <h1>{post.title}</h1>
            <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,20)+ "...."}}>
                
            </CardText>

            <div>
                <Link  className='btn btn-success' to={'/post/'+post.postId}>Read More</Link>
            </div>
         </CardBody>
    </Card>
  )
}

export default Post
