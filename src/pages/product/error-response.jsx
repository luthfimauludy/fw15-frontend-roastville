import Head from 'next/head';

const ErrorResponse = () => {
  return (
    <>
      <Head>
        <title>404 Network Error</title>
      </Head>
      <div>
        <h1>404 Network Error</h1>
        <p>There was a network error. Please try again later.</p>
      </div>
    </>
  );
};

export default ErrorResponse;
