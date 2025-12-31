import { useState } from 'react';
import Input from '../Input/Input.jsx';
import Modal from '../Modal/Modal.jsx';
import {
  GENRES,
  CONTENT_RATINGS,
  VIDEO_LINK_REGEX,
} from '../../utils/constants.js';
import Select from '../Select/Select.jsx';
import Button from '../Button/Button.jsx';
import styles from './UploadModal.module.css';

/**
 * UploadVideoModal Component
 * Modal form for uploading a new video
 *
 * @param {boolean} isOpen - Modal open state
 * @param {function} onClose - Close handler
 * @param {function} onSubmit - Submit handler
 */
const UploadVideoModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    videoLink: '',
    title: '',
    genre: '',
    contentRating: '',
    releaseDate: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    // Video link
    if (!formData.videoLink.trim()) {
      newErrors.videoLink = 'Video link is required';
    } else if (!VIDEO_LINK_REGEX.test(formData.videoLink)) {
      newErrors.videoLink =
        'Invalid video link format. Use: youtube.com/embed/<video-id> or https://www.youtube.com/embed/<video-id>';
    }

    // Title
    if (!formData.title) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    // Genre
    if (!formData.genre) {
      newErrors.genre = 'Genre is required';
    } else if (formData.genre === 'All') {
      newErrors.genre = 'Please select a specific genre';
    }

    // Content rating
    if (!formData.contentRating) {
      newErrors.contentRating = 'Content rating is required';
    }

    // Release date
    if (!formData.releaseDate) {
      newErrors.releaseDate = 'Release date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await onSubmit(formData);

      // Reset form
      setFormData({
        videoLink: '',
        title: '',
        genre: '',
        contentRating: '',
        releaseDate: '',
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.log(error);

      setErrors({
        submit: error.message || 'Failed to upload video',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle modal close
  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        videoLink: '',
        title: '',
        genre: '',
        contentRating: '',
        releaseDate: '',
      });
      setErrors({});
      onClose();
    }
  };

  // Filter out 'All' from genre options
  const genreOptions = GENRES.filter((g) => g.value !== 'All');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload New Video" size="lg">
      <form onSubmit={onSubmit} className={styles.form}>
        {/* Video Link */}
        <Input
          label="Video Link"
          name="videoLink"
          type="text"
          onChange={handleChange}
          value={formData.videoLink}
          placeholder="youtube.com/embed/dQw4w9WgXcQ"
          error={errors.videoLink}
          required={true}
        />

        {/* Title */}
        <Input
          label="Title"
          name="title"
          type="text"
          onChange={handleChange}
          value={formData.title}
          placeholder="Enter video title"
          error={errors.title}
          required
        />

        {/* Genre and Content Rating - Side by side */}
        <div className={styles.row}>
          <Select
            label="Genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            options={genreOptions}
            placeholder="Select genre"
            error={errors.genre}
            required
          />

          <Select
            label="Content Rating"
            name="contentRating"
            value={formData.contentRating}
            onChange={handleChange}
            options={CONTENT_RATINGS}
            placeholder="Select rating"
            error={errors.contentRating}
            required
          />
        </div>

        {/* Release Date */}
        <Input
          label="Release date"
          name="releaseDate"
          type="date"
          onChange={handleChange}
          value={formData.releaseDate}
          error={errors.releaseDate}
          required
        />

        {/* Submit error */}
        {errors.submit && (
          <div className={styles.submitError}>{errors.submit}</div>
        )}

        {/* Actions */}
        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Uploading...' : 'Upload Video'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UploadVideoModal;
