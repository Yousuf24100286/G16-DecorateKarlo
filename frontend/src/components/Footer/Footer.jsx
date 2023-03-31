import { Box, HStack, VStack } from '@chakra-ui/react';
import React from 'react';


class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupedLinks : []  
    };
  }

  componentDidMount() {
    this.setState({
      groupedLinks: [
        {
          head: 'Our Company',
          links : [
            { name: 'About Us', url: '/about-us' },
            { name: 'See All Products' , url: '/products' },
            { name: 'Contact Us', url: '/contact-us' },
          ]
        },
        {
          head: 'My Order',
          links : [
            { name: 'Track Order', url: '/track-order' },
            { name: 'Returns & Exchange', url: '/returns-and-exchange' },
            { name: 'FAQ' , url: '/faq' },
          ]
        },
        {
          head: 'Policies',
          links : [
            { name: 'Shipping Policy', url: '/shipping-policy' },
            { name: 'Privacy Policy', url: '/privacy-policy' },
            { name: 'Terms & Conditions', url: '/terms-and-conditions' },
          ]
        },
      ]
    })
  }


  render() {
    return (
      <Box width="100%" bgColor="blackAlpha.800" height="200px" >
        <HStack
          width="100%"
          height="100%"
          spacing="10px"
          justifyContent="space-around"
        >
          {this.state.groupedLinks.map((group, index) => (
            <VStack key={index}>
              <Box>{group.head}</Box>
              {group.links.map((link, index) => (
                <Box key={index}>{link.name}</Box>
              ))}
            </VStack>
          ))}
        </HStack>
      </Box>
    );
  }
}

export default Footer;