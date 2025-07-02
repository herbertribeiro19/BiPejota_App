import { fonts, fontSizes, fontWeights } from '../theme/fonts';

export const useFonts = () => {
  return {
    fonts,
    fontSizes,
    fontWeights,
    // Helpers para facilitar o uso
    text: {
      xs: { fontFamily: fonts.regular, fontSize: fontSizes.xs },
      sm: { fontFamily: fonts.regular, fontSize: fontSizes.sm },
      md: { fontFamily: fonts.regular, fontSize: fontSizes.md },
      lg: { fontFamily: fonts.regular, fontSize: fontSizes.lg },
      xl: { fontFamily: fonts.regular, fontSize: fontSizes.xl },
      xxl: { fontFamily: fonts.regular, fontSize: fontSizes.xxl },
      xxxl: { fontFamily: fonts.regular, fontSize: fontSizes.xxxl },
    },
    heading: {
      h1: { fontFamily: fonts.bold, fontSize: fontSizes.xxxl },
      h2: { fontFamily: fonts.bold, fontSize: fontSizes.xxl },
      h3: { fontFamily: fonts.semiBold, fontSize: fontSizes.xl },
      h4: { fontFamily: fonts.medium, fontSize: fontSizes.lg },
    },
  };
}; 