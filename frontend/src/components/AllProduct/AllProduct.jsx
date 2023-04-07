import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Text, Image, Button } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';

/**
 products = [
  {
    "category_id": "5f9f1b0b0b5b1c2b1c8b8b0d",
    discount_id: "5f9f1b0b0b5b1c2b1c8b8b0d",
    id: "5f9f1b0b0b5b1c2b1c8b8b0d",
    product_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl a nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget ultricies nisl nisl a nisl.",
    product_images: [
      image_url: "https",
      main_image: true
    ],
    product_name: "Product Name",
  }
 */

class AllProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
    };

  }

  componentDidMount() {
    fetch('http://localhost:5000/api/product')
      .then((res) => res.json())
      .then((data) => {
        if(data.status === 'error') {
          console.log(data.message);
        } else {
          this.setState({ products: data });
          this.setState({ loading: false });
          
        }
      });
  }


  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    console.log(this.state.products);
    return (
      <Box>
        <Heading>Products</Heading>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {this.state.products.map((product) => (
            <GridItem key={product.id}>
              <Link to={`/product/${product.id}`}>
                <Image src={product.product_images[0].image_url} />
                <Text>{product.product_name}</Text>
                <Text>{product.product_description}</Text>
                <Button>Buy Now</Button>
              </Link>
            </GridItem>
          ))}
        </Grid>
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          {this.state.products.map((product) => (
            <Box key={product.id}>
              <Link to={`/product/${product.id}`}>
                <Image src={product.product_images[0].image_url} />
                <Text>{product.product_name}</Text>
                <Text>{product.product_description}</Text>
                <Button>Buy Now</Button>
              </Link>
            </Box>

          ))}
        </Box>
      </Box>
    );
  }
}

export default AllProduct;