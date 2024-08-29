import React from 'react';
import './Cssfolder/loadmore.css';

export default function LoadMore({ onLoadMore }) {
    return (
        <div className="btnn">
            <button type="button" onClick={onLoadMore} className="custom-btn">Load More</button>
        </div>
    );
}