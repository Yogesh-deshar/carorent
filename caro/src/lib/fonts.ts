import { Poppins } from "next/font/google";
import localFont from 'next/font/local';

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap", // Prevents blocking, uses fallback until loaded
  weight: '500', // Specify needed weights
  variable: "--font-poppins", // For Tailwind/CSS vars
});

export const postnobillsjaffna = localFont({
  src: './PostNoBillsJaffna-SemiBold.ttf',  // Put in public/fonts/
  display: 'swap',
  variable: '--font-postnobillsjaffna',
  weight: '600',  // SemiBold only
});