import { getVideoAge } from '../../utils/dateDistance.js';
import styles from './VideoCard.module.css';
import { Eye, ThumbsUp, ThumbsDown } from 'lucide-react';

/**
 * VideoCard Component
 * Displays a single video with thumbnail, title, stats, etc.
 *
 * @param {Object} video - Video data
 * @param {Function} onClick - Click handler
 */
const VideoCard = ({ video, onClick }) => {
  // Format view count (1200000 → 1.2M)
  const formatViews = (count) => {
    if (count > 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count > 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count;
  };

  // Extract video ID from videoLink
  const getVideoThumbnail = (videoLink) => {
    // Extract video ID from youtube.com/embed/VIDEO_ID
    const match = videoLink.match(/embed\/([a-zA-Z0-9_-]+)/);
    const videoId = match ? match[1] : null;

    if (videoId) {
      return `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
    }

    // Fallback to previewImage
    return video.previewImage;
  };

  return (
    <div className={styles.card} onClick={onClick}>
      {/* Thumnail */}
      <div className={styles.thumbnail}>
        <img
          src={getVideoThumbnail(video.videoLink)}
          alt={video.title}
          className={styles.thumbnailImage}
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Title */}
        <h3 className={styles.title}>{video.title}</h3>

        {/* Badges */}
        <div className={styles.badges}>
          <span className={styles.genreBadge}>{video.genre}</span>
          <span className={styles.ratingBadge}>{video.contentRating}</span>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <span className={styles.stat}>
            <Eye size={14} />
            {formatViews(video.viewCount)} views
          </span>
          <span className={styles.stat}>
            <ThumbsUp size={14} />
            {video.votes?.upVotes || 0}
          </span>
          <span className={styles.stat}>
            <ThumbsDown size={14} />
            {video.votes?.downVotes || 0}
          </span>
        </div>

        {/* Date */}
        <div className={styles.date}>{getVideoAge(video.releaseDate)}</div>
      </div>
    </div>
  );
};

export default VideoCard;
