import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { useUser } from "../../Context/AuthContext";
import { useProfile } from "../../Context/ProfileContext";
import { API_BASE } from "../../../components/Config/config";

const BlogDetail = () => {
  const { user } = useUser();
  const { profile } = useProfile();
  const { id } = useParams();
  const [commenterId, setCommenterId] = useState("");
  const [name, setName] = useState("");
  const [blog, setBlog] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setCommenterId(user.id);
      setName(profile?.firstName + " " + profile?.lastName);
    } else {
      setError("User not found in context");
    }
  }, [user, profile]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Blog not found");
        }

        const data = await res.json();
        setBlog(data);
        console.log("Blog Data:", data.author);
        if (data?.content) {
          extractHeadings(data.content);
        }
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setError(err);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/comments/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Blog not found");
        }

        const data = await res.json();
        setAllComments([...data].reverse());
      } catch (err) {
        console.error("Failed to fetch comments:", err);
        setError(err);
      }
    };

    if (id) {
      fetchBlog();
      fetchComments();
    }
  }, [id]);

  const extractHeadings = (content) => {
    const headingRegex = /^(#{1,6})\s+(.*)/gm;
    const matches = [...content.matchAll(headingRegex)];
    const parsedHeadings = matches.map((match) => ({
      level: match[1].length,
      text: match[2],
      id: match[2]
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-"),
    }));
    setHeadings(parsedHeadings);
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      alert("Please write a comment before submitting.");
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/api/comments/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          blogId: id,
          commenterId: commenterId,
          content: comment.trim(),
          commenterName: name,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to submit comment");
      }

      const newComment = await res.json();
      setAllComments([newComment, ...allComments]);
      setComment("");
    } catch (err) {
      console.error("Comment submission error:", err);
      setError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!blog) return <div className="p-6">Loading...</div>;

  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="flex min-h-screen bg-custombg">
      {/* Sidebar */}
      <aside className="w-1/4 p-4 border-4 border-orange-900 sticky top-0 h-screen overflow-y-auto bg-custombg">
        <h2 className="text-lg font-bold mb-3">Contents</h2>
        {headings.length > 0 ? (
          <ul className="text-sm space-y-2">
            {headings.map((heading, idx) => (
              <li
                key={idx}
                style={{ marginLeft: `${(heading.level - 1) * 4}rem` }}
              >
                <a
                  href={`#${heading.id}`}
                  className="hover:underline text-blue-600"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No headings available</p>
        )}
      </aside>

      {/* Main content */}
      <main className="w-3/4 p-6 bg-custombg overflow-y-auto">
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-600 mb-6">
          By {blog.author} |{" "}
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
        </p>

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug]}
          components={{
            h1: ({ node, children, ...props }) => (
              <h1
                id={props.id}
                className="text-2xl font-bold mt-6 mb-2 scroll-mt-24"
                {...props}
              >
                {children}
              </h1>
            ),
            h2: ({ node, children, ...props }) => (
              <h2
                id={props.id}
                className="text-xl font-semibold mt-4 mb-2 scroll-mt-24"
                {...props}
              >
                {children}
              </h2>
            ),
            h3: ({ node, children, ...props }) => (
              <h3
                id={props.id}
                className="text-lg font-medium mt-4 mb-2 scroll-mt-24"
                {...props}
              >
                {children}
              </h3>
            ),
            p: ({ node, children, ...props }) => (
              <p className="mb-3" {...props}>
                {children}
              </p>
            ),
          }}
        >
          {blog.content}
        </ReactMarkdown>

        {/* Comments Section */}
        <div className="mt-12 border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>

          <textarea
            className="w-full p-3 border rounded mb-3"
            rows="4"
            placeholder="Write your comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            onClick={handleCommentSubmit}
            disabled={isSubmitting}
            className={`px-4 py-2 rounded text-white ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          <div className="mt-6 space-y-4">
            {allComments.length > 0 ? (
              allComments.map((c) => (
                <div key={c._id || c.id} className="p-4 bg-gray-100 rounded">
                  <p>{c.content}</p>
                  {c.createdAt && (
                    <p className="text-xs text-gray-500 mt-2">
                      By {c.commenterName} | {new Date(c.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogDetail;
