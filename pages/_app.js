import React from "react";
import App from "next/app";
import Head from "next/head";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import themeConfig from '../styles/themesConfig'
import wrapper from "../app/store";
import { Auth0Provider } from "@auth0/auth0-react";

import { redirectUri } from "../services/awsService/inviteId";

import 'tailwindcss/tailwind.css'

class MyApp extends App {

  componentDidMount() {
    let comment = document.createComment(`

  =========================================================
  * * Ronday Admin portal
  =========================================================

  `);
    document.insertBefore(comment, document.documentElement);
  }

  // const store = useStore((state) => state);

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps  } = this.props;
    const Layout = Component.layout || (({ children }) => <>{children}</>);
    const theme = createTheme(themeConfig);

    return (
          <React.Fragment>
            <Head>
              <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, shrink-to-fit=no"
              />
              <title>Ronday Admin Portal</title>
              <style >{`
            #__next { height: 100vh !important; }
          `}
              </style>

            </Head>
            <Layout style={{ height: '100%' }}>
              <ThemeProvider theme={theme}>
                {/*<PersistGate loading={null} persistor={store.__PERSISTOR}>*/}
                  <Auth0Provider
                      domain={"https://gatekeeper.staging.rondayapp.com"}
                      clientId={"yiThk13p87t9EipRLvNCy0IxpJAA0EhU"}
                      redirectUri={redirectUri}
                  >
                    <Component {...pageProps} />
                  </Auth0Provider>
                {/*</PersistGate>*/}
              </ThemeProvider>
            </Layout>
          </React.Fragment>

    );
  }
}

export default wrapper.withRedux(MyApp);

