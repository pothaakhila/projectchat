// theme
/*import palette from "../theme/palette";

export const colorPresets = [
  // DEFAULT
  {
    name: "default",
    ...palette.light.primary,
  },
  // PURPLE
  {
    name: "purple",
    lighter: "#EBD6FD",
    light: "#B985F4",
    main: "#7635dc",
    dark: "#431A9E",
    darker: "#200A69",
    contrastText: "#fff",
  },
  // CYAN
  {
    name: "cyan",
    lighter: "#D1FFFC",
    light: "#76F2FF",
    main: "#1CCAFF",
    dark: "#0E77B7",
    darker: "#053D7A",
    contrastText: palette.light.grey[800],
  },
  // BLUE
  {
    name: "blue",
    lighter: "#D1E9FC",
    light: "#76B0F1",
    main: "#2065D1",
    dark: "#103996",
    darker: "#061B64",

    contrastText: "#fff",
  },
  // ORANGE
  {
    name: "orange",
    lighter: "#FEF4D4",
    light: "#FED680",
    main: "#fda92d",
    dark: "#B66816",
    darker: "#793908",
    contrastText: palette.light.grey[800],
  },
  // RED
  {
    name: "red",
    lighter: "#FFE3D5",
    light: "#FFC1AC",
    main: "#FF3030",
    dark: "#B71833",
    darker: "#7A0930",
    contrastText: "#fff",
  },
];

export const defaultPreset = colorPresets[0];
export const purplePreset = colorPresets[1];
export const cyanPreset = colorPresets[2];
export const bluePreset = colorPresets[3];
export const orangePreset = colorPresets[4];
export const redPreset = colorPresets[5];

export default function getColorPresets(presetsKey) {
  return {
    purple: purplePreset,
    cyan: cyanPreset,
    blue: bluePreset,
    orange: orangePreset,
    red: redPreset,
    default: defaultPreset,
  }[presetsKey];
}
*/ 

// theme
import palette from "../theme/palette";

export const colorPresets = [
  // DEFAULT
  {
    name: "default",
    ...palette.light.primary,
  },
  // PURPLE
  {
    name: "purple",
    lighter: "#EBD6FD",
    light: "#B985F4",
    main: "#7635dc",
    dark: "#431A9E",
    darker: "#200A69",
    contrastText: "#fff",
  },
  // CYAN
  {
    name: "cyan",
    lighter: "#D1FFFC",
    light: "#76F2FF",
    main: "#1CCAFF",
    dark: "#0E77B7",
    darker: "#053D7A",
    contrastText: palette.light.grey[800],
  },
  // BLUE
  {
    name: "blue",
    lighter: "#D1E9FC",
    light: "#76B0F1",
    main: "#2065D1",
    dark: "#103996",
    darker: "#061B64",
    contrastText: "#fff",
  },
  // ORANGE
  {
    name: "orange",
    lighter: "#FEF4D4",
    light: "#FED680",
    main: "#fda92d",
    dark: "#B66816",
    darker: "#793908",
    contrastText: palette.light.grey[800],
  },
  // RED
  {
    name: "red",
    lighter: "#FFE3D5",
    light: "#FFC1AC",
    main: "#FF3030",
    dark: "#B71833",
    darker: "#7A0930",
    contrastText: "#fff",
  },
  // GREEN
  {
    name: "green",
    lighter: "#E4F9E0",
    light: "#6CE27D",
    main: "#2E8B57",
    dark: "#1C6E40",
    darker: "#134E27",
    contrastText: "#fff",
  },
  // TEAL
  {
    name: "teal",
    lighter: "#B2DFDB",
    light: "#4DB6AC",
    main: "#00796B",
    dark: "#004D40",
    darker: "#00251A",
    contrastText: "#fff",
  },
  // PINK
  {
    name: "pink",
    lighter: "#FCE4EC",
    light: "#F48FB1",
    main: "#D81B60",
    dark: "#C2185B",
    darker: "#880E4F",
    contrastText: "#fff",
  },
  // BROWN
  {
    name: "brown",
    lighter: "#D7CCC8",
    light: "#8D6E63",
    main: "#5D4037",
    dark: "#3E2723",
    darker: "#1B0000",
    contrastText: "#fff",
  },
  // INDIGO
  {
    name: "indigo",
    lighter: "#C5CAE9",
    light: "#3F51B5",
    main: "#1A237E",
    dark: "#303F9F",
    darker: "#000051",
    contrastText: "#fff",
  },
  // GREY
  {
    name: "grey",
    lighter: "#F5F5F5",
    light: "#9E9E9E",
    main: "#616161",
    dark: "#212121",
    darker: "#000000",
    contrastText: "#fff",
  },
  // DARK GREEN
  {
    name: "darkgreen",
    lighter: "#9CCB9D",
    light: "#3C6B3F",
    main: "#004D00",
    dark: "#003300",
    darker: "#001A00",
    contrastText: "#fff",
  },
  // LIGHT GREEN
  {
    name: "lightgreen",
    lighter: "#D0F0C0",
    light: "#8EED6F",
    main: "#3CE83F",
    dark: "#2E6F29",
    darker: "#1D3B14",
    contrastText: "#000",
  },
  // YELLOW
  {
    name: "yellow",
    lighter: "#FFF9C4",
    light: "#F4F742",
    main: "#FBC02D",
    dark: "#F57F17",
    darker: "#C49000",
    contrastText: "#000",
  },
  // MINT
  {
    name: "mint",
    lighter: "#C2F0E5",
    light: "#6EEDC4",
    main: "#2CBEA0",
    dark: "#1B8D7F",
    darker: "#0B4C4C",
    contrastText: "#fff",
  },
  // SALMON
  {
    name: "salmon",
    lighter: "#FFE6E6",
    light: "#FF9A9A",
    main: "#FF6F61",
    dark: "#B23C29",
    darker: "#7D1F16",
    contrastText: "#fff",
  },
];

export const defaultPreset = colorPresets[0];
export const purplePreset = colorPresets[1];
export const cyanPreset = colorPresets[2];
export const bluePreset = colorPresets[3];
export const orangePreset = colorPresets[4];
export const redPreset = colorPresets[5];
export const greenPreset = colorPresets[6];
export const tealPreset = colorPresets[7];
export const pinkPreset = colorPresets[8];
export const brownPreset = colorPresets[9];
export const indigoPreset = colorPresets[10];
export const greyPreset = colorPresets[11];
export const darkGreenPreset = colorPresets[12];
export const lightGreenPreset = colorPresets[13];
export const yellowPreset = colorPresets[14];
export const mintPreset = colorPresets[15];
export const salmonPreset = colorPresets[16];

export default function getColorPresets(presetsKey) {
  return {
    purple: purplePreset,
    cyan: cyanPreset,
    blue: bluePreset,
    orange: orangePreset,
    red: redPreset,
    green: greenPreset,
    teal: tealPreset,
    pink: pinkPreset,
    brown: brownPreset,
    indigo: indigoPreset,
    grey: greyPreset,
    darkgreen: darkGreenPreset,
    lightgreen: lightGreenPreset,
    yellow: yellowPreset,
    mint: mintPreset,
    salmon: salmonPreset,
    default: defaultPreset,
  }[presetsKey];
}
