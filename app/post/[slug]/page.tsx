"use client"
// Import necessary dependencies
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { notFound } from "next/navigation"
import PostSkeleton from "@/components/Placeholders/PostSkeleton"

// Define TypeScript interface for the post data structure
interface PostData {
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  featured_image_src?: string
  category_name?: string
  date: string
  author_name: string
}

// Function to fetch post data from WordPress API
async function getPost(slug: string) {
  try {
    const res = await fetch(`http://nextproject.local/wp-json/wp/v2/posts?slug=${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    
    const posts = await res.json();
    if (!posts.length) return null;
    
    const post = posts[0];
    const authorRes = await fetch(`http://nextproject.local/wp-json/wp/v2/users/${post.author}`);
    
    if (!authorRes.ok) {
      throw new Error(`HTTP error! Status: ${authorRes.status}`);
    }
    
    const author = await authorRes.json();
    return {
      ...post,
      author_name: author.full_name || author.name || 'Unknown Author'
    };
    
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}
  
// Main component for displaying a single post
export default function SinglePost() {
  // Get the slug parameter from the URL
  const { slug } = useParams()
  // State management for post data and error handling
  const [post, setPost] = useState<PostData | null>(null)
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  // Effect hook to fetch post data when component mounts or slug changes
  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        if (Array.isArray(slug)) return;
        setIsLoading(true);
        const data = await getPost(slug);

        if (data) {
          setPost(data);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Handle error state by showing 404 page
  if (error) {
    notFound();
  }

  // Show loading skeleton while post is being fetched
  if (isLoading || !post) {
    return <PostSkeleton />;
  }

  // Format the post date
  const postDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  // Render the post content
  return (
    <article className="max-w-4xl mx-auto bg-white p-4 rounded-md">
      {/* Featured image section */}
      {post.featured_image_src && (
        <div className="relative aspect-[16/9] mb-6">
          <div 
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{ position: 'relative', width: '100%', height: '100%' }}
          >
            <Image
              src={post.featured_image_src}
              alt={post.title.rendered}
              width={1200}
              height={675}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}

      <div className="text-left">
        {/* Category tag */}
        <span className="inline-block px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md mb-4">
          {post.category_name}
        </span>
        
        {/* Post header with title and metadata */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {post.title.rendered}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>by {post.author_name}</span>
            <time dateTime={post.date}>{postDate}</time>
            <span>5 min read</span>
          </div>
        </header>

        {/* Post content with styled first letter and main content */}
        <div className="prose prose-gray max-w-none">
          <p className="first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-2">
            {post.excerpt.rendered}
          </p>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>
      </div>
    </article>
  )
}