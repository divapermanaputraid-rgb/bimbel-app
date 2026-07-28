"use client";

export function LivesIndicator({ lives }: { lives: number }) {
  return (
    <div className="flex items-center gap-1 text-2xl" aria-label={`Sisa nyawa: ${lives}`}>
      {"❤️".repeat(Math.max(0, lives))}
      {"💔".repeat(Math.max(0, 3 - lives))}
    </div>
  );
}
