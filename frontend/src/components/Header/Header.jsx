import {React , Component ,useState} from "react";
import { Box, HStack } from "@chakra-ui/react";
import { ReactComponent as Logo } from "./DecorateKarlo-logo.svg"
import HeaderMenu from "./HeaderMenu";
class Header extends Component {
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
      <HStack width="-moz-max-content" height="-webkit-fit-content" borderBottom="2px" >
        <Box >
          <Logo/>
        </Box>
        <Box width="100%" >
          <HeaderMenu />  
        </Box>
      </HStack>
    );
  }

}

export default Header;