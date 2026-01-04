import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce.js';
import Select from '../../components/Select/Select.jsx';
import VideoGrid from '../../components/VideoGrid/VideoGrid.jsx';
import Container from '../../components/Container/Container.jsx';
import { getAllVideos } from '../../services/videoService.js';
import GenreFilter from '../../components/GenreFilter/GenreFilter.jsx';
import { CONTENT_RATINGS, SORT_OPTIONS } from '../../utils/constants.js';

/**
 * Home Page
 * Main landing page with video grid and filters
 */
const Home = ({ searchQuery = '' }) => {
  const navigate = useNavigate();

  // State management
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter states
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedRating, setSelectedRating] = useState('Anyone');
  const [sortBy, setSortBy] = useState('releaseDate');

  // Debounce search query to avoid too many API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  /**
   * Fetch videos from API
   * Called on component mount and when filters change
   */
  const fetchVideos = async () => {
    setLoading(true);

    try {
      // Build query parameters
      const params = {};

      if (debouncedSearchQuery) {
        params.title = debouncedSearchQuery;
      }

      if (selectedGenre && selectedGenre !== 'All') {
        params.genres = selectedGenre;
      }

      if (selectedRating && selectedRating !== 'Anyone') {
        params.contentRating = selectedRating;
      }

      if (sortBy) {
        params.sortBy = sortBy;
      }

      const fetchedVideos = await getAllVideos(params);
      setVideos(fetchedVideos);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
      toast.error(error.message || 'Failed to load videos');
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch videos when filters change
  useEffect(() => {
    fetchVideos();
  }, [debouncedSearchQuery, selectedGenre, selectedRating, sortBy]);

  // Handle video card click - Navigate to video detail page
  const handleVideoClick = (video) => {
    console.log('Video clicked:', video);
    navigate(`/videos/${video._id}`);
  };

  return (
    <Container className="my-10">
      {/* Genre Filter */}
      <div className="mb-6">
        <GenreFilter
          selectedGenre={selectedGenre}
          onGenreChange={(genre) => setSelectedGenre(genre)}
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        {/* Content rating filter */}
        <div className="w-full sm:w-auto sm:min-w-[200px]">
          <Select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            options={CONTENT_RATINGS}
            placeholder="Filter by rating"
          />
        </div>

        {/* Sort By */}
        <div className="w-full sm:w-auto sm:min-w-[200px]">
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={SORT_OPTIONS}
            placeholder="Sort by"
          />
        </div>

        {/* Results count */}
        {!loading && (
          <div>
            {videos.length} {videos.length === 1 ? 'video' : 'videos'} found
          </div>
        )}
      </div>

      {/* Video Grid */}
      <VideoGrid
        videos={videos}
        loading={loading}
        onVideoClick={handleVideoClick}
      />
    </Container>
  );
};

export default Home;
