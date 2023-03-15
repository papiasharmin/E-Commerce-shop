import Layout from '@/components/layout/layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ParallaxProvider } from 'react-scroll-parallax';
import { Provider } from 'react-redux'
import store from '@/store/store';
import { SessionProvider } from "next-auth/react";
import { useEffect } from 'react';
import {saveState} from '../localstore';


store.subscribe(() => {
  saveState({
   
    cart:store.getState().cart.cart,
    total:store.getState().cart.totalamount
    
  });
});



export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return <SessionProvider session={session}>
  <Provider store={store}>

  <ParallaxProvider>
    <Layout>
    <Component {...pageProps} />

  </Layout>
  </ParallaxProvider>
  </Provider>
  </SessionProvider>
}
