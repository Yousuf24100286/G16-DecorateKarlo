import React from "react";
import { Box, Flex, Heading, Text, Button, HStack, VStack } from "@chakra-ui/react";
import { FormControl, Input } from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";

import PhoneNumberInput from "./PhoneNumberInput";
import { countryOptions } from "./countries";


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      telephone: "",
    };
  }


  // handle form submit
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
    if(this.state.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }
    if(this.state.password !== this.state.confirm_password) {
      alert("Password does not match");
      return;
    }

    fetch("http://localhost/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        telephone: this.state.telephone,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 'error') {
        alert(data.message);
      } else {
        alert("Sign up successfully");
        window.location.href = "/signin";
      }
    });
  };


  render() {
    return (
      <Flex align="center" justify="center" >
        <Box w="450px" p={8} >
          <Heading as="h1" size="lg" textAlign="center" mb={4}>
            Sign Up
          </Heading>
          <Text mb={4} textAlign="center">
            Sign up to your account
          </Text>
          <form onSubmit={this.handleSubmit}>
            <VStack>
              <HStack>
                <FormControl isRequired>
                  <Input type="text" placeholder="First Name" onChange={(e)=> {this.setState({first_name:e.target.value})}} />
                </FormControl>
                <FormControl isRequired>
                  <Input type="text" placeholder="Last Name" onChange={(e)=>{this.setState({last_name:e.target.value})}} />
                </FormControl>
              </HStack>
              <FormControl isRequired>
                <Input type="text" placeholder="Username" onChange={(e)=>{this.setState({username:e.target.value})}} />
              </FormControl>
              <FormControl isRequired>
                <Input type="email" placeholder="Email" onChange={(e)=>{this.setState({email:e.target.value})}} />
              </FormControl>
              <FormControl isRequired>
                <Input type="password" placeholder="Password" onChange={(e)=>{this.setState({password:e.target.value})}} />
              </FormControl>
              <FormControl isRequired>
                <Input type="password" placeholder="Confirm Password" onChange={(e)=>{this.setState({confirm_password:e.target.value})}} />
              </FormControl>
              <FormControl mb="32px" isRequired>
                <PhoneNumberInput
                  value={this.state.telephone}
                  options={countryOptions}
                  pattern="^\+[1-9]{1}[0-9]{3,14}$"
                  placeholder="Enter phone number"
                  onChange={(e)=>{this.setState({telephone:e}) }}
                />
                {this.state.telephone}
              </FormControl>
              <Button type="submit" leftIcon={<LockIcon></LockIcon>}>
                Create Account
              </Button>
              <Text textAlign="center">
                Already have an account? <Link to="/signin">Sign In</Link>
              </Text>
            </VStack>
          </form>
        </Box>
      </Flex>
    );
  }
}

export default SignUp;


