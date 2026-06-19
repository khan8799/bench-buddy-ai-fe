export default function MetricsCard({ label, value, icon, valueColor }) {
  return (
    <div className="bg-white rounded-xl px-3 py-2.5 flex flex-col items-center gap-1 shadow-sm border border-gray-100 min-w-[90px] flex-1">
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50">
        {icon}
      </div>
      <p className="text-xs text-gray-500 font-medium text-center leading-tight">{label}</p>
      <p className={`text-sm font-bold text-center leading-tight ${valueColor}`}>{value}</p>
    </div>
  );
}
