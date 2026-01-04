import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getVideoById,
  incrementViews,
  updateVotes,
} from '../../services/videoService.js';
import styles from './VideoDetail.module.css';
import Container from '../../components/Container/Container.jsx';
import Button from '../../components/Button/Button.jsx';
import { ArrowLeft, Eye, ThumbsDown, ThumbsUp } from 'lucide-react';
import { getVideoAge } from '../../utils/dateDistance.js';

/**
 * VideoDetail Page
 * Shows full video player with details and voting
 */
const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [votingLoading, setVotingLoading] = useState(false);

  // Fetch video details and increment view count
  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);

      try {
        // Fetch video
        const videoData = await getVideoById(id);
        setVideo(videoData);

        // Increment view count
        await incrementViews(id);
        setVideo((prev) => ({
          ...prev,
          viewCount: (prev?.viewCount || 0) + 1,
        }));
      } catch (error) {
        console.error('Failed to fetch video:', error);
        toast.error(error.message || 'Failed to fetch video');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchVideo();
  }, [id]);

  // Handle vote button click
  const handleVote = async (voteType, change) => {
    try {
      const updateVideo = await updateVotes(id, voteType, change);
      setVideo(updateVideo);

      toast.success(
        change === 'increase'
          ? `${voteType === 'upVote' ? '👍' : '👎'} Vote recorded!`
          : 'Vote removed'
      );
    } catch (error) {
      console.error('Failed to update vote:', error);
      toast.error(error.message || 'Failed to update vote');
    }
  };

  // Format view count (1200000 → 1.2M)
  const formatViews = (count) => {
    if (count > 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count > 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count;
  };

  // Loading state
  if (loading) {
    return (
      <div className={styles.container}>
        <Container>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading video...</p>
          </div>
        </Container>
      </div>
    );
  }

  // Error State
  if (!video) {
    return (
      <div className={styles.container}>
        <Container>
          <div className={styles.error}>
            <h2>Video not found</h2>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft size={18} />
              Back to Home
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Container>
        {/* Back button */}
        <div className={styles.backButton}>
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft size={18} />
            Back to Home
          </Button>
        </div>

        {/* Video Player */}
        <div className={styles.player}>
          <iframe
            src={video.videoLink}
            className={styles.iframe}
            allow="accelerometer; autoplay; clipboard-write; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Info */}
        <div className={styles.info}>
          <h1 className={styles.title}>{video.title}</h1>

          {/* Stats Row */}
          <div className={styles.stats}>
            <span className={styles.stat}>
              <Eye size={16} />
              {formatViews(video.viewCount)} views
            </span>
            <span className={styles.dot}>•</span>
            <span className={styles.stat}>
              {getVideoAge(video.releaseDate)}
            </span>
          </div>

          {/* Badges */}
          <div className={styles.badges}>
            <span className={styles.genreBadge}>{video.genre}</span>
            <span className={styles.ratingBadge}>{video.contentRating}</span>
          </div>

          {/* Vote Buttons */}
          <div className={styles.voteSection}>
            <div className={styles.voteButtons}>
              <button
                className={`${styles.voteButton} ${styles.upvote}`}
                onClick={() => handleVote('upVote', 'increase')}
                // disabled={votingLoading}
              >
                <ThumbsUp size={20} />
                <span>{video.votes?.upVotes || 0}</span>
              </button>

              <button
                className={`${styles.voteButton} ${styles.downvote}`}
                onClick={() => handleVote('downVote', 'increase')}
                // disabled={votingLoading}
              >
                <ThumbsDown size={20} />
                <span>{video.votes?.downVotes || 0}</span>
              </button>
            </div>

            <p className={styles.voteHint}>Like or dislike this video</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default VideoDetail;
