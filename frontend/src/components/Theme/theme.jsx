import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    100: '#028A0F',
    900: '#3CB043',
  },
};




const button = {
  baseStyle: {
    fontWeight: 'bold', // Normally, it is "semibold"
  },
  variants: {
    button1: (props) => ({
      marginBlock: '10px',
      'border-radius': '50px',
      bg: props.colorMode === 'dark' ? 'brand.900' : 'brand.100',
      _hover: {
        bg: props.colorMode === 'dark' ? 'brand.900' : 'brand.100',
      }
    }),
  },


  defaultProps: {
    variant: 'button1',
  }
};


const text = {
  baseStyle: {
    fontWeight: 'bold', // Normally, it is "semibold"
  },
  variants: {
    text1: (props) => ({
      marginBlock: '10px',
    }),

  },

  defaultProps: {
    variant: 'text1',
  }
};






const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: colors,
  components: {
    Button: button,
    Text: text
  },
});

export default theme;