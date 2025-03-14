// import React, { useContext } from 'react';
// import { AppContext } from '../context/AppContext';

// const JobListing = () => {
//   const { searchFilter, isSearched } = useContext(AppContext);

//   return (
//     <div>
//         {/* Sidebar */}
//         <div>
//             {/* Search Filter from Hero Component */}
//         {isSearched && (
//         <div>
//           <h3>Current Search</h3>
//           <p><strong>Title:</strong> {searchFilter.title}</p>
//           <p><strong>Location:</strong> {searchFilter.location}</p>
//         </div>
//       )}
//         </div>

//     </div>
//   );
// };

// export default JobListing;
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const categories = [
  { name: 'Programming', count: 24 },
  { name: 'Marketing', count: 41 },
  { name: 'Designing', count: 15 },
  { name: 'Accounting', count: 22 },
  { name: 'Analytics', count: 41 },
  { name: 'Designing', count: 15 },
  { name: 'Accounting', count: 22 },
];

const locations = [
  { name: 'Bangalore', count: 24 },
  { name: 'Hyderabad', count: 41 },
  { name: 'Mumbai', count: 15 },
  { name: 'Chennai', count: 22 },
];

const JobListing = () => {
  const { searchFilter, setSearchFilter, isSearched, setIsSearched } = useContext(AppContext);

  const removeFilter = (type) => {
    setSearchFilter({ ...searchFilter, [type]: '' });
    if (!searchFilter.title && !searchFilter.location) {
      setIsSearched(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '300px', lineHeight: '1.8' }}>
      {/* Current Search */}
      {isSearched && (
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '10px' }}>Current Search</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            {searchFilter.title && (
              <span style={{ backgroundColor: '#e0f0ff', padding: '5px 10px', borderRadius: '5px', color: '#333', cursor: 'pointer' }}>
                {searchFilter.title} <span onClick={() => removeFilter('title')}>✕</span>
              </span>
            )}
            {searchFilter.location && (
              <span style={{ backgroundColor: '#ffe7e7', padding: '5px 10px', borderRadius: '5px', color: '#333', cursor: 'pointer' }}>
                {searchFilter.location} <span onClick={() => removeFilter('location')}>✕</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Search by Categories */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ marginBottom: '10px' }}>Search by Categories</h4>
        {categories.map((category, index) => (
          <div key={index} style={{ marginBottom: '6px' }}>
            <input type="checkbox" id={`category-${index}`} />
            <label htmlFor={`category-${index}`}> {category.name} ({category.count})</label>
          </div>
        ))}
      </div>
      
      {/* Search by Location */}
      <div>
        <h4 style={{ marginBottom: '10px' }}>Search by Location</h4>
        {locations.map((location, index) => (
          <div key={index} style={{ marginBottom: '6px' }}>
            <input type="checkbox" id={`location-${index}`} />
            <label htmlFor={`location-${index}`}> {location.name} ({location.count})</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListing;