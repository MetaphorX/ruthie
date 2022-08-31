import Head from "next/head";
import { Categories, PostCard, PostWidget } from "../components";
import { getPosts } from "../services";
import { FeaturedPost } from "../sections";

export default function Home({ posts }) {
  return (
    <>
    <main>
      <div className="mx-2 mb-8 text-white">
        <Head>
          <title>Summies Blog</title>
          <meta name="description" content="Summies blog" />


          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1">
            {posts.map((post, index) => (
              <PostCard post={post.node} key={post.title} />
            ))}
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto px-10 mb-8 text-white">
        <h3 className="font-bold text-4xl text-center border-b border-gray-200 mb-4 py-2">
          Featured{" "}
        </h3>
        <FeaturedPost />
      </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: { posts },
  };
}
