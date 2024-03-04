import type { Metadata } from "next";

type PostData = {
  id: string;
  title: string;
  selftext: string;
};

type RedditResponse = {
  data: {
    children: {
      data: PostData;
    }[];
  };
};

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `Plain Text Reddit: Top posts of the week for r/${params.slug}`,
  };
}

async function getTopSubredditPosts(subreddit: string): Promise<PostData[]> {
  const res = await fetch(
    `https://old.reddit.com/r/${subreddit}/top.json?t=week&limit=50`,
    {
      headers: {
        "User-Agent": "Plain Text Reddit/0.1",
      },
    }
  );

  if (!res.ok) {
    const responseText = await res.text();
    throw new Error(`Failed to fetch posts: ${responseText}`);
  }

  const posts: RedditResponse = await res.json();

  return posts.data.children.map((post) => {
    const { id, title, selftext } = post.data;

    return {
      id,
      title,
      selftext,
    };
  });
}

export default async function Page({ params }: { params: { slug: string } }) {
  const posts = await getTopSubredditPosts(params.slug);

  return (
    <div className="mt-4 space-y-8">
      <h2 className="text-center text-xl font-bold">
        Top posts of the week for r/{params.slug}
      </h2>
      {posts.map((post) => (
        <section key={post.id}>
          <div className="font-bold">Title: {post.title}</div>
          <p className="mt-1">{post.selftext}</p>
        </section>
      ))}
    </div>
  );
}
