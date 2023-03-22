import React from "react";
// import chakra ui components
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
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
      <Flex direction="column" align="center" justify="center" h="100vh">
        <Box w="400px" p={4} borderWidth="1px" borderRadius="lg">
          <Heading as="h1" size="lg" textAlign="center" mb={4}>
            Sign In
          </Heading>
          <Text mb={4} textAlign="center">
            Sign in to your account
          </Text>
          <form onSubmit={this.handleSubmit}>
            <Box mb={4}>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email"
               onChange={(e) => { this.setState({ email: e.target.value }); }}
              />
            </Box>
            <Box mb={4}>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" 
                onChange={(e) => { this.setState({ password: e.target.value }); }}
              />
            </Box>
            <Box mb={4}>
              <label htmlFor="remember">Remember me</label>
              <input type="checkbox" name="remember" id="remember" />
            </Box>
            <Box mb={4}>
              <Link to="/forgot-password">Forgot password?</Link>
            </Box>
            <Box mb={4}>
              <Button type="submit" colorScheme="teal" w="100%" >
                <Text>
                  Sign In
                </Text>
              </Button>
            </Box>
          </form>
          <Text textAlign="center">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Text>
        </Box>
      </Flex>

    );
  }
}

export default SignIn;
