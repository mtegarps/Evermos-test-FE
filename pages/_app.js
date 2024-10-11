import Router from 'next/router';
import NProgress from 'nprogress';
import Layout from '../components/layout/Layout';
import 'nprogress/nprogress.css'; //styles of nprogress
import '../styles/globals.scss'

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
