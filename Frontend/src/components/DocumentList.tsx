import React, { useState } from "react";
import { format } from "date-fns";
import { ArrowUpDown, File, Trash2, FilePenLine } from "lucide-react";
import { useDocumentsStore } from "../store";
import { ConfirmDialog } from "./ConfirmDialog";
import { Pagination } from "./Pagination";

export const DocumentList: React.FC = () => {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const {
    documents,
    searchQuery,
    sortBy,
    sortOrder,
    currentPage,
    itemsPerPage,
    setSelectedDocument,
    deleteDocument,
    setSortBy,
    setSortOrder,
  } = useDocumentsStore();

  const filteredDocuments = documents.filter((doc: any) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    const multiplier = sortOrder === "asc" ? 1 : -1;
    if (sortBy === "name") {
      return multiplier * a.name.localeCompare(b.name);
    }
    const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
    const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
    return multiplier * (aTime - bTime);
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDocuments = sortedDocuments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const toggleSort = (field: "name" | "date") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const formatFileSize = (bytes: number) => {
    const kb = bytes / 1024;
    return `${kb.toFixed(1)} KB`;
  };

  const handleDelete = (id: string) => {
    deleteDocument(id);
    setDeleteConfirmId(null);
  };

  const documentToDelete = documents.find(
    (doc: any) => doc.id === deleteConfirmId
  );

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <button
                  className="flex items-center space-x-1 hover:text-gray-700"
                  onClick={() => toggleSort("name")}
                >
                  <span>Name</span>
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <button
                  className="flex items-center space-x-1 hover:text-gray-700"
                  onClick={() => toggleSort("date")}
                >
                  <span>Created</span>
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Size
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedDocuments.map((document) => (
              <tr key={document.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="flex items-center text-sm font-medium text-gray-900 hover:text-indigo-600"
                    onClick={() => setSelectedDocument(document)}
                  >
                    <File className="h-4 w-4 mr-2" />
                    {document.name}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {document.created_at
                    ? format(new Date(document.created_at), "PPp")
                    : "Invalid Date"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatFileSize(document.size)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => setDeleteConfirmId(document.id)}
                    className="text-red-600 hover:text-red-900 transition-colors mr-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setSelectedDocument(document)}
                    className="text-blue-600 hover:text-blue-900 transition-colors"
                  >
                    <FilePenLine className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination totalItems={filteredDocuments.length} />

      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        onConfirm={() => deleteConfirmId && handleDelete(deleteConfirmId)}
        onCancel={() => setDeleteConfirmId(null)}
        title="Delete Document"
        message={`Are you sure you want to delete "${documentToDelete?.name}"? This action cannot be undone.`}
      />
    </>
  );
};
