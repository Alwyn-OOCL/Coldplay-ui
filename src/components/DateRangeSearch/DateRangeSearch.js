// src/components/DateRangeSearch/DateRangeSearch.js
import React, { useState, useEffect } from 'react';
import './DateRangeSearch.css';

export default function DateRangeSearch({ onRangeChange, initialRange, onApplyFilters }) {
    const [startDate, setStartDate] = useState(initialRange.startDate);
    const [endDate, setEndDate] = useState(initialRange.endDate);

    useEffect(() => {
        setStartDate(initialRange.startDate);
        setEndDate(initialRange.endDate);
    }, [initialRange]);

    const handleDateChange = () => {
        // Update pending date range in parent
        onRangeChange({ startDate, endDate });
    };

    useEffect(() => {
        handleDateChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate]);

    const handleApplyFilters = (e) => {
        e.preventDefault();
        // Now actually apply filters and date range in parent
        onApplyFilters();
    };

    return (
        <form onSubmit={handleApplyFilters} className="date-range-search">
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Start Date"
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="End Date"
            />
            {/* Apply Filters button triggers the actual filtering */}
            <button type="submit">Apply Filters</button>
        </form>
    );
}
