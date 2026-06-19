import { Target, BookOpen, CheckCircle, AlertTriangle } from 'lucide-react';
import MetricsCard from './MetricsCard';

function confidenceColor(score) {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-500';
  return 'text-red-500';
}

function truncate(str, max = 28) {
  if (!str || str.length <= max) return str || '—';
  return str.slice(0, max - 1) + '…';
}

export default function MetricsRow({ metrics }) {
  const cards = [
    {
      label: 'Confidence',
      value: `${metrics.confidence}%`,
      icon: <Target className={`w-4 h-4 ${confidenceColor(metrics.confidence)}`} />,
      valueColor: confidenceColor(metrics.confidence),
    },
    {
      label: 'Source',
      value: truncate(metrics.matchedQuestion),
      icon: <BookOpen className="w-4 h-4 text-blue-500" />,
      valueColor: 'text-blue-600',
    },
    {
      label: 'Status',
      value: metrics.status,
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
      valueColor: 'text-green-600',
    },
    {
      label: 'Escalation',
      value: metrics.escalation,
      icon: <AlertTriangle className="w-4 h-4 text-purple-500" />,
      valueColor: metrics.escalation === 'Yes' ? 'text-red-500' : 'text-purple-600',
    },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {cards.map((card) => (
        <MetricsCard key={card.label} {...card} />
      ))}
    </div>
  );
}
