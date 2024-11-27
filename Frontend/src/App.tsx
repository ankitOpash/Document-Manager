
import { DocumentList } from './components/DocumentList';
import { DocumentEditor } from './components/DocumentEditor';
import { SearchBar } from './components/SearchBar';
import { NewDocumentButton } from './components/NewDocumentButton';
import { useDocumentsStore } from './store';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { LoadingOverlay } from './components/LoadingOverlay';

function App() {

  const {  loadDocuments } = useDocumentsStore();

  useEffect(() => {
    loadDocuments();
  }, []);
  const { selectedDocument } = useDocumentsStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <LoadingOverlay />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Documents</h1>
          <div className="flex justify-between items-center space-x-4">
            <div className="flex-1 max-w-xs">
              <SearchBar />
            </div>
            <NewDocumentButton />
          </div>
        </div>
        <div className="bg-white shadow rounded-lg">
          <DocumentList />
        </div>
      </div>
      {selectedDocument && <DocumentEditor />}
    </div>
  );
}

export default App;