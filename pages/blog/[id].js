import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import styles from "../../styles/article.module.css";

export default function Post({ postData }) {
  console.log(postData.date);
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className={styles.articleBox}>
        <h1>{postData.title}</h1>
        <small className={styles.date}>{postData.date}</small>
        <div
          className={styles.html}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
