import { customShadows } from "./../theme/shadows";
import { Theme, ThemeOptions } from "@mui/material/styles";

// declare module "@mui/material/styles" {
//   interface ThemeOptions extends ThemeOptions {
//     customShadows?: customShadows;
//   }
//   interface Theme {
//     customShadows?: customShadows;
//   }
//   interface CustomThemeOptions extends ThemeOptions {
//     customShadows?: customShadows;
//   }
//   export function createTheme(options?: CustomThemeOptions): CustomTheme;

//   interface TypeBackground {
//     paper: string;
//     default: string;
//     neutral: string;
//   }
// }

declare module "@mui/material/styles" {
  interface CustomTheme extends Theme {
    customShadows?: customShadows;
  }
  // allow configuration using `createTheme`
  interface CustomThemeOptions extends ThemeOptions {
    customShadows?: customShadows;
  }

  export function createTheme(options?: CustomThemeOptions): CustomTheme;

  interface PaletteOptions {
    common: { black: string; white: string };
    primary: {
      lighter: string;
      light: string;
      main: string;
      dark: string;
      darker: string;
      contrastText: string;
    };
    secondary: {
      lighter: string;
      light: string;
      main: string;
      dark: string;
      darker: string;
      contrastText: string;
    };
    info: {
      lighter: string;
      light: string;
      main: string;
      dark: string;
      darker: string;
      contrastText: string;
    };
    success: {
      lighter: string;
      light: string;
      main: string;
      dark: string;
      darker: string;
      contrastText: string;
    };
    warning: {
      lighter: string;
      light: string;
      main: string;
      dark: string;
      darker: string;
      contrastText: string;
    };
    error: {
      lighter: string;
      light: string;
      main: string;
      dark: string;
      darker: string;
      contrastText: string;
    };
    grey: Color;
    gradients: {
      primary: string;
      info: string;
      success: string;
      warning: string;
      error: string;
    };
    chart: {
      violet: string[];
      blue: string[];
      green: string[];
      yellow: string[];
      red: string[];
    };
    divider: string;
    action: {
      hover: string;
      selected: string;
      disabled: string;
      disabledBackground: string;
      focus: string;
      hoverOpacity: number;
      disabledOpacity: number;
    };
    mode: PaletteMode;
    text: { primary: string; secondary: string; disabled: string };
    background: { paper: string; default: string; neutral: string };
    action: {
      active: string;
      hover: string;
      selected: string;
      disabled: string;
      disabledBackground: string;
      focus: string;
      hoverOpacity: number;
      disabledOpacity: number;
    };
  }
  interface Palette {
    common: { black: string; white: string };
    primary: {
      lighter: string;
      light: string;
      main: string;
      dark: string;
      darker: string;
      contrastText: string;
    };
    secondary: {
      lighter: string;
      light: string;
      main: string;
      dark: string;
      darker: string;
      contrastText: string;
    };
    info: {
      lighter: string;
      light: string;
      main: string;
      dark: string;
      darker: string;
      contrastText: string;
    };
    success: {
      lighter: string;
      light: string;
      main: string;
      dark: string;
      darker: string;
      contrastText: string;
    };
    warning: {
      lighter: string;
      light: string;
      main: string;
      dark: string;
      darker: string;
      contrastText: string;
    };
    error: {
      lighter: string;
      light: string;
      main: string;
      dark: string;
      darker: string;
      contrastText: string;
    };
    grey: Color;
    gradients: {
      primary: string;
      info: string;
      success: string;
      warning: string;
      error: string;
    };
    chart: {
      violet: string[];
      blue: string[];
      green: string[];
      yellow: string[];
      red: string[];
    };
    divider: string;
    action: {
      hover: string;
      selected: string;
      disabled: string;
      disabledBackground: string;
      focus: string;
      hoverOpacity: number;
      disabledOpacity: number;
    };
    mode: PaletteMode;
    text: { primary: string; secondary: string; disabled: string };
    background: { paper: string; default: string; neutral: string };
    action: {
      active: string;
      hover: string;
      selected: string;
      disabled: string;
      disabledBackground: string;
      focus: string;
      hoverOpacity: number;
      disabledOpacity: number;
    };
  }
  interface PaletteColor {
    lighter: string;
      light: string;
      main: string;
      dark: string;
      darker: string;
      contrastText: string;
  }
}

declare module "@mui/material" {
  interface Color {
    0: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    500_8: string;
    500_12: string;
    500_16: string;
    500_24: string;
    500_32: string;
    500_48: string;
    500_56: string;
    500_80: string;
  }

  // interface Palette {
  //   light: {
  //     common: { black: string; white: string };
  //     primary: {
  //       lighter: string;
  //       light: string;
  //       main: string;
  //       dark: string;
  //       darker: string;
  //       contrastText: string;
  //     };
  //     secondary: {
  //       lighter: string;
  //       light: string;
  //       main: string;
  //       dark: string;
  //       darker: string;
  //       contrastText: string;
  //     };
  //     info: {
  //       lighter: string;
  //       light: string;
  //       main: string;
  //       dark: string;
  //       darker: string;
  //       contrastText: string;
  //     };
  //     success: {
  //       lighter: string;
  //       light: string;
  //       main: string;
  //       dark: string;
  //       darker: string;
  //       contrastText: string;
  //     };
  //     warning: {
  //       lighter: string;
  //       light: string;
  //       main: string;
  //       dark: string;
  //       darker: string;
  //       contrastText: string;
  //     };
  //     error: {
  //       lighter: string;
  //       light: string;
  //       main: string;
  //       dark: string;
  //       darker: string;
  //       contrastText: string;
  //     };
  //     grey: Color;
  //     gradients: {
  //       primary: string;
  //       info: string;
  //       success: string;
  //       warning: string;
  //       error: string;
  //     };
  //     chart: {
  //       violet: ["#826AF9", "#9E86FF", "#D0AEFF", "#F7D2FF"];
  //       blue: ["#2D99FF", "#83CFFF", "#A5F3FF", "#CCFAFF"];
  //       green: ["#2CD9C5", "#60F1C8", "#A4F7CC", "#C0F2DC"];
  //       yellow: ["#FFE700", "#FFEF5A", "#FFF7AE", "#FFF3D6"];
  //       red: ["#FF6C40", "#FF8F6D", "#FFBD98", "#FFF2D4"];
  //     };
  //     divider: string;
  //     action: {
  //       hover: string;
  //       selected: string;
  //       disabled: string;
  //       disabledBackground: string;
  //       focus: string;
  //       hoverOpacity: number;
  //       disabledOpacity: number;
  //     };
  //     mode: PaletteMode;
  //     text: { primary: string; secondary: string; disabled: string };
  //     background: { paper: string; default: string; neutral: string };
  //     action: {
  //       active: string;
  //       hover: string;
  //       selected: string;
  //       disabled: string;
  //       disabledBackground: string;
  //       focus: string;
  //       hoverOpacity: number;
  //       disabledOpacity: number;
  //     };
  //   };
  //   dark: {
  //     common: { black: string; white: string };
  //     primary: {
  //       lighter: string;
  //       light: string;
  //       main: string;
  //       dark: string;
  //       darker: string;
  //       contrastText: string;
  //     };
  //     secondary: {
  //       lighter: string;
  //       light: string;
  //       main: string;
  //       dark: string;
  //       darker: string;
  //       contrastText: string;
  //     };
  //     info: {
  //       lighter: string;
  //       light: string;
  //       main: string;
  //       dark: string;
  //       darker: string;
  //       contrastText: string;
  //     };
  //     success: {
  //       lighter: string;
  //       light: string;
  //       main: string;
  //       dark: string;
  //       darker: string;
  //       contrastText: string;
  //     };
  //     warning: {
  //       lighter: string;
  //       light: string;
  //       main: string;
  //       dark: string;
  //       darker: string;
  //       contrastText: string;
  //     };
  //     error: {
  //       lighter: string;
  //       light: string;
  //       main: string;
  //       dark: string;
  //       darker: string;
  //       contrastText: string;
  //     };
  //     grey: Color;
  //     gradients: {
  //       primary: string;
  //       info: string;
  //       success: string;
  //       warning: string;
  //       error: string;
  //     };
  //     chart: {
  //       violet: ["#826AF9", "#9E86FF", "#D0AEFF", "#F7D2FF"];
  //       blue: ["#2D99FF", "#83CFFF", "#A5F3FF", "#CCFAFF"];
  //       green: ["#2CD9C5", "#60F1C8", "#A4F7CC", "#C0F2DC"];
  //       yellow: ["#FFE700", "#FFEF5A", "#FFF7AE", "#FFF3D6"];
  //       red: ["#FF6C40", "#FF8F6D", "#FFBD98", "#FFF2D4"];
  //     };
  //     divider: string;
  //     action: {
  //       hover: string;
  //       selected: string;
  //       disabled: string;
  //       disabledBackground: string;
  //       focus: string;
  //       hoverOpacity: number;
  //       disabledOpacity: number;
  //     };
  //     mode: PaletteMode;
  //     text: { primary: string; secondary: string; disabled: string };
  //     background: { paper: string; default: string; neutral: string };
  //     action: {
  //       active: string;
  //       hover: string;
  //       selected: string;
  //       disabled: string;
  //       disabledBackground: string;
  //       focus: string;
  //       hoverOpacity: number;
  //       disabledOpacity: number;
  //     };
  //   };
  // }
}
