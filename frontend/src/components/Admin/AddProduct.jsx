import React, { Fragment } from "react";
import { HStack, Button, VStack, Box, Text, FormControl, ButtonGroup, Input } from '@chakra-ui/react'

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      variant: "",
      levels: [],
      description: "",
      category: null,
      images: [],
      categories: [],
    }
  }
  componentDidMount() {
    
  }


  render() {
    return(
      <Fragment>
        <HStack>
          <VStack>
            <FormControl>
              <Text>Name</Text>
              <Input type="text" name="name" />
            </FormControl>
            <FormControl>
              <Text>Variant</Text>
              <Input type="text" name="variant" />
            </FormControl>
            <FormControl>
              <Text>Levels</Text>
              <Input type="text" name="levels" />
            </FormControl>
            <FormControl>
              <Text>Description</Text>
              <Input type="text" name="description" />
            </FormControl>
            <FormControl>
              <Text>Category</Text>
              <Input type="text" name="category" />
            </FormControl>
            <FormControl>
              <Text>Images</Text>
              <Input type="text" name="images" />
            </FormControl>
          </VStack>
        </HStack>
      </Fragment>
    )
  }
}

export default AddProduct;