import { server } from "../../../config";
import { useRouter } from "next/router";

import Link from "next/link";
import Meta from "../../../components/Meta";
import { articles } from "../../../data";

import articleStyles from "../../../styles/Article.module.css";

const article = ({ article }) => {
  // const router = useRouter();
  // const { id } = router.query;

  return (
    <>
      <Meta title={article.title} />
      <div className={articleStyles.grid}>
        <h1> {article.title} </h1>
        <p> {article.body} </p>
        <br />
        <Link href="/">Go Back</Link>
      </div>
    </>
  );
};

// data from our own api
export const getStaticProps = async (context) => {
  // const res = await fetch(`${server}/api/articles/${context.params.id}`);

  // const article = await res.json();

  const article = articles.filter(
    (article) => article.id === context.params.id
  )[0];

  return {
    props: {
      article,
    },
  };
};

export const getStaticPaths = async () => {
  // const res = await fetch(`${server}/api/articles`);
  // const articles = await res.json();

  const ids = articles.map((article) => article.id);

  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false, // return 404 if path not exist
  };
};

// using external api
// export const getServerSideProps = async (context) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
//   );

//   const article = await res.json();

//   return {
//     props: {
//       article,
//     },
//   };
// };

// faster, can be used in SSG
// export const getStaticProps = async (context) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
//   );

//   const article = await res.json();

//   return {
//     props: {
//       article,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);

//   const articles = await res.json();

//   const ids = articles.map((article) => article.id);

//   const paths = ids.map((id) => ({ params: { id: id.toString() } }));

//   return {
//     paths,
//     fallback: false, // return 404 if path not exist
//   };
// };

export default article;
