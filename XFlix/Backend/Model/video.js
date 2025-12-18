import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    videoLink: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      enum: ['Education', 'Sports', 'Movies', 'Comedy', 'Lifestyle', 'All'],
      required: true,
    },
    contentRating: {
      type: String,
      enum: ['Anyone', '7+', '12+', '16+', '18+'],
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    previewImage: {
      type: String,
      required: true,
      default: 'https://i.ibb.co/nbYsmJB/xflix.jpg',
    },
    votes: {
      upVotes: {
        type: Number,
        default: 0,
      },
      downVotes: {
        type: Number,
        default: 0,
      },
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    versionKey: false, // Removes __v field
  }
);

// Index for faster queries
videoSchema.index({ title: 'text' }); // Text search index
videoSchema.index({ genre: 1 });
videoSchema.index({ contentRating: 1 });
videoSchema.index({ releaseDate: -1 });

const Video = mongoose.model('Video', videoSchema);

export default Video;
