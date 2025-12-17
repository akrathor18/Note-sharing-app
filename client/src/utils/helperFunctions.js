import {
  Award,
  TrendingUp,
  ThumbsUp,
  RefreshCcw,
} from 'lucide-react';

const getPerformanceMessage = (percentage) => {
  if (percentage === 100) {
    return {
      title: 'Perfect score',
      subtitle: 'You nailed every question. Amazing work!',
      Icon: Award,
      color: 'text-[#00E5FF]',
    };
  }

  if (percentage >= 80) {
    return {
      title: 'Excellent job',
      subtitle: 'You have a strong understanding of this topic.',
      Icon: TrendingUp,
      color: 'text-green-400',
    };
  }

  if (percentage >= 50) {
    return {
      title: 'Good effort',
      subtitle: 'A little more practice and you’ll master it.',
      Icon: ThumbsUp,
      color: 'text-yellow-400',
    };
  }

  return {
    title: 'Keep practicing',
    subtitle: 'Don’t worry — learning takes time.',
    Icon: RefreshCcw,
    color: 'text-red-400',
  };
};

export { getPerformanceMessage };