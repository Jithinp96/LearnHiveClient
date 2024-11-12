import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Column<T> = {
    header: string;
    accessor: keyof T;
    render?: (value: any) => React.ReactNode;
};

type TableProps<T> = {
    data: T[];
    columns: Column<T>[];
    itemsPerPage?: number;
    className?: string;
    onRowClick?: (item: T) => void;
};

const Table = <T extends Record<string, any>>({
    data,
    columns,
    itemsPerPage = 10,
    className = '',
    onRowClick,
}: TableProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    const nextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    return (
        <div className="w-full">
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
                    <thead className="bg-gray-200">
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                key={index}
                                className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                                >
                                {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {currentItems.map((item, rowIndex) => (
                            <tr
                                key={rowIndex}
                                onClick={() => onRowClick && onRowClick(item)}
                                className={`hover:bg-gray-50 transition-colors duration-200 ${
                                    onRowClick ? 'cursor-pointer' : ''
                                }`}
                            >
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap"
                                    >
                                        {column.render
                                        ? column.render(item[column.accessor])
                                        : item[column.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing{' '}
                            <span className="font-medium">{startIndex + 1}</span> to{' '}
                            <span className="font-medium">
                                {Math.min(endIndex, data.length)}
                            </span>{' '}
                            of <span className="font-medium">{data.length}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;