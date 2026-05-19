import React, { useState, useEffect } from "react";
import { Post } from "@/entities/all";
import { Calendar, User, Tag } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function NewsPage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    loadPosts();
    
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');
    if (postId) {
      loadPost(postId);
    }
  }, []);

  const loadPosts = async () => {
    const data = await Post.filter({ published: true }, "-published_date");
    setPosts(data);
  };

  const loadPost = async (postId) => {
    try {
      const allPosts = await Post.list();
      const post = allPosts.find(p => p.id === postId);
      if (post) setSelectedPost(post);
    } catch (error) {
      console.error("Error loading post:", error);
    }
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-black">
        <article className="max-w-4xl mx-auto px-4 py-12">
          <button
            onClick={() => setSelectedPost(null)}
            className="mb-8 text-red-500 hover:text-red-400 flex items-center gap-2"
          >
            ← Back to News
          </button>

          {selectedPost.cover_image_url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full aspect-video rounded-2xl overflow-hidden mb-8"
            >
              <img
                src={selectedPost.cover_image_url}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {selectedPost.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-gray-400 mb-8 pb-8 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(selectedPost.published_date || selectedPost.created_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{selectedPost.created_by || 'Sol of the South'}</span>
              </div>
            </div>

            {selectedPost.tags && selectedPost.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedPost.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm border border-red-600/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
            </div>
          </motion.div>
        </article>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">News & Updates</h1>
          <p className="text-xl text-gray-400">
            Latest from the road and studio
          </p>
        </motion.div>

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedPost(post)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl mb-4 aspect-video bg-zinc-900">
                  {post.cover_image_url ? (
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700">
                      <Tag className="w-16 h-16" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-gray-400 mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.published_date || post.created_date).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Tag className="w-20 h-20 mx-auto mb-6 text-gray-700" />
            <h3 className="text-2xl font-bold mb-3 text-gray-300">Coming Soon</h3>
            <p className="text-gray-500 max-w-sm mx-auto">News and updates are being prepared. Check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}