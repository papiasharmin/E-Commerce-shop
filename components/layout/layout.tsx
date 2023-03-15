import React from 'react'
import Footer from './footer'
import Navbar from './navbar'
import Head from 'next/head';
type Props = {
  
  children?: JSX.Element;
};

const Layout= ({  children }: Props)  => {
  return (
    <>
      <Head>
        <title>Reliance leather shop</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar/>
      {children}
      <Footer/>
    
    </>
  )
}

export default Layout