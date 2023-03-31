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
    }),
    button2: (props) => ({
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
    'font-family': 'Poppins',
    'font-size': '16px',
    'letter-spacing': '0px',
  },
  variants: {
    text1: (props) => ({
      marginBlock: '10px',
      'font-family': 'Poppins',
    }),

  },

  defaultProps: {
    variant: 'text1',
  }
};




const link = {
  baseStyle: {
    fontWeight: 'bold', // Normally, it is "semibold"
  },
  variants: {
    link1: (props) => ({
      marginBlock: '10px',
    }),
    header: (props) => ({
      paddingInline: '10px',
      'font-weight': 'bold',
      'font-family': 'Poppins',
      'font-size': '28px',
      'letter-spacing': '0px',
      'color': props.colorMode === 'dark' ? '#FFFFFF' : '#000000',
    }),
  },

  defaultProps: {
    variant: 'link1',
  }
}



const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: colors,
  components: {
    Button: button,
    Text: text,
    Link: link
  },
});

export default theme;