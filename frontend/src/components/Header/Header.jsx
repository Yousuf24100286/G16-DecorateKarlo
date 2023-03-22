import React, { Component } from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";


// import essential component for header bar
import { Link } from "react-router-dom";

// build header bar class
class Header extends Component {
  
  

  render() {
    return (
      <Flex as="nav" align="center" justify="space-between" wrap="wrap" p={8} bg="teal.500" color="white">
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
            <Link to="/">Ecommerce</Link>
          </Heading>
        </Flex>
        <Flex align="center" mr={5}>
          <Link to="/signin">
            <Button variant="outline" mr={6}>
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline" mr={6}>
              Sign Up
            </Button>
          </Link>
        </Flex>
      </Flex>
    );
  }
}



export default Header;