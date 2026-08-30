import localFont from "next/font/local";
import { Great_Vibes, Playfair_Display } from "next/font/google";

export const gilroy = localFont({
  src: [
    {
      path: "../../public/fonts/Gilroy-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy-Heavy.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-gilroy",
  display: "swap",
});

//   (Cursive)
export const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

// (Serif Italic)
export const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-playfair",
  display: "swap",
});
