import React from "react";
import AccountPanel from "./AccountPanel";
import { Link } from "react-router-dom";
import { Flex, Box, Heading, Text, Button, Stack, HStack, VStack, ButtonGroup, border } from "@chakra-ui/react";


class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      telephone: "",
      panels : [
        {
          name: "Account",
          component: <AccountPanel />
        },
        {
          name: "Orders",
          component: <Box>hello2</Box>
        },
        {
          name: "Addresses",
          component: <Box>hello3</Box>
        },
        {
          name: "Payment Methods",
          component: <Box>hello4</Box>
        },
        {
          name: "Wishlist",
          component: <Box>hello5</Box>
        },
      ],
      currentPanel: ""
    };
  }

  componentDidMount() {
    const emptyState = ['null', 'undefined', null, undefined ]
    if(emptyState.includes(localStorage.getItem("token"))) {
      window.location.href = "/signin";
    }
    if(emptyState.includes(localStorage.getItem("user"))) {
      window.location.href = "/signin";
    }
    if(localStorage.getItem("guest") === "true") {
      window.location.href = "/signin";
    }

    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    this.setState({
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      telephone: user.telephone,
    });

    this.setState({
      currentPanel: this.state.panels[0]
    });

  };

  componentDidUpdate() {
    const emptyState = ['null', 'undefined', null, undefined ]
    if(emptyState.includes(localStorage.getItem("token"))) {
      window.location.href = "/signin";
    }
    if(emptyState.includes(localStorage.getItem("user"))) {
      window.location.href = "/signin";
    }
    if(localStorage.getItem("guest") === "true") {
      window.location.href = "/signin";
    }
  };


  signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.setItem("guest", "true");
    window.location.href = "/signin";
  };
  handlePanelChange = (e) => {
    this.setState({
      currentPanel: this.state.panels.filter((panel) => panel.name === e.target.value)[0]
    })
  };

  render() {
    return (
      <Box width="100%" minH="50vh"  >
        <Stack 
          p="4px" paddingInline="20px"
          width="100%" direction="row" justifyContent="space-between" 
          borderBottom="2px" borderColor="black">
          <Text
            fontSize="2xl" fontWeight="bold" textAlign="center"
          >{this.state.first_name} {this.state.last_name}</Text>
          <Button 
            onClick={this.signOut} size="2xl" color="white" bg="red.500" p="0.5rem 1rem"
          >Sign Out</Button>
        </Stack>
        <HStack
          p={0} m={0}
          alignItems="flex-start" justifyContent="flex-start"
        >
          <ButtonGroup
          spacing="1px" rowGap={0} columnGap={0}
          flexDirection="column" width="15vw" minH="50vh"
          >
              {this.state.panels.map((panel, index) => {
                return(
                  <Button
                    key={index} value={panel.name}
                    width="100%" height="8vh"
                    m={0} p={0}
                    border="1px solid black"
                    onClick={this.handlePanelChange}
                  >{panel.name}</Button>
                )
              })}
          </ButtonGroup>
          <Box
            width="85vw" minH="80vh" border="1px solid black"
          >
            {this.state.currentPanel.component}
          </Box>
        </HStack>
      </Box>
    );
  }

};

export default Account;