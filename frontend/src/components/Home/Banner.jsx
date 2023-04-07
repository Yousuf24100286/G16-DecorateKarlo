import { Box, Button, HStack, Image, Link, VStack } from '@chakra-ui/react';
import React from 'react';
import { ReactComponent as Logo } from '../../assets/DecorateKarlo-logo.svg';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }
  componentDidMount() {
    
    // Uncomment when categories are added to the backend
    fetch('http://localhost:5000/api/category/all')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ categories: data });
      });
  }



  render() {
    return (
      <VStack bg="red" width="100%" height="100vh"
      borderBottom="2px"
      backgroundImage={require('../../assets/banner-image.png')}
      backgroundSize='cover' backgroundPosition='center center' backgroundRepeat='no-repeat'  
      align="center" justify="center" spacing="50px"
      >
        <Logo />
        <Title>Beautify Your Homes</Title>
        <Button 
          backgroundColor="white" 
          textColor="blackAlpha" 
          variant="solid" size="lg" width="300px" 
          borderRadius="50"
        >
          <Link href="/categories">SHOP BY CATEGORIES</Link>
        </Button>
        <HStack spacing="50px">
          {this.state.categories.map((category) => (
            <Link 
              key={category.id} href={`/category/${category.id}`}
              color="white" fontSize="4xl" fontFamily="heading"

            >
              {category.category_name}
            </Link>
          ))}

        </HStack>
      </VStack>
    )
  }

}


export default Banner;


class Title extends React.Component {
  render() {
    return (
      <Box 
        color="white" 
        fontSize="7xl" 
        fontFamily="heading"
        fontWeight="bold"
        textAlign="center"
      >
        {this.props.children}
      </Box>
    )
  }
}