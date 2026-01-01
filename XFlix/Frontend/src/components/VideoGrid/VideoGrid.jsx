import VideoCard from '../VideoCard/VideoCard';
import styles from './VideoGrid.module.css';

/**
 * VideoGrid Component
 * Responsive grid layout for video cards
 *
 * @param {Array} videos - Array of video objects
 * @param {Function} onVideoClick - Click handler for video cards
 * @param {Boolean} loading - Loading state
 */
const VideoGrid = ({ videos, onVideoClick, loading }) => {
  // Loading skeleton
  if (loading) {
    return (
      <div className={styles.grid}>
        {[...Array(8)].map((_, index) => (
          <div key={index} className={styles.skeletonCard}>
            <div className={styles.skeletonThumbnail}></div>
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonText}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (!videos || videos.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>📹</div>
        <h3 className={styles.emptyTitle}>No videos found</h3>
        <p className={styles.emptyText}>
          Try adjusting your filters or upload a new video
        </p>
      </div>
    );
  }

  // Video grid
  return (
    <div className={styles.grid}>
      {videos.map((video) => (
        <VideoCard
          key={video._id}
          video={video}
          onClick={() => onVideoClick(video)}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
