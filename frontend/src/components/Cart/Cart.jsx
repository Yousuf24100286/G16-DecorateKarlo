import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Text, Image, Heading, Spacer, VStack, HStack ,IconButton } from '@chakra-ui/react';
import { Icon, DeleteIcon, AddIcon, MinusIcon } from '@chakra-ui/icons';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      id: '',
      user_id: '',
      cart_items: [],
    };
  }

  async componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    fetch('http://localhost/api/cart/'+cart.id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      this.setState({
        id: data.id,
        user_id: data.user_id,
        cart_items: data.cart_items,
      });
      this.setState({ loading: false });
    })
    .catch((err) => console.log(err));
  }

  render() {
    if(this.state.loading) {
      return <div>Loading...</div>;
    }
    return (
      <Box
        p={5}
      >
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {
            this.state.cart_items.map((item) => (
              <VStack key={item.id} p={5} shadow="md" borderWidth="1px"
                borderRadius="md"
                align={"center"}

              >    
                <CartItem item_details={item} />
                <HStack>
                  <IconButton 
                    icon={<AddIcon />}
                    variant="outline"
                    aria-label="Delete"
                    size="sm"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    variant="outline"
                    colorScheme="red"
                    aria-label="Delete"
                    size="sm"
                  />
                  <IconButton 
                    icon={<MinusIcon />}
                    variant="outline"
                    aria-label="Delete"
                    size="sm"
                  />


                </HStack>
              </VStack>
            ))
          }
        </Grid>
      </Box>
    );
  }
}

export default Cart;



class CartItem extends React.Component {
  constructor(props) {
    super(props);
    const item = props.item_details ;
    this.state = {
      id: item.id,
      variant_id: item.product_variant_id,
      quantity: item.quantity,
      product_variant: item.product_variant,
    };
  }

  
  render() {
    if(this.state.loading) {
      return <div>Loading...</div>;
    }
    return (
      <VStack>
        <Variant variant_details={this.state.product_variant} />
        <Spacer 
          height="10px"
        />
        <Heading
          as="h5" size="sm"
        >Quantity {this.state.quantity}</Heading>
      </VStack>
    );
  }
}


class Variant extends React.Component {
  constructor(props) {
    super(props);
    const variant = props.variant_details ;
    this.state = {
      id: variant.id,
      product_id: variant.product_id,
      attribute: variant.variant_attribute,
      level: variant.variant_level,
      price: variant.variant_price,
      product: variant.product,
    };
  }

  
  render() {
    if(this.state.loading) {
      return <div>Loading...</div>;
    }
    return (
      <VStack>
        <Product product_details={this.state.product} />
        <Box>
          <Heading
            as="h5" size="sm"
          >{this.state.attribute} {this.state.level}</Heading>
          <Spacer 
            height="10px"
          />
          <Heading
            as="h5" size="sm"
          >Price {this.state.price}</Heading>
        </Box>
      </VStack>
    );
  }
}



class Product extends React.Component {
  constructor(props) {
    super(props);
    const product = props.product_details ;
    this.state = {
      id: product.id,
      name: product.product_name,
      description: product.product_description,
      category_id: product.category_id,
      product_images: product.product_images[0],
    };
  }

  render() {
    return (
      <Box>
        <Heading as="h4" size="md">{this.state.name}</Heading>
        <Spacer 
          height="10px"
        />
        <ProductImage image_details={this.state.product_images} />
      </Box>
    )
  }

}



class ProductImage extends React.Component {
  constructor(props) {
    super(props);
    const image = props.image_details ;
    this.state = {
      id: image.id,
      product_id: image.product_id,
      image_url: image.image_url,
    };
  }

  render() {
    return (
      <Box>
        <Image src={this.state.image_url} alt="product image" 
          boxSize="150px"
        />
      </Box>
    )
  }
}