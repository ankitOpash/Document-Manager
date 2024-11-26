export interface Document {
  id: string;
  name: string;
  content: string;
  createdAt: Date;
  size: number;
}

export interface DocumentsState {
  documents: Document[];
  selectedDocument: Document | null;
  searchQuery: string;
  sortBy: 'name' | 'date';
  sortOrder: 'asc' | 'desc';
  currentPage: number;
  itemsPerPage: number;
  setDocuments: (documents: Document[]) => void;
  addDocument: (document: Omit<Document, 'id' | 'createdAt' | 'size'>) => Document;
  updateDocument: (id: string, content: string) => void;
  deleteDocument: (id: string) => void;
  setSelectedDocument: (document: Document | null) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: 'name' | 'date') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (count: number) => void;
}