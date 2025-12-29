import Container from './components/Container/Container.jsx';
import Footer from './components/Footer/Footer.jsx';
import Header from './components/Header/Header.jsx';

function App() {
  return (
    <div className="min-h-screen ">
      <Header onUploadClick={''} />

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

      <Footer />
    </div>
  );
}

export default App;
