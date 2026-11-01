export default function Stars({ count, size = 16 }: { count: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = count >= i;
        const half = !filled && count >= i - 0.5;
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="none">
            {filled ? (
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="#FFC633" stroke="#FFC633" strokeWidth="1"
              />
            ) : half ? (
              <>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="#FFC633" strokeWidth="1.5" />
                <path d="M12 2v15.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FFC633" />
              </>
            ) : (
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="none" stroke="#e5e5e5" strokeWidth="1.5"
              />
            )}
          </svg>
        );
      })}
      <span className="text-sm text-gray-500 ml-1">{count}/5</span>
    </div>
  );
}
