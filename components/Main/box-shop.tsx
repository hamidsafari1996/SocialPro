"use client"; // Marks this as a client-side component

// Import necessary dependencies
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BlogSkeleton from "@/components/Placeholders/BlogSkeleton";

// TypeScript interface defining the structure of a post
interface Post {
      id: number;
      title: string;
      excerpt: { rendered: string };    // WordPress rendered excerpt
      subtitle: string;
      featured_image: string;           // URL for the post's featured image
      author_avatar: string;            // URL for author's avatar
      logo: string;                     // Post logo URL
      slug: string;                     // URL-friendly post identifier
      category?: string;                // Optional category name
      author_name?: string;             // Optional author name
}

// Post component for displaying blog posts/shop items
const Post: React.FC = () => {
      // State to store fetched posts
      const [posts, setPosts] = useState<Post[]>([]);

      // Effect hook to fetch posts when component mounts
      useEffect(() => {
            const fetchPosts = async () => {
                  try {
                        // Fetch posts from WordPress API
                        const response = await fetch('http://nextproject.local/wp-json/wp/v2/posts');
                        const data = await response.json();

                        // Transform API data into our Post interface format
                        const formattedPosts = data.map((post: any) => ({
                              id: post.id,
                              title: post.title.rendered,
                              excerpt: typeof post.excerpt === "object" ? post.excerpt.rendered : post.excerpt || '',
                              slug: post.slug,
                              subtitle: post.subtitle || '',
                              featured_image: post.featured_image_src || '',
                              logo: post.post_logo || '',
                              category: post.category_name || '',
                              author_avatar: post.author_avatar || '',
                              author_name: post.author_name || '',
                        }));
                        setPosts(formattedPosts);
                  } catch (error) {
                        console.error('Error fetching posts:', error);
                  }
            };

            fetchPosts();
      }, []); // Empty dependency array means this runs once on mount

      // Show loading skeleton while posts are being fetched
      if (posts.length === 0) {
            return <BlogSkeleton />;
      }

      // Render posts list
      return (
            <>
                  <div className="mt-16">
                  {posts.map((post, index) => (
                              // Individual post card
                              <div key={post.id} className="bg-white rounded-lg shadow-sm p-4 mb-4">
                                    <Link href={`/post/${post.slug}`} className="text-blue-600">
                                    {/* Author info section */}
                                    <div className="flex items-center">
                                          <Image
                                                src={post.author_avatar}
                                                alt={post.title}
                                                className="w-12 h-12 rounded-full object-cover mr-4"
                                                width={48} 
                                                height={48}
                                          />
                                          <div className="flex flex-col">
                                                <span className="text-left inline-block text-xs text-gray-500 rounded-full">{post.category}</span>
                                                <span className="font-bold text-lg text-left text-gray-900">{post.title}</span>
                                          </div>
                                    </div>

                                    {/* Featured image section */}
                                    <div className="mt-4">
                                    {post.featured_image && (
                                          index === 0 ? (
                                                <Image
                                                      src={post.featured_image}
                                                      alt={post.title}
                                                      className="rounded-lg object-cover"
                                                      priority
                                                      width={800} 
                                                      height={800}
                                                      sizes="(max-width: 768px) 100vw, 800px"
                                                />
                                          ) : (
                                                <Image
                                                      src={post.featured_image}
                                                      alt={post.title}
                                                      className="rounded-lg object-cover"
                                                      width={800} 
                                                      height={800}
                                                      sizes="(max-width: 768px) 100vw, 800px"
                                                />
                                          )
                                    )}
                                    </div>

                                    {/* Post excerpt section */}
                                    <div className="mt-4">
                                          <p className="text-gray-700 text-left" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                                    </div>
                                    </Link>
                              </div>
                        ))}
                  </div>
            </>
      );
};

export default Post;