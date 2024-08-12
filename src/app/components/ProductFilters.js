// /components/ProductFilters.js
import { useState, useEffect } from 'react';

export default function ProductFilters({ categories, onFilter }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  const applyFilters = () => {
    onFilter({ category: selectedCategory, priceRange: selectedPriceRange });
  };

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedPriceRange]);

  return (
    <aside className="w-full md:w-1/4 p-4 border-r">
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Categories</h4>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Price Range</h4>
        <select
          value={selectedPriceRange}
          onChange={(e) => setSelectedPriceRange(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">All Prices</option>
          <option value="0-50">$0 - $50</option>
          <option value="51-100">$51 - $100</option>
          <option value="101-200">$101 - $200</option>
        </select>
      </div>
    </aside>
  );
}
