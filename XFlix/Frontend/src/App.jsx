import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Footer from './components/Footer/Footer.jsx';
import Header from './components/Header/Header.jsx';
import Container from './components/Container/Container.jsx';
import UploadVideoModal from './components/VideoModal/UploadModal.jsx';

function App() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleUploadSubmit = async (formData) => {
    console.log('Form submitted with data:', formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success('Video uploaded successfully!');
  };

  return (
    <div className="min-h-screen ">
      <Toaster />
      {/* Header */}
      <Header onUploadClick={() => setIsUploadModalOpen(true)} />

      {/* Main Content */}
      <main>
        <Container>
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold">Welcome to XFlix</h1>
            <p className="text-xl">Your video streaming platform</p>

            {/* Placeholder - we'll add video grid here */}
            <div className="mt-8 p-8 bg-white dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border">
              <p className="text-gray-600 dark:text-gray-400">
                Video grid will be displayed here...
              </p>
            </div>
          </div>
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
