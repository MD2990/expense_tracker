import React from "react";
import axios from "axios";
import { SWRConfig } from "swr";
import "../styles/globals.css";
import "hover.css/css/hover-min.css";
import { Router } from "next/dist/client/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, Zoom } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import Nav from "../components/Nav";

//NProgress.configure({ easing: 'ease', speed: 500 });
NProgress.configure({ showSpinner: true });
Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher: (url) => axios(url).then((r) => r.data) }}>
      <ChakraProvider>
        <ToastContainer autoClose={2000} limit={1} transition={Zoom} />
        <Nav />

        <Component {...pageProps} />
      </ChakraProvider>
    </SWRConfig>
  );
}

export default MyApp;
