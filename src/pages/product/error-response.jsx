import Head from 'next/head';

const ErrorResponse = () => {
  return (
    <>
      <Head>
        <title>404 Network Error</title>
      </Head>
      <div className='flex justify-center items-center h-screen'>
        <h1>404 Network Error</h1>
      </div>
    </>
  );
};

export default ErrorResponse;
