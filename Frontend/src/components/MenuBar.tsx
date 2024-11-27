import React from 'react';

const MenuBar: React.FC<{ editor: any }> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {/* Bold */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-4 py-2 text-sm font-medium border rounded-md transition-all duration-200 ${
          editor.isActive('bold') ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-indigo-100 hover:text-indigo-800'
        }`}
      >
        Bold
      </button>
      {/* Italic */}
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-4 py-2 text-sm font-medium border rounded-md transition-all duration-200 ${
          editor.isActive('italic') ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-indigo-100 hover:text-indigo-800'
        }`}
      >
        Italic
      </button>
     
      {/* Clear Formatting */}
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="px-4 py-2 text-sm font-medium border rounded-md transition-all duration-200 bg-white text-gray-700 hover:bg-indigo-100 hover:text-indigo-800"
      >
        Clear Formatting
      </button>
      {/* Paragraph */}
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`px-4 py-2 text-sm font-medium border rounded-md transition-all duration-200 ${
          editor.isActive('paragraph') ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-indigo-100 hover:text-indigo-800'
        }`}
      >
        Paragraph
      </button>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="px-4 py-2 text-sm font-medium border rounded-md transition-all duration-200 bg-white text-gray-700 hover:bg-indigo-100 hover:text-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Undo
      </button>
      {/* Redo */}
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="px-4 py-2 text-sm font-medium border rounded-md transition-all duration-200 bg-white text-gray-700 hover:bg-indigo-100 hover:text-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Redo
      </button>
    </div>
  );
};

export default MenuBar;
