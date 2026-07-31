'use client';

export function EmptyState({
  message,
  icon = '📭',
  action,
}: {
  message: string;
  icon?: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="text-center p-8">
      <div className="text-6xl mb-4">{icon}</div>
      <p className="text-gray-600 mb-4">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
