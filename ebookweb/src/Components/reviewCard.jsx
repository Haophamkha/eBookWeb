export default function ReviewCard() {
    return (
      <div className="bg-orange-400 text-white rounded-xl p-6 max-w-sm">
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          <span>⭐</span>
          <span>⭐</span>
          <span>⭐</span>
          <span>⭐</span>
          <span className="opacity-40">⭐</span>
        </div>
  
        {/* Review Text */}
        <p className="italic mb-6">
          Very impressive store. Your book made studying for the ABC certification exams a breeze. Thank you very much
        </p>
  
        {/* Profile Info */}
        <div className="flex items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Miranda Lee"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div>
            <h4 className="font-bold">Miranda Lee</h4>
            <p className="text-sm text-white/80">Book Lovers</p>
          </div>
        </div>
      </div>
    );
  }
  