import { DrawerContent, DrawerHeader, Stack ,HStack, IconButton, Link } from "@chakra-ui/react";
import {React , Component, Fragment} from "react";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { Avatar,  } from "@chakra-ui/react";
import { Drawer, DrawerOverlay } from "@chakra-ui/react";
import { FaShoppingCart } from 'react-icons/fa';


class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      showMenu: false
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
    // if the window width is less than 1024px then show the hamburger icon else show the menu
    if(window.innerWidth < 1024){
      this.setState({
        showMenu: false
      })
    }else{
      this.setState({
        showMenu: true
      })
    }
    // add event listener to the window to check if the window width is less than 1024px then show the hamburger icon else show the menu
    window.addEventListener('resize', () => {
      if(window.innerWidth < 1024){
        this.setState({
          showMenu: false
        })
      }else{
        this.setState({
          showMenu: true
        })
      }
    })
  }
  componentWillUnmount(){
    // remove the event listener
    window.removeEventListener('resize', () => {
      if(window.innerWidth < 1024){
        this.setState({
          showMenu: false
        })
      }else{
        this.setState({
          showMenu: true
        })
      }
    })
  }



  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    // render the menu if showMenu is true else render the hamburger icon and if the hamburger icon is clicked then show the menu
    if(this.state.showMenu){
      return (
        <HStack width="100%" justifyContent="space-between">
          <TextMenu />
          <IconMenu />
        </HStack>
      );
    }else{
      return (
        <Fragment>
          <HStack justifyContent="flex-end" paddingInline="25px" >
            <IconButton 
              icon={this.state.isToggleOn ? <HamburgerIcon  w={16} h={16} /> : null} 
              onClick={this.handleClick}
            />
          </HStack>
          <Drawer
            isOpen={!this.state.isToggleOn}
            placement="right"
            
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px">
                <HStack justifyContent="flex-end" paddingInline="25px" >
                  <IconButton
                    icon={<CloseIcon w={8} h={8} />}
                    onClick={this.handleClick}
                  />
                </HStack>
              </DrawerHeader>
              <IconMenu />
              <TextMenu direction="column" />
            </DrawerContent>

          </Drawer>
        </Fragment>
      );
    }
  }
}

export default HeaderMenu;



class TextMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: props.direction || "row",
    }
  }
  render() {
    return (
      <Stack width="100%" direction={this.state.direction} >
        <Link variant="header" href="/">Home</Link>
        <Link variant="header" href="/about">About</Link>
        <Link variant="header" href="/contact">Contact</Link>
      </Stack>
    );
  }
}

class IconMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <HStack width="100%" justify="flex-end" paddingInline="20px" columnGap="0px">
        <IconButton component={Link} to="/cart">
          <Link variant="header" href="/cart"><FaShoppingCart  /></Link>
        </IconButton>
        <IconButton>
          <Link variant="header" href="/account"><Avatar w={8} h={8} bg="black"/></Link>
        </IconButton>
      </HStack>
    );
  }
}

