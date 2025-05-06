import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { CustomButton } from "../Components/UIElements";

const BookDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const book = location.state?.book;

    const [relatedBooks, setRelatedBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
        try {
            const res = await fetch("/db.json");
            const data = await res.json();
            const books = data.book;
            const filtered = books.filter((b) => b.id !== book?.id);
            const randomBooks = filtered.sort(() => 0.5 - Math.random()).slice(0, 5);
            setRelatedBooks(randomBooks);
        } catch (error) {
            console.error("Failed to fetch books:", error);
        }
        };
        if (book) fetchBooks();
    }, [book]);

    if (!book) {
        return (
        <div className="w-[80%] mx-auto p-6">
            <p>Không tìm thấy thông tin sách.</p>
            <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded"
            >
            Quay lại
            </button>
        </div>
        );
    }

    const renderStars = (rating) => {
        const totalStars = 5;
        const filledStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const stars = [];
        for (let i = 0; i < totalStars; i++) {
        if (i < filledStars) {
            stars.push(<Star key={i} fill="currentColor" className="w-5 h-5 text-yellow-500" />);
        } else if (i === filledStars && hasHalfStar) {
            stars.push(<Star key={i} fill="currentColor" className="w-5 h-5 text-yellow-500 opacity-50" />);
        } else {
            stars.push(<Star key={i} fill="none" className="w-5 h-5 text-gray-400" />);
        }
        }
        return stars;
    };

    // ===== Xử lý khi nhấn Bắt đầu đọc =====
    const handleStartReading = () => {
        navigate(`/read/${book.id}`, { state: { book } });
    };

    return (
        <div className="w-[95%] mx-auto p-6">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3">
                    <img src={book.img} alt={book.name} className="w-full object-contain rounded shadow" />
                </div>
                <div className="w-full md:w-2/3 space-y-4 p-3">
                    <h2 className="text-2xl font-bold text-blue-900">{book.name}</h2>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-yellow-500">
                            {renderStars(parseFloat(book.star))}
                        </div>
                        <span className="text-gray-700 text-lg font-bold ml-2">{book.star}</span>
                    </div>
                    <div className="flex gap-4 mt-4 items-center">
                        <img src={book.author_avt} alt={book.author} className="w-12 h-12 object-cover rounded-lg" />
                        <div className="flex flex-col">
                            <p className="text-gray-600 text-sm">Tác giả</p>
                            <p className="text-blue-500 font-bold">{book.author}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-gray-500 text-sm">Người đăng</p>
                            <p className="text-blue-500 font-bold">{book.publisher}</p>
                        </div>
                    </div>
                    <div className="text-gray-700">
                        {book.descp.split("\n").map((item, index) => (
                        <span key={index}>
                            {item}
                            <br />
                        </span>
                        ))}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-2xl font-semibold text-orange-600">
                        {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(book.price)}
                        </p>
                        <CustomButton height="60px" width="200px" bgColor="#0000FF" onClick={handleStartReading}>
                        Bắt đầu đọc
                        </CustomButton>
                    </div>
                </div>
            </div>
            <div className="mt-10 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-2/3">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Thông tin sản phẩm</h3>
                    <table className="w-full border border-gray-300 text-left text-sm md:text-base">
                        <tbody>
                        <tr className="border-b border-gray-200">
                            <th className="px-4 py-3 w-1/3 bg-gray-100 text-gray-600">Tiêu đề</th>
                            <td className="px-4 py-3 text-gray-800">{book?.name}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <th className="px-4 py-3 bg-gray-100 text-gray-600">Tác giả</th>
                            <td className="px-4 py-3 text-gray-800">{book?.author}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <th className="px-4 py-3 bg-gray-100 text-gray-600">Nhà xuất bản</th>
                            <td className="px-4 py-3 text-gray-700">{book?.publisher}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <th className="px-4 py-3 bg-gray-100 text-gray-600">Số chương</th>
                            <td className="px-4 py-3 text-gray-700">{book?.chapters || "N/A"}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <th className="px-4 py-3 bg-gray-100 text-gray-600">Số sao</th>
                            <td className="px-4 py-3 text-gray-700">{book?.star ? `${book.star} sao` : "Chưa có đánh giá"}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <th className="px-4 py-3 bg-gray-100 text-gray-600">Ngày xuất bản</th>
                            <td className="px-4 py-3 text-gray-700">{book?.date || "Chưa có ngày xuất bản"}</td>
                        </tr>
                        <tr>
                            <th className="px-4 py-3 bg-gray-100 text-gray-600">Tags</th>
                            <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                                {book?.tags?.length > 0 ? (
                                book.tags.map((tag, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-yellow-300 border-yellow-500 rounded">
                                    {tag}
                                    </span>
                                ))
                                ) : (
                                <span className="text-gray-500">Chưa có tags</span>
                                )}
                            </div>
                            </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            <div className="w-full md:w-1/3 space-y-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Số chương</h3>
                {book?.chapters ? (
                    <div className="max-h-[400px] overflow-y-auto pr-2 space-y-2">
                    {Array.from({ length: book.chapters }, (_, i) => (
                        <div key={i} className="px-4 py-3 border-b border-gray-200 bg-white hover:bg-gray-50 text-gray-800">
                        Chương {i + 1}
                        </div>
                    ))}
                    </div>
                    ) : (
                <p className="text-gray-500">Không có dữ liệu chương.</p>
                )}
            </div>
            </div>
        </div>
    );
};

export default BookDetails;
