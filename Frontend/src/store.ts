import { create } from 'zustand';
import { Document, DocumentsState } from './types';
import { generateMockDocuments } from './mockData';
import toast from 'react-hot-toast';

export const useDocumentsStore = create<DocumentsState>((set) => ({
  documents: generateMockDocuments(),
  selectedDocument: null,
  searchQuery: '',
  sortBy: 'date',
  sortOrder: 'desc',
  currentPage: 1,
  itemsPerPage: 10,

  setDocuments: (documents) => set({ documents }),
  
  addDocument: (document) => {
    const newDoc = {
      ...document,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      size: document.content.length * 2,
    };
    set((state) => ({
      documents: [...state.documents, newDoc],
      currentPage: 1, // Reset to first page when adding new document
    }));
    toast.success('Document created successfully');
    return newDoc;
  },
  
  updateDocument: (id: string, content: string) => {
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === id
          ? { ...doc, content, size: content.length * 2 }
          : doc
      ),
      selectedDocument: state.selectedDocument?.id === id
        ? { ...state.selectedDocument, content, size: content.length * 2 }
        : state.selectedDocument,
    }));
    toast.success('Document saved successfully');
  },
  
  deleteDocument: (id) => {
    set((state) => {
      const newDocuments = state.documents.filter((doc) => doc.id !== id);
      const totalPages = Math.ceil(newDocuments.length / state.itemsPerPage);
      const newCurrentPage = Math.min(state.currentPage, totalPages);
      
      return {
        documents: newDocuments,
        selectedDocument: state.selectedDocument?.id === id ? null : state.selectedDocument,
        currentPage: newCurrentPage,
      };
    });
    toast.success('Document deleted successfully');
  },
  
  setSelectedDocument: (document) => set({ selectedDocument: document }),
  setSearchQuery: (searchQuery) => set({ searchQuery, currentPage: 1 }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (order) => set({ sortOrder }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  setItemsPerPage: (itemsPerPage) => set({ itemsPerPage, currentPage: 1 }),
}));