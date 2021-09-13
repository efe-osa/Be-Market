import Home from 'components/Home';
import getFeaturedProduct from 'firebaseDB/getFeaturedProduct';
import getProducts from 'firebaseDB/getProducts';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { PageProps } from 'types';

const IndexPage: NextPage<PageProps> = ({ data, featured }) => {
  return (
    <main>
      <Head>
        <title>BEJAMAS</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#ffffff"></meta>
        <meta
          name="description"
          content="Buy your fancy and affordable art at Bejamas marketplace"
        ></meta>
      </Head>
      <Home featured={featured} data={data} />
    </main>
  );
};

export default IndexPage;

export async function getStaticProps() {
  const { products, totalProducts } = await getProducts();
  const { featured } = await getFeaturedProduct();

  return {
    props: {
      data: {
        products,
        totalProducts,
      },
      featured,
    },
  };
}
