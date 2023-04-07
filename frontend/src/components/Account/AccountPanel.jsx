import { FormControl, FormLabel, HStack, Text, Input, Box, Heading, Button } from '@chakra-ui/react';
import React from 'react';

class AccountPanel extends React.Component {
  // constructor that also takes in props
  constructor(props) {
    super(props);
    // set the state
    this.state = {
      id: "",
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      telephone: "",
      changed_information: [],
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",

    };
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      telephone: user.telephone,
    })
  }

  updateInformation = (e) => {
    e.preventDefault();
    console.log(this.state.changed_information)
    if(this.state.changed_information.length === 0) {
      alert("No information has been changed")
    } else {
      fetch("http://localhost:5000/api/auth/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.state.id,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          username: this.state.username,
          email: this.state.email,
          telephone: this.state.telephone,
          changed_information: this.state.changed_information,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 'error') {
          alert(data.message);
        } else {
          alert("Update successfully");
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          window.location.href = "/account";
        }
      });
    }
  }

  updatePassword = (e) => {
    e.preventDefault();
    console.log("update password")
    if(this.state.newPassword !== this.state.confirmPassword) {
      alert("New password and confirm password do not match")
      return;
    }
    else if(this.state.newPassword.length < 8) {
      alert("New password must be at least 8 characters")
      return;
    }

    fetch("http://localhost:5000/api/auth/updatePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.id,
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 'error') {
        alert(data.message);
      } else {
        alert("Password Update successfully");
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        window.location.href = "/account";
      }
    });


  
  }


  render() {
    return (
      <HStack
      p={0} m={0}
      alignItems="flex-start" justifyContent="flex-start">
        <Box w="500px" p={8}  >
          <Heading
            as="h2" size="lg" textAlign="center" mb={8}
          >Account Information</Heading>
          <form width="30%" onSubmit={this.updateInformation}>
            <FormControl>
              <HStack>
                <FormLabel width="200px">User ID:</FormLabel>
                <Input type="text" value={this.state.id} readOnly />
              </HStack>
            </FormControl>
            <FormControl>
              <HStack>
                <FormLabel width="200px">First Name:</FormLabel>
                <Input type="text" value={this.state.first_name} 
                onChange={(e) => {
                  this.setState({first_name: e.target.value})
                  this.state.changed_information.push("first_name")
                }}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <HStack>
                <FormLabel width="200px">Last Name:</FormLabel>
                <Input type="text" value={this.state.last_name} 
                onChange={(e) => {
                  this.setState({last_name: e.target.value})
                  this.state.changed_information.push("last_name")
                }}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <HStack>
                <FormLabel width="200px">Username:</FormLabel>
                <Input type="text" value={this.state.username} 
                readOnly
                />
              </HStack>
            </FormControl>
            <FormControl>
              <HStack>
                <FormLabel width="200px">Email:</FormLabel>
                <Input type="text" value={this.state.email} 
                onChange={(e) => {
                  this.setState({email: e.target.value})
                  this.state.changed_information.push("email")
                }}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <HStack>
                <FormLabel width="200px">Telephone:</FormLabel>
                <Input type="text" value={this.state.telephone} 
                readOnly
                />
              </HStack>
            </FormControl>
            <FormControl>
              <Button colorScheme="teal" variant="outline" mt={4} width="100%" 
              type="submit"
              >Save Changes</Button>
            </FormControl>
          </form>
        </Box>
        <Box w="600px" p={8}  >
          <Heading
            as="h2" size="lg" textAlign="center" mb={8}
          >Change Password</Heading>
          <form width="30%" onSubmit={this.updatePassword}>
            <FormControl>
              <HStack>
                <FormLabel width="300px">Current Password:</FormLabel>
                <Input type="password"
                onChange={(e) => {
                  this.setState({oldPassword: e.target.value})
                }}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <HStack>
                <FormLabel width="300px">New Password:</FormLabel>
                <Input type="password" 
                onChange={(e) => {
                  this.setState({newPassword: e.target.value})
                }}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <HStack>
                <FormLabel width="300px">Confirm New Password:</FormLabel>
                <Input type="password" 
                onChange={(e) => {
                  this.setState({confirmPassword: e.target.value})
                }}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <Button colorScheme="teal" variant="outline" mt={4} width="100%" 
              type='submit'
              >Save Changes</Button>
            </FormControl>
          </form>
        </Box>
      </HStack>
    );
  }
}

export default AccountPanel;