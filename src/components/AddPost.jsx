import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import { loadAllCategories } from '../services/category-service';
import { createPost as doCreatePost } from '../services/post-service';
import JoditEditor from 'jodit-react';
import { getCurrentUserDetails } from '../auth';
import { toast } from "react-toastify"

const AddPost=()=> {


   const editor = useRef(null)
   // const [content, setContent] = useState('')
   const [categories,setCategories] = useState([])

   const [post , setPost] = useState({
         title:'',
         content:'',
         categoryId:''
   })

   const [user , setUser]= useState(undefined)

  

   useEffect(
      ()=>{

         setUser(getCurrentUserDetails())
         loadAllCategories().then((data)=>{
            console.log(data);
            setCategories(data)
         }).catch(error=>{
            console.log(error);
         })
      },
      []
   )

   // field change function
   const fieldChanged=(event)=>{
      // console.log(event);
      setPost({...post,[event.target.name]:event.target.value})
   }

   // create post function
   const createPost =(event)=>{
         event.preventDefault();
         // console.log("form submited")

          // console.log(post)
         if (post.title.trim() == '') {
            toast.error("post  title is required !!")
            return;
         }

         if (post.content.trim() == '') {
               toast.error("post content is required !!")
               return
         }

         if (post.categoryId == '') {
               toast.error("select some category !!")
               return;
         }
        // summit the form on server
        post['userId'] = user.id
        doCreatePost(post).then(data => {

            toast.success("Post Created !!")
            console.log(post)
            setPost({
                title: '',
                content: '',
                categoryId: ''
            })
        }).catch((error) => {
            toast.error("Post not created due to some error !!")
            console.log(error)
        })

    }

   const contentFieldChange=(data)=>{
      setPost({...post,'content':data})
   }

  return (
    <div className='wrapper'>
        

        <Card className='shadow-sm mt-2'>

            <CardBody>
               {/* {JSON.stringify(post)} */}
               <h3>Share Your Post</h3>

                <Form onSubmit={createPost}>
                     <div className='my-3'>
                        <Label for="title">Post Title</Label>
                        <Input 
                         type='text'
                         id='title'
                         placeholder='Enter here'
                         className='rounded-0'
                         name='title'
                         onChange={fieldChanged}
                        />
                     </div>

                     <div className='my-3'>
                        <Label for="content">Post Content</Label>
                        {/* <Input 
                         type='textarea'
                         id='content'
                         placeholder='Enter here'
                         className='rounded-0'
                         style={{height:"250px"}}
                        
                        /> */}


                        <JoditEditor
                                 ref={editor}
                                 value={post.content}
                                 
                                 tabIndex={1} // tabIndex of textarea'
                                 
                                 onChange={contentFieldChange}
                              />

                     </div>

                     <div className='my-3'>
                        <Label for="category">Post Category</Label>
                        <Input 
                            type='select'
                            id='category'
                            placeholder='Enter here'
                            className='rounded-0'
                            name='categoryId'
                            onChange={fieldChanged}
                            defaultValue={0}
                         >
                           <option disabled value={0}>--Select Category--</option>
                       
                           {
                              categories.map((category)=>(
                                   <option value={category.categoryId} key={category.categoryId}>
                                      {category.categoryTitle}
                                   </option>
                              ))
                           }


                        </Input>
                     </div>
                     <Container className='text-center'>
                        <Button type='submit' color='success'>Create Post</Button>
                        <Button className='ms-2' color='danger'>Reset Post</Button>
                     </Container>
                </Form>

               


            </CardBody>

        </Card>
      
    </div>
  )
}

export default AddPost
