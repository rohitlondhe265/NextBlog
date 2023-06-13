import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(id) {
  // const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
  //   cache: "no-store",
  // });

  const res = await fetch(`${process.env.API_BASE_URL}/posts/${id}`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    return notFound()
  }

  return res.json();
}
async function getPosts() {
  // const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
  //   cache: "no-store",
  // });

  const res = await fetch(`${process.env.API_BASE_URL}/posts/`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    return notFound()
  }

  return res.json();
}

export async function generateStaticParams() {
  const posts = await getPosts();
  if (!posts) return [];
  return posts.map((post) => ({
    id: post._id,
  }))
}

export async function generateMetadata({ params }) {
  const post = await getData(params.id);
  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }
  return {
    title: post.title,
    description: post.desc,
  };
}

const BlogPost = async ({ params }) => {
  const data = await getData(params.id);
  if (!data) notFound();
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>
            {data.desc}
          </p>
          <div className={styles.author}>
            <Image
              src={data.img}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{data.username}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={data.img}
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.text}
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </div>
    </div>
  );
};

export default BlogPost;
