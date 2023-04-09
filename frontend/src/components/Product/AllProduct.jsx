import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Text, Image, Button, Center, VStack } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';

class AllProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch('http://localhost:5000/api/product')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ products: data, loading: false });
        
        console.log(this.state.products);
      });
    
  }


  render() {
    if(this.state.loading) {
      return <div>Loading...</div>
    }
    return (
      <Center>
        <VStack>
          <Heading
            mt="4"
          >All Product</Heading>
            <Grid templateColumns="repeat(3, 1fr)" 
              gap={2}

            >
              {this.state.products.map((product) => (
                <GridItem key={product.id} 
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                p="4" m="4"
                textAlign="center"

                >
                  <Link to={`/product/${product.id}`}>
                    <Image 
                    src={product.product_images.filter((image) => image.main_image === true)[0].image_url} 
                    alt={product.product_name}
                    width="300px" height="300px"
                    />
                    <Heading
                      as="h5"
                      size="lg"
                      mt="4"
                    >{product.product_name}</Heading>
                  </Link>
                </GridItem>
              ))}
            </Grid>
        </VStack>
      </Center>
    )
  }
}

export default AllProduct;