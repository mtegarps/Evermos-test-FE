import Head from "next/head";
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Product Catalogue</title>
      </Head>
      <Navbar />
      <Sidebar />
      <>{children}</>
    </>
  )
}