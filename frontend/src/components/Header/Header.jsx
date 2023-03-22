import React, { Component } from "react";
import { Flex, Heading, Button, Container, Text, Box, Spacer } from "@chakra-ui/react";

// import essential component for header bar
import { Link } from "react-router-dom";

// build header bar class
class Header extends Component {
  
  

  render() {
    return(
      <div>
        <Text>Flex and Spacer: Full width, equal Spacing</Text>
        <Flex minWidth='max-content' height="10px">
          <Box w='170px' h='10' bg='red.500' />
          <Spacer />
          <Box w='170px' h='10' bg='red.500' />
          <Spacer />
          <Box w='180px' h='10' bg='red.500' />
        </Flex>
      </div>
    )
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