"use client";
import { useState, useRef } from "react";

interface DeleteButtonProps {
  onDelete?: () => void; // 削除時のコールバック関数
}

const DeleteButton = ({ onDelete }: DeleteButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = () => {
    if (isDeleting) return;
    
    setIsPressed(true);
    if (overlayRef.current) {
      overlayRef.current.style.clipPath = 'inset(0px 0px 0px 0px)';
      overlayRef.current.style.transition = 'clip-path 2s linear';
    }

    // 2秒後に削除処理を実行
    timeoutRef.current = setTimeout(() => {
      setIsDeleting(true);
      onDelete?.(); // 削除コールバックを実行
    }, 2000);
  };

  const handleMouseUp = () => {
    if (isDeleting) return;
    
    setIsPressed(false);
    if (overlayRef.current) {
      overlayRef.current.style.clipPath = 'inset(0px 100% 0px 0px)';
      overlayRef.current.style.transition = 'clip-path 200ms ease-out';
    }
    
    // タイマーをクリア
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (isDeleting) return;
    
    setIsPressed(false);
    if (overlayRef.current) {
      overlayRef.current.style.clipPath = 'inset(0px 100% 0px 0px)';
      overlayRef.current.style.transition = 'clip-path 200ms ease-out';
    }
    
    // タイマーをクリア
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return (
    <button 
      className={`relative flex h-10 items-center gap-2 rounded-full bg-stone-100 px-6 font-medium text-stone-800 select-none transition-transform duration-150 ease-out ${
        isPressed ? 'scale-[0.97]' : ''
      } ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      disabled={isDeleting}
    >
      <div 
        ref={overlayRef}
        aria-hidden="true" 
        className="absolute inset-0 flex items-center justify-center gap-2 rounded-full bg-red-100 text-red-500"
        style={{
          clipPath: 'inset(0px 100% 0px 0px)',
          transition: 'clip-path 200ms ease-out'
        }}
      >
        <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.75 2.75C6.75 2.05964 7.30964 1.5 8 1.5C8.69036 1.5 9.25 2.05964 9.25 2.75V3H6.75V2.75ZM5.25 3V2.75C5.25 1.23122 6.48122 0 8 0C9.51878 0 10.75 1.23122 10.75 2.75V3H12.9201H14.25H15V4.5H14.25H13.8846L13.1776 13.6917C13.0774 14.9942 11.9913 16 10.6849 16H5.31508C4.00874 16 2.92263 14.9942 2.82244 13.6917L2.11538 4.5H1.75H1V3H1.75H3.07988H5.25ZM4.31802 13.5767L3.61982 4.5H12.3802L11.682 13.5767C11.6419 14.0977 11.2075 14.5 10.6849 14.5H5.31508C4.79254 14.5 4.3581 14.0977 4.31802 13.5767Z"
            fill="currentColor"
          />
        </svg>
        {isDeleting ? 'Deleting...' : 'Hold to Delete'}
      </div>
      <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.75 2.75C6.75 2.05964 7.30964 1.5 8 1.5C8.69036 1.5 9.25 2.05964 9.25 2.75V3H6.75V2.75ZM5.25 3V2.75C5.25 1.23122 6.48122 0 8 0C9.51878 0 10.75 1.23122 10.75 2.75V3H12.9201H14.25H15V4.5H14.25H13.8846L13.1776 13.6917C13.0774 14.9942 11.9913 16 10.6849 16H5.31508C4.00874 16 2.92263 14.9942 2.82244 13.6917L2.11538 4.5H1.75H1V3H1.75H3.07988H5.25ZM4.31802 13.5767L3.61982 4.5H12.3802L11.682 13.5767C11.6419 14.0977 11.2075 14.5 10.6849 14.5H5.31508C4.79254 14.5 4.3581 14.0977 4.31802 13.5767Z"
          fill="currentColor"
        />
      </svg>
      {isDeleting ? 'Deleting...' : 'Hold to Delete'}
    </button>
  );
}

export default DeleteButton