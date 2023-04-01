import React from "react";
import { HStack, Button, VStack, Box, Text, FormControl, ButtonGroup } from '@chakra-ui/react'
import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panels: [
        {
          name: "Analytics",
          component: <Box>hello1</Box>
        },
        {
          name: "Add New User",
          component: <Box>hello2</Box>
        },
        {
          name: "Add New Product",
          component: <AddProduct />
        },
        {
          name: "Add New Category",
          component: <AddCategory />
        }
      ],
      currentPanel: React.createElement("Box", null, "hello")
    }
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.setState({
      currentPanel: this.state.panels[0].component
    })
  }


  handleClick = (e) => {
    console.log(e)
    this.setState({
      currentPanel: this.state.panels.filter((panel) => panel.name === e)[0].component
    })
  }




  render() {
    return(
      <HStack>
        <ButtonGroup 
          spacing="1px" rowGap={0} columnGap={0}
          flexDirection="column" width="15vw" height="80vh"
        >
          {this.state.panels.map((panel, index) => {
            return(
              <Button
                key={index} value={panel.name}
                width="100%" height="8vh"
                border="1px solid black"
                margin={0} padding={0}
                onClick={() => this.handleClick(panel.name)}
              >
                <Text>
                  {panel.name}
                </Text>
              </Button>
            )
          })}
        </ButtonGroup>
        <Box width="85vw" height="80vh" border="1px solid black">
          {this.state.currentPanel}
        </Box>
      </HStack>
  )}
};

export default Admin;