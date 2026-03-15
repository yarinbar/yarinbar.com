import type { AppProps } from "next/app";
import Head from "next/head";
import { Instrument_Serif, Inter } from "next/font/google";
import "@/styles/globals.css";

const displayFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${displayFont.variable} ${bodyFont.variable}`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Yarin Bar — ML Researcher</title>
        <meta
          name="description"
          content="Machine Learning Researcher at Technion. Publications at NeurIPS and CVPR. Shipped products: kollit.ai, cathAlert."
        />
        <link rel="canonical" href="https://yarinbar.com" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://yarinbar.com" />
        <meta property="og:site_name" content="Yarin Bar" />
        <meta property="og:title" content="Yarin Bar — ML Researcher" />
        <meta
          property="og:description"
          content="Machine Learning Researcher at Technion. Publications at NeurIPS and CVPR. Shipped products: kollit.ai, cathAlert."
        />
        <meta
          property="og:image"
          content="https://yarinbar.com/og-image.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Yarin Bar — ML Researcher" />
        <meta
          name="twitter:description"
          content="Machine Learning Researcher at Technion. Publications at NeurIPS and CVPR."
        />
        <meta
          name="twitter:image"
          content="https://yarinbar.com/og-image.png"
        />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
