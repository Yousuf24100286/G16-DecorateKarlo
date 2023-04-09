import React from "react";
import { Link , useParams , withRouter } from "react-router-dom";
import { Box, Heading, Text, Image, Button, VStack, HStack, ButtonGroup, Spacer, Divider, Select, Input, FormControl } from "@chakra-ui/react";

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
      curentImage : '',

      selected_variant: '',
      selected_quantity: 1,
      price: 0,

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
      await this.setState({ curentImage: data.product_images.filter((image) => image.main_image === true)[0].image_url });
      await this.setState({ selected_variant: data.product_variants[0].id });
      await this.setState({ selected_quantity: 1 });
      await this.setState({ price: data.product_variants[0].variant_price });
      console.log(this.state);
      this.setState({ loading: false });
    });
  }




  render()  {
    if(this.state.loading) {
      return <div>Loading...</div>
    }
    return (
      <Box
        w="100%" minH="85vh" p="2rem" bg="gray.100"
      >
        <VStack>
          <HStack w="100%" spacing="1rem" m={0} p={4}
            bg="green" align="flex-start" 
          >
            <Box
              border="1px" borderColor="gray.200" borderRadius="md" textAlign="center" 
            >
              <Image 
                src={this.state.curentImage} alt={this.state.productData.name} 
                width="400px" height="400px"  
              />
              <ButtonGroup spacing="1rem" mt="0.5rem">
                {
                  this.state.productData.product_images?.map((image) => (
                    <Button 
                      onClick={() => this.setState({ curentImage: image.image_url })} 
                    >
                      <Image src={image.image_url} alt={image.id} width="50px" height="50px" />
                    </Button>
                  ))
                }
              </ButtonGroup>
            </Box>
            <VStack
              border="1px" borderColor="gray.200" borderRadius="md" p="4" m="4"
              maxW="60vw" align={["flex-start", "flex-start", "flex-start", "flex-start"]}
            >
              <Heading>{this.state.productData.product_name}</Heading>
              <Divider width="100%" />
              <Text>{this.state.productData.product_description}</Text>
              <Text>{this.state.productData.product_description}</Text>
              <Text>{this.state.productData.product_description}</Text>
              <Select
                placeholder="Select option" 
                value={this.state.selected_variant}
                onChange={(e) => this.setState({ selected_variant: e.target.value })}
              >
                {
                  this.state.variantions?.map((variant) => (
                    <option value={variant.id}>{variant.variant_level}</option>
                  ))
                }
              </Select>
              <Select
                placeholder="Select Quantity"
                value={this.state.selected_quantity}
                onChange={(e) => this.setState({ selected_quantity: e.target.value })}
              >
                {
                  [...Array(10).keys()].map((number) => (
                    <option value={number + 1}>{number + 1}</option>
                  ))
                }
              </Select>

              <p>{this.state.selected_variant}</p>
              <p>{this.state.selected_quantity}</p>
              <p>{this.state.price}</p>
            </VStack>
          </HStack>
          <Box>
            <Heading as="h1" size="2xl" >Reviews</Heading>
          </Box>

        </VStack>
      </Box>
    )
  }

}

export default SingleProduct ;