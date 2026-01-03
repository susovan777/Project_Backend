import { useEffect, useState } from 'react';
import { useDebounce } from './hooks/useDebounce.js';
import toast, { Toaster } from 'react-hot-toast';
import Footer from './components/Footer/Footer.jsx';
import Header from './components/Header/Header.jsx';
import Select from './components/Select/Select.jsx';
import Container from './components/Container/Container.jsx';
import VideoGrid from './components/VideoGrid/VideoGrid.jsx';
import GenreFilter from './components/GenreFilter/GenreFilter.jsx';
import { CONTENT_RATINGS, SORT_OPTIONS } from './utils/constants.js';
import UploadVideoModal from './components/VideoModal/UploadModal.jsx';
import { getAllVideos, uploadVideoWithToast } from './services/videoService.js';

function App() {
  // State management
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
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

  // Handle video upload submission
  const handleUploadSubmit = async (formData) => {
    try {
      await uploadVideoWithToast(formData, toast);

      // Refresh video list after successful upload
      fetchVideos();
    } catch (error) {
      // Error already handled by uploadVideoWithToast
      throw error;
    }
  };

  // Handle video card click
  // TODO: Navigate to video detail page
  const handleVideoClick = (video) => {
    console.log('Video clicked:', video);
    toast.success(`Opening: ${video.title}`);
    // TODO: Implement navigation to video detail page
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--color-bg-secondary)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Header */}
      <Header
        searchQuery={searchQuery}
        handleSearchQuery={(e) => setSearchQuery(e.target.value)}
        onUploadClick={() => setIsUploadModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 py-8">
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
      </main>

      {/* Footer */}
      <Footer />

      {/* Upload Video Modal */}
      <UploadVideoModal
        isOpen={isUploadModalOpen}
        onSubmit={handleUploadSubmit}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
}

export default App;
