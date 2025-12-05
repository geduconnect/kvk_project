import React from 'react';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxPageDisplay = 5;  // Maximum page numbers to display at once
  const halfMaxPageDisplay = Math.floor(maxPageDisplay / 2);

  // Determine the range of pages to display based on the current page
  let startPage = Math.max(1, currentPage - halfMaxPageDisplay);
  let endPage = Math.min(totalPages, currentPage + halfMaxPageDisplay);

  if (currentPage <= halfMaxPageDisplay) {
    endPage = Math.min(totalPages, maxPageDisplay);
  } else if (currentPage + halfMaxPageDisplay >= totalPages) {
    startPage = Math.max(1, totalPages - maxPageDisplay + 1);
  }

  // Populate page numbers for display within calculated range
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', gap: '8px' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ padding: '5px 10px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
      >
        Previous
      </button>

      {startPage > 1 && (
        <button onClick={() => onPageChange(1)} style={{ padding: '5px 10px' }}>1</button>
      )}
      {startPage > 2 && <span>...</span>}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            padding: '5px 10px',
            fontWeight: page === currentPage ? 'bold' : 'normal',
            backgroundColor: page === currentPage ? '#e0e0e0' : 'transparent',
            borderRadius: '4px',
          }}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages - 1 && <span>...</span>}
      {endPage < totalPages && (
        <button onClick={() => onPageChange(totalPages)} style={{ padding: '5px 10px' }}>{totalPages}</button>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{ padding: '5px 10px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
      >
        Next
      </button>
    </div>
  );
};


