import { create } from "zustand";
import toast from "react-hot-toast";
// import { CreateDocument } from './config/document/documentConfig';
import {
  fetchDocuments,
  CreateDocument,
  updateDocument,
  deleteDocument,
} from "./config/document/documentConfig";

export const useDocumentsStore = create<any>((set: any) => ({
  documents: [], // Start empty to load from the API
  selectedDocument: null,
  searchQuery: "",
  sortBy: "date",
  sortOrder: "desc",
  currentPage: 1,
  itemsPerPage: 10,
  loading: false,

  setLoading: (isLoading: boolean) => set({ loading: isLoading }),

  // Fetch documents from the API
  loadDocuments: async () => {
   // set({ loading: true });
    try {
      const documents = await fetchDocuments();
      set({ documents });
      // toast.success('Documents loaded successfully');
    } catch (error) {
      console.error("Error loading documents:", error);
     // toast.error("Failed to load documents");
    } finally {
     // set({ loading: false }); // End loading
    }
  },

  // Add a new document using the API
  addDocument: async (document: any) => {
    set({ loading: true });
    try {
      const newDoc = await CreateDocument(document);
      set((state: any) => ({
        documents: [...state.documents, newDoc],
        currentPage: 1, // Reset to first page
      }));
      toast.success("Document created successfully");
      return newDoc;
    } catch (error) {
      console.error("Error creating document:", error);
      toast.error("Failed to create document");
    } finally {
      set({ loading: false }); // End loading
    }
  },

  // Update a document using the API
  // updateDocument: async (id: string, data: any) => {
  //   try {
  //     //@ts-ignore
  //     console.log(data);

  //     const{name,content}=data
  //     const updatedDoc = await updateDocument(id,  { name,content });
  //     set((state:any) => ({
  //       documents: state.documents.map((doc:any) =>
  //         doc.id === id ? { ...doc, content: updatedDoc.content, size: content.length * 2 } : doc
  //       ),
  //       selectedDocument:
  //         state.selectedDocument?.id === id
  //           ? { ...state.selectedDocument, content: updatedDoc.content, size: content.length * 2 }
  //           : state.selectedDocument,
  //     }));
  //     toast.success('Document updated successfully');
  //   } catch (error) {
  //     console.error('Error updating document:', error);
  //     toast.error('Failed to update document');
  //   }
  // },
  updateDocument: async (id: string, data: any) => {
    set({ loading: true });
    try {
      //@ts-ignore
      // console.log(data);

      const { name, content } = data; // Extract both name and content

      // Update the document by passing both 'name' and 'content'
      const updatedDoc = await updateDocument(id, { name, content });

      set((state: any) => ({
        documents: state.documents.map((doc: any) =>
          doc.id === id
            ? {
                ...doc,
                name: updatedDoc.name,
                content: updatedDoc.content,
                size: updatedDoc.content.length * 2,
              }
            : doc
        ),
        selectedDocument:
          state.selectedDocument?.id === id
            ? {
                ...state.selectedDocument,
                name: updatedDoc.name,
                content: updatedDoc.content,
                size: updatedDoc.content.length * 2,
              }
            : state.selectedDocument,
      }));

      toast.success("Document updated successfully");
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("Failed to update document");
    } finally {
      set({ loading: false }); // End loading
    }
  },

  // Delete a document using the API
  deleteDocument: async (id: string) => {
    set({ loading: true });
    try {
      await deleteDocument(id);
      set((state: any) => {
        const newDocuments = state.documents.filter(
          (doc: any) => doc.id !== id
        );
        const totalPages = Math.ceil(newDocuments.length / state.itemsPerPage);
        const newCurrentPage = Math.min(state.currentPage, totalPages);

        return {
          documents: newDocuments,
          selectedDocument:
            state.selectedDocument?.id === id ? null : state.selectedDocument,
          currentPage: newCurrentPage,
        };
      });
      toast.success("Document deleted successfully");
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Failed to delete document");
    } finally {
      set({ loading: false }); // End loading
    }
  },

  setSelectedDocument: (document: any) => set({ selectedDocument: document }),
  setSearchQuery: (searchQuery: any) => set({ searchQuery, currentPage: 1 }),
  setSortBy: (sortBy: any) => set({ sortBy }),
  setSortOrder: (order: any) => set({ sortOrder: order }),
  setCurrentPage: (currentPage: any) => set({ currentPage }),
  setItemsPerPage: (itemsPerPage: any) => set({ itemsPerPage, currentPage: 1 }),
}));
