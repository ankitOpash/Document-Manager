"use client";

import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Save, X, Check, Edit2 } from "lucide-react";
import { useDocumentsStore } from "../store";
import MenuBar from "./MenuBar";

export const DocumentEditor: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [documentName, setDocumentName] = useState("");
  const { selectedDocument, setSelectedDocument, updateDocument } =
    useDocumentsStore();

  const editor = useEditor({
    extensions: [StarterKit],
    content: selectedDocument?.content || "",
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[200px] p-4",
      },
    },
  });

  useEffect(() => {
    if (selectedDocument) {
      setDocumentName(selectedDocument.name);
    }
  }, [selectedDocument]);

  if (!selectedDocument || !editor) return null;

  const handleSave = async () => {
    setIsSaving(true);

    updateDocument(selectedDocument.id, {
      name: documentName,
      content: editor.getHTML(),
    });

    // Simulate a brief delay to show the success state
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditingName(false);

    // Close the editor after a brief moment
    setTimeout(() => {
      setSelectedDocument(null);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            {isEditingName ? (
              <input
                type="text"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                className="text-lg font-semibold border-b border-gray-300 focus:outline-none focus:border-blue-500"
                autoFocus
              />
            ) : (
              <h2 className="text-lg font-semibold">{documentName}</h2>
            )}
            <button
              onClick={() => setIsEditingName(!isEditingName)}
              className="p-1 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
              title={isEditingName ? "Confirm name" : "Edit name"}
            >
              <Edit2 className="h-4 w-4" />
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`p-2 rounded-full transition-colors flex items-center ${isSaving
                ? "bg-green-50 text-green-600"
                : "hover:bg-gray-100 text-gray-600 hover:text-green-600"
                }`}
              title={isSaving ? "Saving..." : "Save"}
            >
              {isSaving ? (
                <Check className="h-5 w-5 animate-pulse" />
              ) : (
                <Save className="h-5 w-5" />
              )}
              <span className="ml-2">{isSaving ? "Saving..." : "Save"}</span>
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
        <div className="px-2 py-2 mb-2 overflow-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <MenuBar editor={editor} />
          <EditorContent editor={editor} className="overflow-auto max-h-[200px] border rounded-md  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200" />
        </div>
      </div>
    </div>
  );
};
