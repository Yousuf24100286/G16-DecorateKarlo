import React from "react";
import { Box, Flex, Heading, Text, Button, Spacer, Stack, Center, Input } from "@chakra-ui/react";
// import account and lock icons from chakra ui
import { LockIcon, AtSignIcon } from "@chakra-ui/icons";


import { Link } from "react-router-dom";



class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: ""
    };
  }


  // handle form submit
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.first_name);
    console.log(this.state.last_name);
    console.log(this.state.username);
    console.log(this.state.email);
    console.log(this.state.password);
    console.log(this.state.confirm_password);
    // send data to backend
    fetch("http://localhost:5000/api/users/signup", {
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
        confirm_password: this.state.confirm_password
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.error) {
        alert(data.error);
      } else {
        alert("Sign up successfully");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        this.props.history.push("/");
      }
    });
  };


  render() {
    return (
      <Flex align="center" justify="center" h="100vh">
        <Box w="400px" p={8} borderWidth="1px" borderRadius="lg">
          <Heading as="h1" size="lg" textAlign="center" mb={4}>
            Sign Up
          </Heading>
          <Text mb={4} textAlign="center">
            Sign up to your account
          </Text>
          <form>
            <Stack direction="column" spacing={20}>
              <Stack spacing={40} direction="row" alignItems="center">
                <input type="text" name="first_name" id="first_name" placeholder="First Name" />
                <input type="text" name="last_name" id="last_name" placeholder="Last Name" />          
              </Stack>
              <Stack spacing={40} direction="row" alignItems="center">
                <input type="text" name="username" id="username" placeholder="username" />
                <input type="email" name="email" id="email" placeholder="Email"/>
              </Stack>
              <Stack spacing={40} direction="row" alignItems="center">
                <input type="password" name="password" id="password"  placeholder="Password"/>
                <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password" />
              </Stack>
              <Center spacing={40} direction="row" alignItems="center">
                <Button type="submit" colorScheme="green" borderRadius="20px" leftIcon={<LockIcon color="white" />} backgroundColor="green" >
                  <Text color="white">
                    Create Account
                  </Text>
                </Button>
              </Center>
            
            </Stack>
            </form>
          <Text textAlign="center">
            Already have an account? <Link to="/signin">Sign In</Link>
          </Text>
        </Box>
      </Flex>
    );
  }
}

export default SignUp;


