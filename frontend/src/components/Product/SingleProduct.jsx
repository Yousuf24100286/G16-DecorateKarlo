import React, { Fragment } from "react";
import { Link , useParams , withRouter } from "react-router-dom";
import { Box, Heading, Text, Image, Button, VStack, HStack, ButtonGroup, Divider, Select, Input } from "@chakra-ui/react";
import { Textarea, FormLabel, FormControl } from "@chakra-ui/react";
import StarRatings from "react-star-ratings"

const SingleProduct = (props) => {
  const { id } = useParams();
  return (
    <__SingleProduct__ product_id={id} />
  )
}

class __SingleProduct__ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.product_id,
      productData: {},
      variantions: [],
      images: [],
      loading: false,
      
      reviews: [],
      review: '',
      user: {},
      rating: 0,
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    fetch(`http://localhost:5000/api/product/id/${this.state.id}`)
    .then((res) => res.json())
    .then(async (data) => {
      console.log(data);
      await this.setState({ productData: data});
      await this.setState({ variantions: data.product_variants });
      await this.setState({ images: data.product_images });
      await this.setState({ user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {} });
      await this.setState({ reviews: data.product_reviews });
      await this.setState({ rating: 0 });

      console.log(this.state);
      //this.setState({ loading: false });
    });

    fetch(`http://localhost:5000/api/product/review/${this.state.id}`)
    .then((res) => res.json())
    .then(async (data) => {
      console.log(data);
      await this.setState({ reviews: data });
      console.log(this.state);
      this.setState({ loading: false });
    });



  }




  changeRating = (newRating, name) => {
    this.setState({
      rating: newRating
    });
  }

  addReview = async () => {
    const data = {
      product_id: this.state.id,
      user_id: this.state.user.id,
      rating: this.state.rating,
      review: this.state.review,
    }
    console.log(data);
    const response = await fetch('http://localhost:5000/api/product/review/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log(responseData);
    if(responseData.status === 'success') {
      this.setState({ reviews: [...this.state.reviews, responseData.data] });
    }
  }

  render()  {
    if(this.state.loading) {
      return <div>Loading...</div>
    }
    return (
      <Box
        w="100%" minH="85vh" p="2rem"
      >
        <VStack>
          <HStack w="100%" spacing="1rem" m={0} p={4}
            align="flex-start"   
          >
            <ProductImage productImages={this.state.images} />
            <VStack
              border="1px" borderColor="gray.200" borderRadius="md" p="4" m="4"
              maxW="60vw" align={["flex-start", "flex-start", "flex-start", "flex-start"]}
            >
              <ProductDetails productName={this.state.productData.product_name} productDescription={this.state.productData.product_description} /> 
              <VariantSelection variants={this.state.variantions} product_id={this.state.id} />
            </VStack>
          </HStack>
          <Box>
            <Heading as="h2" size="lg" align="left" >Add Review</Heading>
          </Box>
          <Box
            width="100%" height="-moz-min-content"
          >
            <form>
              <HStack>
                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" value={this.state.user.email}  />
                </FormControl>
                
              </HStack>
              <FormControl id="rating">
                <HStack>
                  <FormLabel>Rating</FormLabel>
                  <StarRatings
                    rating={this.state.rating}
                    starRatedColor="gold"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name='rating'
                    size={18}
                  />
                </HStack>
              </FormControl>
              <Textarea placeholder="Write a review" 
                onChange={(e) => this.setState({ review: e.target.value })}
              />
              <Button
                onClick={this.addReview}
              >Submit</Button>
            </form>
          </Box>
          <Box>
            <Heading as="h2" size="lg" align="left" >Reviews</Heading>
            {
              this.state.reviews?.map((review) => (
                <Box
                  border="1px" borderColor="gray.200" borderRadius="md" p="4" m="4"
                  maxW="60vw" align={["flex-start", "flex-start", "flex-start", "flex-start"]}
                >
                  <VStack>
                    <Text>{review.user.first_name} {review.user.last_name}</Text>
                    <StarRatings
                      width="200px"
                      rating={review.rating}
                      starRatedColor="gold"
                      changeRating={this.changeRating}
                      numberOfStars={5}
                      name='rating'
                    />
                  </VStack>
                  <Text>{review.comment}</Text>
                </Box>
              ))
            }
          </Box>
        </VStack>
      </Box>
    )
  }

}

export default SingleProduct ;




class VariantSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: props.product_id,
      variants: props.variants,
      selected_variant: props.variants[0]?.id,
      selected_quantity: 1,
      price: props.variants[0]?.variant_price,
      loading: true,
    }
  }

  componentDidMount() {  
    this.setState({ loading: false });
  }

  addToCart = async () => {
    const data = {
      product_id: this.state.product_id,
      variant_id: this.state.selected_variant,
      quantity: this.state.selected_quantity,
      price: this.state.price,
    }
    // if guest user then add to local storage
    if(!localStorage.getItem('user') || localStorage.getItem('user') == 'undefined' || localStorage.getItem('user') == 'null' || localStorage.getItem('user') == 'false') {
      let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
      cart.push(data);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Added to cart');
      return;
    }

    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    

    const response = await fetch('http://localhost:5000/api/cart/add/' + cart.id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    console.log(json);
    alert(json.message);
  }


  handleVariantChange = async (event) => {
    this.setState({ selected_variant: event.target.value });
    await new Promise(resolve => setTimeout(resolve, 200));
    this.setState({ price: this.state.variants.find(variant => variant.id == event.target.value).variant_price * this.state.selected_quantity });
  }
  handleQuantityChange = async (event) => {
    this.setState({ selected_quantity: event.target.value });
    await new Promise(resolve => setTimeout(resolve, 200));
    this.setState({ price: this.state.variants.find(variant => variant.id == this.state.selected_variant).variant_price * this.state.selected_quantity });
  }

  render() {
    if(this.state.loading) {
      return <div>Loading...</div>
    } else {
      return (
        <Fragment>
          <HStack w="100%" spacing="1rem" m={0} p={4}
              >
                <Select
                  placeholder="Select option" 
                  value={this.state.selected_variant}
                  onChange={this.handleVariantChange}
                >
                  {
                    this.state.variants?.map((variant) => (
                      <option value={variant.id}>{variant.variant_level} Rs. {variant.variant_price}</option>
                    ))
                  }
                </Select>
                <Select
                  placeholder="Select Quantity"
                  value={this.state.selected_quantity}
                  onChange={this.handleQuantityChange}
                >
                  {
                    [...Array(10).keys()].map((number) => (
                      <option value={number + 1}>{number + 1}</option>
                    ))
                  }
                </Select>
              </HStack>
              <Box
                width="100%" height="-moz-min-content"
                m="0px" p="0px"
                align="center"
              >
                <Button 
                  align="center"
                  w="50%" variant="outline" 
                  onClick={this.addToCart}  
                >
                    Add to Cart Rs.({this.state.price})
                </Button>
              </Box>
        </Fragment>
      )
    }
  }
}




































































































class ProductImage extends React.Component {
  constructor(props) {  
    super(props);  
    this.state = {  
      images: props.productImages,
      curentImage: '',
      loading: true,
    };  
  }

  componentDidMount() {
    this.setState({ curentImage: this.state.images[0]?.image_url });
    this.setState({ loading: false });
  }

  render() {
    if(this.state.loading) {
      return <div>Loading...</div>
    } else  {
      return (
        <Box
          border="1px" borderColor="gray.200" borderRadius="md" textAlign="center" 
        >
          <Image
            src={this.state.curentImage}
            w="400px" h="400px"
          />
          <ButtonGroup  spacing="1rem" mt="0.5rem">
            {
              this.state.images.map((image) => (
                <Button onClick={() => this.setState({ curentImage: image.image_url })}>
                  <Image src={image.image_url} w="50px" h="50px"  />
                </Button>
              ))
            }
          </ButtonGroup>
        </Box>
      )
    }
  
  }
}


class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName : props.productName,
      productDescription: props.productDescription,
      loading: true,
    }
  }

  componentDidMount() {
    this.setState({ loading: false });
  }
  render() {
    if(this.state.loading) {
      return <div>Loading...</div>
    } else {
      return (
        <Fragment>
          <Heading>{this.state.productName}</Heading>
          <Divider width="100%" />
          <Text>{this.state.productDescription}</Text>
          <Text>{this.state.productDescription}</Text>
          <Text>{this.state.productDescription}</Text>
        </Fragment>
      )
    }
  
  
  }

}
