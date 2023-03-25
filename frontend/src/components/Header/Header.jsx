import { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
// import profile icon
import { Avatar } from "@chakra-ui/react";


const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuBgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.100");

  return (
    <Box bg="white" boxShadow="sm">
      <Flex
        align="center"
        justify="space-between"
        maxW="7xl"
        mx="auto"
        px={{ base: 4, md: 6, lg: 8 }}
        py={{ base: 2, md: 4 }}
      >
        <Flex align="center">
          <Text fontWeight="bold" fontSize="xl">
            DecorateKarlo
          </Text>
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            display={{ md: "none" }}
            ml={2}
            onClick={onOpen}
          />
        </Flex>

        <Spacer />


        <Box
          display={{ base: "none", md: "block" }}
          pos="relative"
          onClick={toggleMenu}
          _hover={{ cursor: "pointer" }}
        >
          <Text color={textColor}>Cart</Text>
          <Box
            bg={menuBgColor}
            color={textColor}
            pos="absolute"
            top="100%"
            right={0}
            zIndex={10}
            display={isMenuOpen ? "block" : "none"}
            mt={2}
            py={2}
            px={3}
            borderRadius="sm"
            boxShadow="md"
          >
            <Text fontWeight="bold" mb={2}>
              Your Cart
            </Text>
            <Text fontSize="sm">Item 1</Text>
            <Text fontSize="sm">Item 2</Text>
            <Text fontSize="sm">Item 3</Text>
          </Box>
        </Box>

        <IconButton
          aria-label="Close menu"
          icon={<CloseIcon />}
          display={{ md: "none" }}
          ml={2}
          onClick={onClose}
        />
      </Flex>

      <Box
        bg={menuBgColor}
        color={textColor}
        pos="absolute"
        top="100%"
        right={0}
        zIndex={10}
        display={isOpen ? "block" : "none"}
        p={2}
        borderRadius="sm"
        boxShadow="md"
      >
        <Text fontWeight="bold" mb={2}>
          Your Cart
        </Text>
        <Text fontSize="sm">Item 1</Text>
        <Text fontSize="sm">Item 2</Text>
        <Text fontSize="sm">Item 3</Text>
      </Box>
      <Avatar size="xs" name="Dan Abrahmov"  />
      
    </Box>
  );
};

export default Header;




















// import React, { Component } from "react";
// import { Flex, Heading, Button, Container, Text, Box, Spacer, Stack } from "@chakra-ui/react";

// // import essential component for header bar
// import { Link } from "react-router-dom";

// // build header bar class
// class Header extends Component {
  
  

//   render() {
//     return(
//       <Container backgroundColor="white" border="2px" borderColor="black" height="20px">
//         <Stack direction="row" minWidth="max-content">
//           <Box width="25%">
//             <Text>Logo</Text>
//           </Box>
//           <Box width="50%">

//           </Box>
//           <Box width="25%">
//           </Box>
//         </Stack>
//       </Container>
//     )
//     return (
//       <Flex as="nav" align="center" justify="space-between" wrap="wrap" p={8} bg="teal.500" color="white">
//         <Flex align="center" mr={5}>
//           <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
//             <Link to="/">Ecommerce</Link>
//           </Heading>
//         </Flex>
//         <Flex align="center" mr={5}>
//           <Link to="/signin">
//             <Button variant="outline" mr={6}>
//               Sign In
//             </Button>
//           </Link>
//           <Link to="/signup">
//             <Button variant="outline" mr={6}>
//               Sign Up
//             </Button>
//           </Link>
//         </Flex>
//       </Flex>
//     );
//   }
// }



// export default Header;