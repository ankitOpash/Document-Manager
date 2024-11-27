import React from 'react';
import { Loader } from 'lucide-react';
import { useDocumentsStore } from "../store";

export const LoadingOverlay: React.FC = () => {
    const { loading } = useDocumentsStore();

    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="flex items-center space-x-2">
                <Loader className="h-6 w-6 animate-spin text-white" />
                <span className="text-white text-sm">Processing...</span>
            </div>
        </div>
    );
};
