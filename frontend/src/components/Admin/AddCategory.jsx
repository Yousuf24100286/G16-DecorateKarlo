import { HStack, VStack, Text, Input, Button, FormControl } from "@chakra-ui/react";
import React, { Fragment } from "react";

class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
    console.log(e.target.description.value);
  
    if(e.target.name.value === "" || e.target.description.value === "") {
      alert("Please fill in all fields");
      return;
    }

    fetch("http://localhost/api/category/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target.name.value,
        description: e.target.description.value,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 'error') {
        alert(data.error);
      } else {
        alert("New category created successfully");
      }
    }
    );

  }


  render() {
    return(
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <HStack>
            <VStack>
              <FormControl>
                <Text>Name</Text>
                <Input type="text" name="name" />
              </FormControl>
              <FormControl>
                <Text>Description</Text>
                <Input type="text" name="description" />
              </FormControl>
              <Button 
                type="submit" onSubmit={this.handleSubmit}
                colorScheme="teal"
              >
                Add New Category</Button>
            </VStack>
          </HStack>
        </form>
      </Fragment>
    )
  }
}

export default AddCategory;