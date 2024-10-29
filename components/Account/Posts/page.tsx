"use client";

import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useDataContext } from '../../../contexts/UserContext';  // Import the context
import 'react-quill/dist/quill.snow.css';
import {
      PhotoIcon,
      XMarkIcon,
      VideoCameraIcon

} from '@heroicons/react/20/solid';
import Image from 'next/image';
const ReactQuill = dynamic(() => import('react-quill'), {
      ssr: false,
      loading: () => <p>Loading ...</p>,
    });

const Posts = () => {
      const { avatarUrl, firstName, setFirstName, setAvatarUrl } = useDataContext();
      const [editorContent, setEditorContent] = useState<string>('');
      const [selectedImage, setSelectedImage] = useState<string | null>(null);
      const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
      const [postStatus, setPostStatus] = useState('Published');

      const imageInputRef = useRef<HTMLInputElement | null>(null);
      const videoInputRef = useRef<HTMLInputElement | null>(null);

      const handleEditorChange = (content: string) => {
            setEditorContent(content);
      };

      const handlePhotoClick = () => {
            if (imageInputRef.current) {
                  imageInputRef.current.click();
            }
      };

      const handleVideoClick = () => {
            if (videoInputRef.current) {
                  videoInputRef.current.click();
            }
      };
      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files && event.target.files[0]) {
                  const file = event.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                        setSelectedImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
            }
      };

      const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files && event.target.files[0]) {
                  const file = event.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                        setSelectedVideo(reader.result as string); // ذخیره URL ویدیو
                  };
                  reader.readAsDataURL(file); // تبدیل ویدیو به URL
            }
      };

      const handleRemoveImage = () => {
            setSelectedImage(null);
            if (imageInputRef.current) {
                  imageInputRef.current.value = '';
            }
      };
      const handleRemoveVideo = () => {
            setSelectedVideo(null);
            if (videoInputRef.current) {
                  videoInputRef.current.value = '';
            }
      };

      const handlePost = () => {
            console.log('Posting:', editorContent, postStatus, selectedImage, selectedVideo);
      };

      return (
            <div className="">
                  <div className="flex items-center space-x-4 mb-4">
                        {avatarUrl ? (
                              <Image src={avatarUrl} alt={firstName} className="w-10 h-10 rounded-full" />
                        ) : (
                              <Image src="images/07.jpg" alt={firstName} className="w-32 h-32 rounded-full border-4 border-white" />
                        )}

                        <ReactQuill
                              value={editorContent}
                              onChange={handleEditorChange}
                              theme="snow"
                              className="h-30 w-full text-left"
                        />

                  </div>

                  {/* Photo, Video */}
                  <div className="flex space-x-4">
                        <div className="flex w-1/2 space-x-4">
                              <button
                                    className="flex items-center bg-gray-100 p-2 rounded-lg hover:bg-gray-200 text-sm text-slate-800"
                                    onClick={handlePhotoClick}>
                                    <PhotoIcon className="h-4 flex-shrink-0 mr-2 w-4 text-green-500" />
                                    Photo
                              </button>
                              <input
                                    type="file"
                                    ref={imageInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                              />
                              <button
                                    className="flex items-center bg-gray-100 p-2 rounded-lg hover:bg-gray-200 text-sm text-slate-800"
                                    onClick={handleVideoClick}>
                                    <VideoCameraIcon className="h-4 flex-shrink-0 mr-2 w-4 text-blue-600" />
                                    Video
                              </button>
                              <input
                                    type="file"
                                    ref={videoInputRef}
                                    className="hidden"
                                    accept="video/*"
                                    onChange={handleVideoChange}
                              />
                        </div>
                        <div className="flex items-center space-x-4 w-1/2 justify-end">
                              <div>
                                    <label htmlFor="post-status" className="sr-only">
                                          Post Status:
                                    </label>
                                    <select
                                          id="post-status"
                                          value={postStatus}
                                          onChange={(e) => setPostStatus(e.target.value)}
                                          className="block w-full p-2 border border-gray-300 rounded-lg text-sm"
                                    >
                                          <option value="Published">Published</option>
                                          <option value="Draft">Draft</option>
                                          <option value="Pending Review">Pending Review</option>
                                    </select>
                              </div>

                              <button
                                    className="bg-green-200 text-green-600 hover:text-white duration-700 px-4 py-2 rounded-lg hover:bg-green-600 text-sm"
                                    onClick={handlePost}
                              >
                                    Post
                              </button>
                        </div>
                  </div>
                  {selectedImage && (
                        <div className="mt-4 relative">
                              <Image src={selectedImage} alt="Selected" className="w-full h-auto rounded-lg" />
                              <button
                                    onClick={handleRemoveImage}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                              >
                                    <XMarkIcon className="w-5 flex-shrink-0" />
                              </button>
                        </div>
                  )}
                  {selectedVideo && (
                        <div className="mt-4 relative">
                              <video controls className="w-full h-auto rounded-lg">
                                    <source src={selectedVideo} type="video/mp4" />
                                    Your browser does not support the video tag.
                              </video>
                              <button
                                    onClick={handleRemoveVideo}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                              >
                                    <XMarkIcon className="w-5 flex-shrink-0" />
                              </button>
                        </div>
                  )}

            </div>
      );
};
export default Posts;