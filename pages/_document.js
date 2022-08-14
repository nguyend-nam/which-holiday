import { Html, Head, Main, NextScript } from "next/document";
import { theme } from "../constants";

export default function Document() {
  return (
    <Html>
      <Head>
        <title>Which holiday</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,200,0,0&display=swap"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;600;700;900&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
        />
        <link rel="icon" href="/pepe-sad.png" />
        <meta name="theme-color" content={theme.colors.primary} />
        <meta property="og:image" content="/og.png" />
        <meta property="og:url" content="https://which-holiday.vercel.app/" />
        <meta property="og:site_name" content="Which holiday?" />
        <meta property="og:title" content="Which holiday?" />
        <meta
          property="og:description"
          content="Select country and view holidays"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
