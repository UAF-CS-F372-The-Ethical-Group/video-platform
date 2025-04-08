import Head from "../components/Head.tsx";

export default function ErrorPage(
  { error, description }: { error: string; description: string },
) {
  return (
    <>
      <Head>
        <title>Error: {error}</title>
      </Head>
      <h1>{error}</h1>
      <p>{description}</p>
    </>
  );
}
