import React from "react";
import "./EmptyState.css";

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon-wrapper">
        <div className="empty-icon">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/data-not-found-illustration-download-in-svg-png-gif-file-formats--message-empty-communication-emptystate-no-pack-design-development-illustrations-9404367.png"
            alt="No cars available"
          />
        </div>
      </div>
      <h2 className="empty-title">No Cars Available</h2>
      <p className="empty-description">
        We couldn't find any vehicles matching your criteria. Try adjusting your
        filters or check back later.
      </p>
      <div className="empty-actions">
        <button className="empty-action primary">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9" />
          </svg>
          Refresh Listings
        </button>
        <button className="empty-action secondary">Browse All Cars</button>
      </div>
    </div>
  );
}

export default EmptyState;
