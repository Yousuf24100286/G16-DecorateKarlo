import React, { Fragment } from "react";
import { HStack, Button, VStack, Box, Text, FormControl, ButtonGroup, Input, Select } from '@chakra-ui/react'
import axios from "axios";

const Variant = {
  name: "",
  price: 0,
  quantity: 0,
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => {
      const base64String = btoa(reader.result);
      resolve(base64String);
    };
    reader.onerror = () => {
      reject(new Error('Failed to convert file to Base64'));
    };
  });
}

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      variant: "",
      levels: [],
      description: "",
      category: null,
      images: [],
      categories: [],
    }
  }
  componentDidMount() {
    fetch("http://localhost/api/category/all")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if(data.staus === 'error') {
        alert(data.statusCode + " " + data.message);
      } else {
        this.setState({
          categories: data,
        })
      }   
    })
    .catch((err) => console.log(err));
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);

    

    fetch("http://localhost/api/product/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        variant: this.state.variant,
        levels: this.state.levels,
        description: this.state.description,
        category: this.state.category
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if(data.staus === 'error') {
        alert(data.statusCode + " " + data.message);
      } else {
        alert("Product Added Successfully");

        const formData = new FormData();
        formData.append("image", this.state.images);

        
        axios.post("http://localhost/api/product/images/add/"+ data.id, formData)
        .then((data) => {
          console.log(data);
          if(data.staus === 'error') {
            alert(data.statusCode + " " + data.message);
          } else {
            alert("Product Images Added Successfully");
          }   
        })
        .catch((err) => console.log(err));
      }   
    })




  }


  render() {
    return(
      <VStack minW="50vw" >
        <HStack minW="50vw">
          <FormControl>
            <Text>Name</Text>
            <Input isRequired 
              type="text" name="name"  
              value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}} />
          </FormControl>
          <FormControl>
            <Text>Category</Text>
            <Select name="category" value={this.state.category}
              onChange={(e)=>{this.setState({category:e.target.value})}}
            >
              <option value="">Select Category</option>
              {this.state.categories.map((category, index) => {
                return(
                  <option key={index} value={category.id}>{category.category_name}</option>
                )
              })}
            </Select>
          </FormControl>  
        </HStack>
        <HStack minW="50vw">
          <FormControl>
            <Text>Variant</Text>
            <Input isRequired 
              type="text" name="variant" 
              value={this.state.variant} onChange={(e)=>{this.setState({variant:e.target.value})}}
            />
          </FormControl>
          <FormControl>
            <Text>No. of Levels</Text>
            <Input isRequired 
              type="number" name="level_count"
              onChange={(e)=>{this.setState(
                {levels: Array.from(
                  {length:e.target.value}
                ).map(x =>{
                  return Variant
                }) })}} />
          </FormControl>  
        </HStack>
        <VStack minW="50vw">
          {
            this.state.levels.map((level, index) => {
              return(
              <FormControl>
                <Text>Level {index+1}</Text>
                <HStack key={index} maxW="100%">
                  <Input isRequired 
                    type="text"   name="name"      placeholder="Level Name" 
                    value={level.name} 
                    onChange={(e)=>{
                      this.setState({
                        levels: this.state.levels.map((level, i) => {
                          if(i === index) {
                            return {
                              ...level,
                              name: e.target.value,
                            }
                          } else {
                            return level;
                          }
                        })
                      })}
                    }
                  />
                  <Input isRequired type="number" name="price"     placeholder="Level Price"
                  value={level.price}
                  onChange={(e)=>{
                    this.setState({
                      levels: this.state.levels.map((level, i) => {
                        if(i === index) {
                          return {
                            ...level,
                            price: e.target.value,
                          }
                        } else {
                          return level;
                        }
                      })
                    })}
                  }
                  />
                  <Input isRequired type="number" name="quantity"  placeholder="Quantity" 
                  value={level.quantity}
                  onChange={(e)=>{
                    this.setState({
                      levels: this.state.levels.map((level, i) => {
                        if(i === index) {
                          return {
                            ...level,
                            quantity: e.target.value,
                          }
                        } else {
                          return level;
                        }
                      })
                    })}
                  }
                  />
                </HStack>
              </FormControl>
              )
            })
          }
        </VStack>
        <HStack minW="50vw">
          <FormControl>
            <Text>Description</Text>
            <Input isRequired type="text" name="description" 
              value={this.state.description} onChange={(e)=>{this.setState({description:e.target.value})}}
            />
          </FormControl>
        </HStack>
        <HStack minW="50vw">
          <FormControl>
            <Text>Images</Text>
            <Input isRequired type="file" name="image"
              onChange={(e)=>{this.setState({images:e.target.files[0]})}}
            />
          </FormControl>
        </HStack>
        <FormControl>
          <Button
            onClick={this.onSubmit}
          >Add Product</Button>
        </FormControl>
      </VStack>
    )
  }
}

export default AddProduct;