import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Save, X, Check } from 'lucide-react';
import { useDocumentsStore } from '../store';

export const DocumentEditor: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const { selectedDocument, setSelectedDocument, updateDocument } = useDocumentsStore();

  const editor = useEditor({
    extensions: [StarterKit],
    content: selectedDocument?.content || '',
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[200px] p-4',
      },
    },
  });

  if (!selectedDocument || !editor) return null;

  const handleSave = async () => {
    setIsSaving(true);
    updateDocument(selectedDocument.id, editor.getHTML());
    
    // Simulate a brief delay to show the success state
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    
    // Close the editor after a brief moment
    setTimeout(() => {
      setSelectedDocument(null);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{selectedDocument.name}</h2>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`p-2 rounded-full transition-colors ${
                isSaving
                  ? 'bg-green-50 text-green-600'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-green-600'
              }`}
              title={isSaving ? 'Saving...' : 'Save'}
            >
              {isSaving ? (
                <Check className="h-5 w-5 animate-pulse" />
              ) : (
                <Save className="h-5 w-5" />
              )}
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
              onClick={() => setSelectedDocument(null)}
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};