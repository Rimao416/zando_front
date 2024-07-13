type Theme = {
    colors: {
      white: string;
      black: string;
      grayBG: string;
      neutral: (opacity: number) => string;
    };
    fontWeights: {
      medium: number;
      bold: number;
      semibold: number;
    };
    radius: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  };
  
  export const theme: Theme = {
    colors: {
      white: '#fff',
      black: '#000',
      grayBG: "#e5e5e5",
      neutral: (opacity: number) => `rgba(10, 10, 10, ${opacity})`
    },
    fontWeights: {
      medium:500,
      bold: 700,
      semibold: 600
    },
    radius: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18
    }
  };
  