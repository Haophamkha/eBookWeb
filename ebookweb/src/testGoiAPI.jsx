import { TestChapter } from "./TestChapter";

export const TestGoiAPI = () => {
    const bookId = 2; // ID của sách bạn muốn lấy chương
    return (
        <div className="App">
        
        <TestChapter bookId={bookId} />
        </div>
    );
    }