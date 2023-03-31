import React from "react";
// import chakra ui components
import { Box, Flex, Heading, Text, Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";


// build sign in page class
class SignIn extends React.Component {
  // build constructor
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  // build component did mount
  componentDidMount() {
  
  }
  componentDidUpdate() {
  
  }

  // build form submit form
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.email);
    console.log(this.state.password);
    // send data to backend
    fetch("http://localhost:5000/api/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.error) {
        alert(data.error);
      } else {
        alert("Sign in successfully");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        this.props.history.push("/");
      }
    });
  };



  render() {
    return (
      <Flex direction="column" align="center" justify="center" h="100vh" >
        <Box w="400px" p={4} borderWidth="1px" borderRadius="lg" >
          <Heading as="h1" size="lg" textAlign="center" mb={4}>
            Sign In
          </Heading>
          <Text mb={4} textAlign="center">
            Sign in to your account
          </Text>
          <form onSubmit={this.handleSubmit}>
            <VStack>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input type="email" id="email" placeholder="Email" onChange={(e) => { this.setState({ email: e.target.value }); }} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input type="password" id="password" placeholder="Password" onChange={(e) => { this.setState({ password: e.target.value }); }} />
              </FormControl>
              <Button type="submit">
                Sign In 
              </Button>
              <Text textAlign="center">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </Text>
            </VStack>
          </form>
        </Box>
      </Flex>

    );
  }
}

export default SignIn;
