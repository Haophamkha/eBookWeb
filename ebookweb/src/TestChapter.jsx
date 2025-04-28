import React, { useState, useEffect } from 'react';
import { getChapter } from './Utils/api';

export const TestChapter = ({ bookId }) => {
  const [chapterNumber, setChapterNumber] = useState(1);
  const [chapters, setChapters] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Hàm lấy danh sách chương
  const fetchChapters = async () => {
    setLoading(true);
    setError('');
    const totalChapters = 30; 
    const allChapters = [];

    try {
      for (let i = 1; i <= totalChapters; i++) {
        const chapterData = await getChapter(bookId, i);
        if (chapterData?.content) {
          allChapters.push({
            number: i,
            title: chapterData.title,
            content: chapterData.content,
          });
        } else {
          break; // Dừng nếu không còn chương nào
        }
      }

      if (allChapters.length > 0) {
        setChapters(allChapters);
        setChapterNumber(allChapters[0].number);
        setContent(allChapters[0].content);
      }
    } catch (err) {
      console.error(err);
      setError('Không thể tải danh sách chương');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChapter = (num) => {
    setChapterNumber(num);
    const selected = chapters.find(ch => ch.number === parseInt(num));
    setContent(selected?.content || '');
  };

  useEffect(() => {
    if (bookId) fetchChapters();
  }, [bookId]);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-12">
      <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Đọc Sách</h1>

      {/* Dropdown chọn chương */}
      <div className="mb-4">
        <label htmlFor="chapterNumber" className="block text-lg text-gray-700 mb-2">Chọn Chương:</label>
        <select
          id="chapterNumber"
          className="p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={chapterNumber}
          onChange={(e) => handleSelectChapter(e.target.value)}
        >
          {chapters.map((chapter) => (
            <option key={chapter.number} value={chapter.number}>
              Chapter {chapter.number} - {chapter.title}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-center text-lg text-gray-500">Đang tải chương...</p>}
      {error && <p className="text-center text-lg text-red-500">{error}</p>}

      {/* Nội dung chương */}
      {content && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Chương {chapterNumber} - {chapters.find(ch => ch.number === parseInt(chapterNumber))?.title}
          </h2>
          <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-700 whitespace-pre-wrap break-words">
            {content}
          </pre>
        </div>
      )}
    </div>
  );
};
