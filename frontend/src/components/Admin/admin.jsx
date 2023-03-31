import React from "react";
import { HStack, Button, VStack } from '@chakra-ui/react'


class Admin extends React.Component {

  render() {
    return(
      <HStack width="100vw" height="100%" >
        <VStack spacing={0}>
          <Button colorScheme="teal" variant="solid" size="lg" width="200px" height="30px" >Add New User</Button>
          <Button colorScheme="teal" variant="solid" size="lg" width="200px" height="30px" >Add New Product</Button>
          <Button colorScheme="teal" variant="solid" size="lg" width="200px" height="30px" >Add New Category</Button>
        </VStack>
              
      </HStack>
  )}
};

export default Admin;