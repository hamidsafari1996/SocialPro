"use client";
import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

import {
      HeartIcon,
      ChatBubbleOvalLeftIcon,
      ShareIcon,
      PaperAirplaneIcon,
      EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

interface Post {
      id: number;
      title: string;
      excerpt: string;
      subtitle: string;
      featured_image: string;
      logo: string;
}

const Post: React.FC = () => {
      const [posts, setPosts] = useState<Post[]>([]);

      // Fetch posts from API
      useEffect(() => {
            const fetchPosts = async () => {
                  try {
                        const response = await fetch('http://nextproject.local/wp-json/wp/v2/posts');
                        const data = await response.json();

                        const formattedPosts = data.map((post: any) => ({
                              id: post.id,
                              title: post.title.rendered, // عنوان پست
                              excerpt: post.content.rendered || '', // توضیحات کوتاه پست
                              subtitle: post.subtitle || '', // زیرعنوان پست (اگر وجود دارد)
                              featured_image: post.featured_image_src || '', // تصویر شاخص پست
                              logo: post.post_logo || '', // لوگوی پست (اگر وجود دارد)
                        }));
                        setPosts(formattedPosts);
                  } catch (error) {
                        console.error('Error fetching posts:', error);
                  }
            };

            fetchPosts();
      }, []);


      return (
            <>
                  <div className="mt-16">
                  {posts.map((post) => (
                              <div key={post.id} className="bg-white rounded-lg shadow-sm p-4 mb-4">
                                    <div className="flex items-center">
                                          <img
                                                src={post.logo}
                                                alt={post.title}
                                                className="w-12 h-12 rounded-full object-cover mr-4"
                                          />
                                          <div className="flex flex-col">
                                                <span className="font-bold text-left">{post.title}</span>
                                                <span className="text-sm text-gray-500 text-left">{post.subtitle}</span>
                                                {/* <span className="text-xs text-gray-400 text-left">{post.time}hr</span> */}
                                          </div>
                                          <Menu as="div" className="relative inline-block ml-auto">
                                                <div>
                                                      <MenuButton className="text-gray-500 hover:text-gray-700">
                                                            <EllipsisHorizontalIcon className="w-10 h-10 bg-slate-100 p-2.5 rounded-full hover:bg-blue-600 ease-out duration-300 hover:text-white text-slate-900 flex-shrink-0" />
                                                      </MenuButton>
                                                </div>
                                                <MenuItems
                                                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                                                >
                                                      <div className="py-1">
                                                            <MenuItem>
                                                                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                                                                        Account settings
                                                                  </a>
                                                            </MenuItem>
                                                            <MenuItem>
                                                                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                                                                        Support
                                                                  </a>
                                                            </MenuItem>
                                                            <MenuItem>
                                                                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                                                                        License
                                                                  </a>
                                                            </MenuItem>
                                                      </div>
                                                </MenuItems>
                                          </Menu>
                                    </div>

                                    <div className="mt-4">
                                          <img
                                                src={post.featured_image}
                                                alt={post.title}
                                                className="w-full h-auto rounded-lg object-cover"
                                          />
                                    </div>

                                    <div className="mt-4">
                                          <p className="text-gray-700 text-left" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                                    </div>

                                    <div className="mt-4 flex justify-between items-center border-t pt-2">
                                          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                                                <HeartIcon className="w-10 h-10 bg-slate-100 p-2.5 rounded-full hover:bg-blue-600 ease-out duration-300 hover:text-white text-slate-900 flex-shrink-0" />
                                                <span>Liked (56)</span>
                                          </button>

                                          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                                                <ChatBubbleOvalLeftIcon className="w-10 h-10 bg-slate-100 p-2.5 rounded-full hover:bg-blue-600 ease-out duration-300 hover:text-white text-slate-900 flex-shrink-0" />
                                                <span>Comments (12)</span>
                                          </button>

                                          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                                                <ShareIcon className="w-10 h-10 bg-slate-100 p-2.5 rounded-full hover:bg-blue-600 ease-out duration-300 hover:text-white text-slate-900 flex-shrink-0" />
                                                <span>Share (3)</span>
                                          </button>

                                          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                                                <PaperAirplaneIcon className="w-10 h-10 bg-slate-100 p-2.5 rounded-full hover:bg-blue-600 ease-out duration-300 hover:text-white text-slate-900 flex-shrink-0" />
                                                <span>Send</span>
                                          </button>
                                    </div>
                              </div>
                        ))}
                  </div>
            </>
      );
};

export default Post;