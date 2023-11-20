import {React,useEffect, useState} from 'react'
import { loadAllPosts } from '../services/post-service'
import { Row,Col ,Pagination,PaginationItem,PaginationLink, Container} from 'reactstrap'
import Post from './Post'
import { toast } from 'react-toastify'

const NewFeed=() =>{


    const [postContent,setPostContent]=useState({
        content:[],
        totalPages:'',
        totalElements:'',
        pageSize:'',
        lastPage:false,
        pageNumber:''
    })


    useEffect(()=>{

        // load all post from server
        //  loadAllPosts(0,5).then((data)=>{
             
        //     console.log(data);
        //     setPostContent(data)

        //  }).catch(error=>{
        //     toast.error("Error in Loading post")
        //  }) 
  
        changePage(0)
  
      },[])

      //change page function
      const changePage=(pageNumber=0,pageSize=5)=>{
        if(pageNumber>postContent.pageNumber && postContent.lastPage){
            return;
        }
        if(pageNumber<postContent.pageNumber && postContent.pageNumber==0){
            return;
        }
        loadAllPosts(pageNumber,pageSize).then(data=>{
            setPostContent(data)
            console.log(data);
            window.scroll(0,0)
        }).catch(error=>{
            toast.error("Error in Loading post")
        })
      }

  return (
    <div className='container-fluid'>
           <Row>
            <Col md={
                        {
                            size:10,
                            offset:1
                        }

                    }>
                        <h1>All Post  Below here! ({postContent?.totalElements})</h1>
                        

                        {
                            postContent.content.map((post)=>(
                                <Post post={post} key={post.postId}/>
                            ))
                        }
                        {/* pagination frontend part */}
                        <Container className='mt-3'>
                                <Pagination size='lg'>
                                    <PaginationItem onClick={()=>changePage(postContent.pageNumber-1)} disabled={postContent.pageNumber==0}>
                                        <PaginationLink previous>
                                            Previous
                                        </PaginationLink>
                                    </PaginationItem>
                                    {
                                      [...Array(postContent.totalPages)].map((item,index)=>(
                                       
                                            <PaginationItem onClick={()=> changePage(index)} active={index==postContent.pageNumber} key={index}>
                                                <PaginationLink >
                                                    {index+1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        
                                        ))  
                                    }
                                    <PaginationItem onClick={()=>changePage(postContent.pageNumber+1)} disabled={postContent.lastPage}>
                                        <PaginationLink next>
                                            Next
                                        </PaginationLink>
                                    </PaginationItem>
                                </Pagination>


                        </Container>
                        
                        
             </Col>

         </Row>
            
    </div>
        // <div className="container-fluid">
                
        // </div>

  )
}

export default NewFeed
