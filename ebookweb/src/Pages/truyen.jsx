import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoIosSend, IoIosHeart } from "react-icons/io";
import { getChapter, getBookDetails, postComment, getComments } from "../Utils/api"; 
import useUserStore from "../Components/useUserStore"; 

export const Truyen = ({ bookId }) => {
  const [chapterNumber, setChapterNumber] = useState(1);
  const [chapters, setChapters] = useState([]);
  const [content, setContent] = useState("");
  const [bookName, setBookName] = useState(""); 
  const [author, setAuthor] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [commentText, setCommentText] = useState(""); 
  const [comments, setComments] = useState([]); 
  const [displayedCommentsCount, setDisplayedCommentsCount] = useState(3);

  const { userName, img, isLoggedIn } = useUserStore();

  // Fetch chapters and book details
  const fetchChapters = async () => {
    setLoading(true);
    setError("");
    const allChapters = [];
    let chapterIndex = 1;

    try {
      const bookData = await getBookDetails(bookId);
      if (!bookData) {
        throw new Error("Không tìm thấy thông tin sách");
      }

      setBookName(bookData.name || "Không rõ tên truyện");
      setAuthor(bookData.author || "Không rõ tác giả");

      console.log("Bắt đầu tải chương cho bookId:", bookId);

      while (true) {
        const chapterData = await getChapter(bookId, chapterIndex);
        if (chapterData && chapterData.content && chapterData.content.trim().length > 0) {
          allChapters.push({
            number: chapterIndex,
            title: chapterData.title || `Chương ${chapterIndex}`,
            content: chapterData.content,
          });
          console.log(`Thêm chương ${chapterIndex}:`, chapterData.title);
          chapterIndex++;
        } else {
          console.log(`Chương ${chapterIndex} không tồn tại hoặc không hợp lệ, dừng tải.`);
          break;
        }
      }

      if (allChapters.length > 0) {
        setChapters(allChapters);
        setChapterNumber(allChapters[0].number);
        setContent(allChapters[0].content);
        console.log("Danh sách chương:", allChapters);
      } else {
        setError("Không tìm thấy chương nào cho sách này");
      }
    } catch (err) {
      console.error("Lỗi khi tải danh sách chương:", err);
      setError(err.message || "Không thể tải danh sách chương");
    } finally {
      setLoading(false);
    }
  };

  // Navigation for previous and next chapters
  const goToPreviousChapter = () => {
    const currentIndex = chapters.findIndex((ch) => ch.number === chapterNumber);
    if (currentIndex > 0) {
      const prevChapter = chapters[currentIndex - 1];
      setChapterNumber(prevChapter.number);
      setContent(prevChapter.content);
      setIsDropdownOpen(false);
    }
  };

  const goToNextChapter = () => {
    const currentIndex = chapters.findIndex((ch) => ch.number === chapterNumber);
    if (currentIndex < chapters.length - 1) {
      const nextChapter = chapters[currentIndex + 1];
      setChapterNumber(nextChapter.number);
      setContent(nextChapter.content);
      setIsDropdownOpen(false);
    }
  };

  // Select chapter from dropdown
  const handleSelectChapter = (num) => {
    const selectedChapter = chapters.find((ch) => ch.number === num);
    if (selectedChapter) {
      setChapterNumber(selectedChapter.number);
      setContent(selectedChapter.content);
      setIsDropdownOpen(false);
    }
  };

  // Handle comment submission
  const handleSendComment = async () => {
    if (commentText.trim() && isLoggedIn) {
      const newComment = {
        commentId: Date.now().toString(),
        user: {
          userId: userName,
          userName: userName,
          img: img || "https://via.placeholder.com/40",
        },
        text: commentText,
        timestamp: new Date().toISOString(),
        likes: 0,
      };

      try {
        await postComment(bookId, newComment);
        const allComments = await getComments(bookId);
        setComments(allComments);
        setCommentText("");
        if (allComments.length > displayedCommentsCount) {
          setDisplayedCommentsCount(displayedCommentsCount + 1);
        }
      } catch (err) {
        console.error("Lỗi khi gửi bình luận:", err);
        setError("Lỗi khi gửi bình luận: " + err.message);
      }
    } else {
      setError("Vui lòng đăng nhập và nhập bình luận hợp lệ");
    }
  };

  // Handle like for comment
  const handleLikeComment = (commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.commentId === commentId) {
        return {
          ...comment,
          likes: comment.likes + 1,
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  // Handle show more comments
  const handleShowMoreComments = () => {
    setDisplayedCommentsCount((prev) => prev + 3);
  };

  // Fetch chapters and comments when component loads
  useEffect(() => {
    if (bookId) {
      fetchChapters();
      const loadComments = async () => {
        try {
          const allComments = await getComments(bookId);
          setComments(allComments);
        } catch (err) {
          console.error("Lỗi khi tải bình luận:", err);
          setComments([]);
        }
      };
      loadComments();
    }
  }, [bookId]);

  return (
    <div className="min-h-screen bg-white">
      {/* Chapter Navigation */}
      <div className="sticky top-0 z-20 bg-white shadow-md py-4 border-t border-gray-200">
        <div className="flex items-center justify-center gap-4 px-4">
          <button
            onClick={goToPreviousChapter}
            disabled={chapterNumber <= 1}
            className="bg-blue-500 text-white p-3 rounded-md shadow hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoIosArrowBack className="w-6 h-6" />
          </button>

          <div className="relative w-1/2 max-w-md">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full p-3 bg-gray-100 border rounded-md text-left text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
            >
              <span>
                Chương {chapterNumber} -{" "}
                {chapters.find((ch) => ch.number === chapterNumber)?.title || "Chọn chương"}
              </span>
              <span className="w-4 h-4 border-t-2 border-l-2 border-gray-500 transform rotate-45 -translate-y-1 translate-x-1"></span>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                <ul className="py-2">
                  {chapters.map((chapter) => (
                    <li
                      key={chapter.number}
                      onClick={() => handleSelectChapter(chapter.number)}
                      className="px-3 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Chương {chapter.number}: {chapter.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            onClick={goToNextChapter}
            disabled={chapterNumber >= chapters.length}
            className="bg-blue-500 text-white p-3 rounded-md shadow hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoIosArrowForward className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <p className="text-center text-lg text-gray-500 mt-6">Đang tải chương...</p>
      )}
      {error && (
        <p className="text-center text-lg text-red-500 mt-6">{error}</p>
      )}

      {/* Book Info and Chapter Content */}
      {content && (
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-black">{bookName}</h1>
            <p className="text-lg text-gray-600 italic">Tác giả: {author}</p>
          </div>
          <h2 className="text-2xl font-semibold text-black mb-4 text-center">
            Chương {chapterNumber} -{" "}
            {chapters.find((ch) => ch.number === chapterNumber)?.title}
          </h2>
          <div className="bg-gray-100 p-6 rounded-md text-lg text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
            {content}
          </div>
        </div>
      )}

      {/* Next Chapter Button */}
      {content && (
        <div className="flex justify-center mt-6 mb-12 max-w-3xl mx-auto px-4">
          <button
            onClick={goToNextChapter}
            disabled={chapterNumber >= chapters.length}
            className="bg-black text-white px-6 py-3 rounded-md shadow cursor-pointer transition-all duration-300 w-full max-w-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Đọc phần tiếp theo
          </button>
        </div>
      )}

      {/* Comments Section */}
      {content && (
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <h3 className="text-xl font-semibold text-black mb-4">Bình luận</h3>

          <div className="flex items-center gap-3 mb-6">
            <img
              src={isLoggedIn ? img || "https://via.placeholder.com/40" : "https://via.placeholder.com/40"}
              alt="User avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 flex items-center gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={isLoggedIn ? "Viết bình luận..." : "Vui lòng đăng nhập để bình luận"}
                disabled={!isLoggedIn}
                className="w-full p-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSendComment}
                disabled={!commentText.trim() || !isLoggedIn}
                className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoIosSend className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {comments.length > 0 ? (
              <>
                {comments.slice(0, displayedCommentsCount).map((comment) => (
                  <div key={comment.commentId} className="flex items-start gap-3">
                    <img
                      src={comment.user.img || "https://via.placeholder.com/40"}
                      alt="User avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800">
                          {comment.user.userName}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleLikeComment(comment.commentId)}
                          className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <IoIosHeart className="w-5 h-5" />
                          {comment.likes}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {comments.length > displayedCommentsCount && (
                  <div className="text-center mt-4">
                    <button
                      onClick={handleShowMoreComments}
                      className="bg-black text-white px-6 py-4 rounded-md transition-all duration-300 cursor-pointer"
                    >
                      Hiển thị thêm
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500">Chưa có bình luận nào.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};