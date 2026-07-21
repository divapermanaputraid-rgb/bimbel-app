"use client";

type Achievement = {
  id: number;
  name: string;
  description: string | null;
  icon: string | null;
};

type AchievementGridProps = {
  allAchievements: Achievement[];
  earnedIds: number[];
};

export function AchievementGrid({ allAchievements, earnedIds }: AchievementGridProps) {
  const earnedSet = new Set(earnedIds);

  return (
    <div className="mb-8">
      <h2 className="mb-3 text-base font-bold text-slate-800 flex items-center gap-2">
        <span>🏆</span> Badge Kamu ({earnedSet.size}/{allAchievements.length})
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {allAchievements.map((badge) => {
          const earned = earnedSet.has(badge.id);
          return (
            <div
              key={badge.id}
              className={`flex flex-col items-center p-3 rounded-2xl border text-center transition-all ${
                earned
                  ? "bg-amber-50 border-amber-200 shadow-sm"
                  : "bg-slate-50 border-slate-100 opacity-60 grayscale"
              }`}
            >
              <div className="text-3xl mb-1">{badge.icon ?? "🎖️"}</div>
              <div className={`text-[10px] font-bold leading-tight ${earned ? "text-amber-900" : "text-slate-600"}`}>
                {badge.name}
              </div>
              <div className="text-[9px] mt-1 leading-tight text-slate-500">
                {earned ? "GOT IT! 🎉" : `Butuh: ${badge.description}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
