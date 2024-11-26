import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useDocumentsStore } from '../store';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// import { useCreateDocument } from './hooks/useCreateDocument';

export const NewDocumentButton: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const { addDocument, setSelectedDocument } = useDocumentsStore();
  // const createDocumentMutation = useCreateDocument();

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[200px] p-4 border rounded-md',
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && editor) {
      //@ts-ignore
      const newDoc = addDocument({
        name: name.endsWith('.txt') ? name : `${name}.txt`,
        content: editor.getHTML(),
      });

      // Reset modal state and cleanup editor
      setName('');
      editor.commands.setContent('');
      setIsCreating(false); // Ensure this runs after other updates
      //setSelectedDocument(newDoc);
    }
  };



  return (
    <>
      <button
        onClick={() => setIsCreating(true)}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Plus className="h-5 w-5 mr-2" />
        New Document
      </button>

      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl">
            <h2 className="text-lg font-semibold mb-4">Create New Document</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Document Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter document name"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <EditorContent editor={editor} />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};