import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useEffect, useState } from "react";
import{signUp} from '../services/user-service';
import{toast} from 'react-toastify';

const Signup = () =>{

    

   const [data,setData] = useState({

     name:'',
     email:'',
     password:'',
     about:''

    });

    const [error, setError] = useState({
      errors:{},
      isError:false

    });


    useEffect(()=>{
        console.log(data);
    },[data])

    // handleChange function

    const handleChange=(event,property)=>{
        // console.log("name changed");
        // console.log(event.target.value);


        // dynamic setting the value
        setData({...data,[property]:event.target.value});
        
    }

// reseting the form
    const resetData =()=>{
        setData({
            name:'',
            email:'',
            password:'',
            about:''
        })
    }

    // summiting the form 

    const submitForm=(event)=>{
       event.preventDefault()


       if(error.isError){
         toast.error("Form details invalid , correct first !!");
         setError({...error,isError:false})
         return;
       }

       console.log(data);
       //data validate

       //call server api for sending the data

       signUp(data).then((resp)=>{
            console.log(resp);
            console.log("success log");
            toast.success("User is registerd Successfully ! user id " + resp.id);
            setData({
                name:'',
                email:'',
                password:'',
                about:''
            })

       }).catch((error)=>{
          console.log(error);
          console.log("Error log");

          //handle error in proper way
          setError({
            errors:error,
            isError:true
          });
       })

    }

    return(
    <Base>
        {/* <h1>this is my Signup Page</h1>
        <p>
        we making social media app
        </p> */}

        <Container>

            <Row className="mt-4">

                {/* { JSON.stringify(data)} */}

                <Col  sm={{size:6,offset:3}}>
                
                    <Card color="dark" inverse>


                        <CardHeader>

                        <h3>
                                Fill the Details !!!
                            </h3>

                        </CardHeader>
                        <CardBody>

                            {/* creating form below here */}


                            <Form onSubmit={submitForm}>

                            {/*name field   */}
                                <FormGroup>
                                    <Label for="name">Enter Name</Label>
                                    <Input
                                    type="text"
                                    placeholder="Enter Name "
                                    id="name"
                                    onChange={(e)=>handleChange(e,'name')}
                                    value={data.name}
                                    invalid={ error.errors?.response?.data?.name ? true: false }
                                    />
                                    <FormFeedback>
                                      { error.errors?.response?.data?.name ? true: false }
                                    </FormFeedback>
                                </FormGroup>

                            {/* email field */}
                            <FormGroup>
                                    <Label for="email">Enter Email</Label>
                                    <Input
                                    type="email"
                                    placeholder="Enter Email "
                                    id="email"
                                    onChange={(e)=>handleChange(e,'email')}
                                    value={data.email}
                                    invalid={ error.errors?.response?.data?.email ? true: false }
                                    />
                                     <FormFeedback>
                                      { error.errors?.response?.data?.email? true: false }
                                    </FormFeedback>
                                </FormGroup>


                                {/* password field */}
                            <FormGroup>
                                    <Label for="password">Enter Password</Label>
                                    <Input
                                    type="password"
                                    placeholder="Enter password "                               
                                    id="password"
                                    onChange={(e)=>handleChange(e,'password')}
                                    value={data.password}
                                    invalid={ error.errors?.response?.data?.password ? true: false }
                                    
                                    />
                                    <FormFeedback>
                                      { error.errors?.response?.data?.password? true: false }
                                    </FormFeedback>
                                </FormGroup>


                                {/* about field */}
                            <FormGroup>
                                    <Label for="about">Enter About</Label>
                                    <Input
                                    type="textarea"
                                    placeholder="Enter About "
                                    //   invalid="true"
                                    id="about"
                                    style={{height:"150px"}}
                                    onChange={(e)=>handleChange(e,'about')}
                                    value={data.about}
                                    invalid={ error.errors?.response?.data?.about ? true: false }
                                    />
                                    <FormFeedback>
                                      { error.errors?.response?.data?.about? true: false }
                                    </FormFeedback>
                                </FormGroup>
                                <Container className="text-center">

                                    <Button outline color="light">Register</Button>
                                    <Button onClick={resetData} color="secondary" type="reset"className="ms-2">Reset</Button>

                                </Container>
                            </Form>



                        </CardBody>

                        </Card>


                
                
                </Col>


            </Row>
          

        </Container>
     
     </Base> 
    )
}
export default Signup;