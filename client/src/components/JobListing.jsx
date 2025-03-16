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
// import React, { useContext } from 'react';
// import { AppContext } from '../context/AppContext';

// const categories = [
//   { name: 'Programming', count: 24 },
//   { name: 'Marketing', count: 41 },
//   { name: 'Designing', count: 15 },
//   { name: 'Accounting', count: 22 },
//   { name: 'Analytics', count: 41 },
//   { name: 'Designing', count: 15 },
//   { name: 'Accounting', count: 22 },
// ];

// const locations = [
//   { name: 'Bangalore', count: 24 },
//   { name: 'Washington', count: 41 },
//   { name: 'Hyderabad', count: 15 },
//   { name: 'Mumbai', count: 22 },
//   { name: 'Califonia', count: 41 },
//   { name: 'Chennai', count: 15 },
//   { name: 'New York', count: 22 },
// ];

// const JobListing = () => {
//   const { searchFilter, setSearchFilter, isSearched, setIsSearched } = useContext(AppContext);

//   const removeFilter = (type) => {
//     setSearchFilter({ ...searchFilter, [type]: '' });
//     if (!searchFilter.title && !searchFilter.location) {
//       setIsSearched(false);
//     }
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '300px', lineHeight: '1.8' }}>
//       {/* Current Search */}
//       {isSearched && (
//         <div style={{ marginBottom: '20px' }}>
//           <h3 style={{ marginBottom: '10px' }}>Current Search</h3>
//           <div style={{ display: 'flex', gap: '8px' }}>
//             {searchFilter.title && (
//               <span style={{ backgroundColor: '#e0f0ff', padding: '5px 10px', borderRadius: '5px', color: '#333', cursor: 'pointer' }}>
//                 {searchFilter.title} <span onClick={() => removeFilter('title')}>✕</span>
//               </span>
//             )}
//             {searchFilter.location && (
//               <span style={{ backgroundColor: '#ffe7e7', padding: '5px 10px', borderRadius: '5px', color: '#333', cursor: 'pointer' }}>
//                 {searchFilter.location} <span onClick={() => removeFilter('location')}>✕</span>
//               </span>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Search by Categories */}
//       <div style={{ marginBottom: '20px' }}>
//         <h4 style={{ marginBottom: '10px' }}>Search by Categories</h4>
//         {categories.map((category, index) => (
//           <div key={index} style={{ marginBottom: '6px' }}>
//             <input type="checkbox" id={`category-${index}`} />
//             <label htmlFor={`category-${index}`}> {category.name} ({category.count})</label>
//           </div>
//         ))}
//       </div>
      
//       {/* Search by Location */}
//       <div>
//         <h4 style={{ marginBottom: '10px' }}>Search by Location</h4>
//         {locations.map((location, index) => (
//           <div key={index} style={{ marginBottom: '6px' }}>
//             <input type="checkbox" id={`location-${index}`} />
//             <label htmlFor={`location-${index}`}> {location.name} ({location.count})</label>
//           </div>
//         ))}
//       </div>


//       {/* Latest Jobs Section on the Right */}
//       <div style={{ flex: '1', textAlign: 'right', paddingTop: '20px' }}>
//         <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>Latest Jobs</h3>
//         <p style={{ fontSize: '16px', color: '#666' }}>Get your desired job from top companies</p>
//       </div>
//     </div>
//   );
// };

// import React, { useContext } from 'react';
// import { AppContext } from '../context/AppContext';

// // Dummy Job Data
// const jobListings = [
//   {
//     id: 1,
//     title: "Full Stack Developer",
//     location: "California",
//     level: "Senior Level",
//     description: "You will be responsible for frontend and backend development tasks. You will work closely with our...",
//     company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
//   },
//   {
//     id: 2,
//     title: "Frontend Developer",
//     location: "New York",
//     level: "Mid Level",
//     description: "Responsible for implementing visual elements that users see and interact with in a web application...",
//     company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
//   },
//   {
//     id: 3,
//     title: "Backend Developer",
//     location: "Texas",
//     level: "Senior Level",
//     description: "Design and implement APIs and server-side logic for high-performance applications...",
//     company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
//   },
//   {
//     id: 4,
//     title: "Full Stack Developer",
//     location: "California",
//     level: "Senior Level",
//     description: "You will be responsible for frontend and backend development tasks. You will work closely with our...",
//     company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
//   },
//   {
//     id: 5,
//     title: "Frontend Developer",
//     location: "New York",
//     level: "Mid Level",
//     description: "Responsible for implementing visual elements that users see and interact with in a web application...",
//     company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
//   },
//   {
//     id: 6,
//     title: "Backend Developer",
//     location: "Texas",
//     level: "Senior Level",
//     description: "Design and implement APIs and server-side logic for high-performance applications...",
//     company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
//   }
// ];

// const JobListing = () => {
//   const { searchFilter, setSearchFilter, isSearched, setIsSearched } = useContext(AppContext);

//   const removeFilter = (type) => {
//     setSearchFilter({ ...searchFilter, [type]: '' });
//     if (!searchFilter.title && !searchFilter.location) {
//       setIsSearched(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: '1256px', margin: '0 auto', padding: '20px' }}>
      
//       {/* Sidebar & Job Listings */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        
//         {/* Sidebar Filters */}
//         <div style={{ width: '195px' }}>
//           {/* Current Search Section */}
//           {isSearched && (
//             <div style={{ marginBottom: '20px' }}>
//               <h3>Current Search</h3>
//               <div style={{ display: 'flex', gap: '8px' }}>
//                 {searchFilter.title && (
//                   <span style={{ backgroundColor: '#e0f0ff', padding: '5px 10px', borderRadius: '5px', color: '#333', cursor: 'pointer' }} onClick={() => removeFilter('title')}>
//                     {searchFilter.title} ✕
//                   </span>
//                 )}
//                 {searchFilter.location && (
//                   <span style={{ backgroundColor: '#ffe7e7', padding: '5px 10px', borderRadius: '5px', color: '#333', cursor: 'pointer' }} onClick={() => removeFilter('location')}>
//                     {searchFilter.location} ✕
//                   </span>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Search by Categories */}
//           <div style={{ lineHeight: '2.4' }}>
//             <h4>Search by Categories</h4>
//             <div><input type="checkbox" /> Programming (24)</div>
//             <div><input type="checkbox" /> Marketing (41)</div>
//             <div><input type="checkbox" /> Designing (15)</div>
//             <div><input type="checkbox" /> Accounting (22)</div>
//             <div><input type="checkbox" /> Analytics (41)</div>
//           </div>

//           {/* Search by Location */}
//           <div style={{ marginTop: '20px', lineHeight: '2.4' }}>
//             <h4>Search by Location</h4>
//             <div><input type="checkbox" /> Bangalore (24)</div>
//             <div><input type="checkbox" /> Washington (41)</div>
//             <div><input type="checkbox" /> Hyderabad (15)</div>
//             <div><input type="checkbox" /> Mumbai (22)</div>
//             <div><input type="checkbox" /> California (41)</div>
//           </div>
//         </div>

//         {/* Latest Jobs Section */}
//         <div style={{ flexGrow: 1, paddingLeft: '40px' }}>
//           <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Latest Jobs</h3>
//           <p style={{ fontSize: '14px', color: '#666' }}>Get your desired job from top companies</p>

//           {/* Job Cards Grid */}
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
//             gap: '20px',
//             marginTop: '20px'
//           }}>
//             {jobListings.map(job => (
//               <div key={job.id} style={{
//                 width: '300px',
//                 padding: '15px',
//                 border: '1px solid #ddd',
//                 borderRadius: '10px',
//                 backgroundColor: '#fff',
//                 textAlign: 'center'
//               }}>
//                 {/* Logo */}
//                 <img src={job.company_logo} alt="Company Logo" style={{ width: '50px', height: '50px', marginBottom: '10px' }} />

//                 {/* Job Title */}
//                 <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>{job.title}</h3>

//                 {/* Location & Level Tags */}
//                 <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
//                   <span style={{ backgroundColor: '#e0f7fa', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' }}>
//                     {job.location}
//                   </span>
//                   <span style={{ backgroundColor: '#ffe0e0', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' }}>
//                     {job.level}
//                   </span>
//                 </div>

//                 {/* Job Description */}
//                 <p style={{ fontSize: '14px', color: '#555', marginBottom: '15px' }}>{job.description}</p>

//                 {/* Buttons */}
//                 <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
//                   <button style={{
//                     backgroundColor: '#007bff',
//                     color: '#fff',
//                     border: 'none',
//                     padding: '8px 15px',
//                     borderRadius: '5px',
//                     cursor: 'pointer'
//                   }}>
//                     Apply now
//                   </button>
//                   <button style={{
//                     backgroundColor: '#ddd',
//                     color: '#333',
//                     border: 'none',
//                     padding: '8px 15px',
//                     borderRadius: '5px',
//                     cursor: 'pointer'
//                   }}>
//                     Learn more
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
      
//     </div>
//   );
// };

// export default JobListing;


import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

// Dummy Job Data
const jobListings = [
  {
    id: 1,
    title: "Full Stack Developer",
    location: "California",
    level: "Senior Level",
    description: "You will be responsible for frontend and backend development tasks. You will work closely with our...",
    company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
  },
  {
    id: 2,
    title: "Frontend Developer",
    location: "New York",
    level: "Mid Level",
    description: "Responsible for implementing visual elements that users see and interact with in a web application...",
    company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
  },
  {
    id: 3,
    title: "Backend Developer",
    location: "Texas",
    level: "Senior Level",
    description: "Design and implement APIs and server-side logic for high-performance applications...",
    company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
  },
  {
    id: 4,
    title: "Full Stack Developer",
    location: "California",
    level: "Senior Level",
    description: "You will be responsible for frontend and backend development tasks. You will work closely with our...",
    company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
  },
  {
    id: 5,
    title: "Frontend Developer",
    location: "New York",
    level: "Mid Level",
    description: "Responsible for implementing visual elements that users see and interact with in a web application...",
    company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
  },
  {
    id: 6,
    title: "Backend Developer",
    location: "Texas",
    level: "Senior Level",
    description: "Design and implement APIs and server-side logic for high-performance applications...",
    company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
  },
  {
    id: 7,
    title: "Full Stack Developer",
    location: "California",
    level: "Senior Level",
    description: "You will be responsible for frontend and backend development tasks. You will work closely with our...",
    company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
  },
  {
    id: 8,
    title: "Frontend Developer",
    location: "New York",
    level: "Mid Level",
    description: "Responsible for implementing visual elements that users see and interact with in a web application...",
    company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
  },
  {
    id: 9,
    title: "Backend Developer",
    location: "Texas",
    level: "Senior Level",
    description: "Design and implement APIs and server-side logic for high-performance applications...",
    company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
  },
  {
    id: 10,
    title: "Full Stack Developer",
    location: "California",
    level: "Senior Level",
    description: "You will be responsible for frontend and backend development tasks. You will work closely with our...",
    company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
  },
  {
    id: 11,
    title: "Frontend Developer",
    location: "New York",
    level: "Mid Level",
    description: "Responsible for implementing visual elements that users see and interact with in a web application...",
    company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
  },
  {
    id: 12,
    title: "Backend Developer",
    location: "Texas",
    level: "Senior Level",
    description: "Design and implement APIs and server-side logic for high-performance applications...",
    company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
  },
  {
    id: 13,
    title: "Full Stack Developer",
    location: "California",
    level: "Senior Level",
    description: "You will be responsible for frontend and backend development tasks. You will work closely with our...",
    company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
  },
  {
    id: 14,
    title: "Frontend Developer",
    location: "New York",
    level: "Mid Level",
    description: "Responsible for implementing visual elements that users see and interact with in a web application...",
    company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
  },
  {
    id: 15,
    title: "Backend Developer",
    location: "Texas",
    level: "Senior Level",
    description: "Design and implement APIs and server-side logic for high-performance applications...",
    company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
  },
  {
    id: 16,
    title: "Full Stack Developer",
    location: "California",
    level: "Senior Level",
    description: "You will be responsible for frontend and backend development tasks. You will work closely with our...",
    company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
  },
  {
    id: 17,
    title: "Frontend Developer",
    location: "New York",
    level: "Mid Level",
    description: "Responsible for implementing visual elements that users see and interact with in a web application...",
    company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
  },
  {
    id: 18,
    title: "Backend Developer",
    location: "Texas",
    level: "Senior Level",
    description: "Design and implement APIs and server-side logic for high-performance applications...",
    company_logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
  },
  // Add more jobs here if you'd like to test multiple pages
];

const JobListing = () => {
  const { searchFilter, setSearchFilter, isSearched, setIsSearched } = useContext(AppContext);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  // Calculate total pages
  const totalPages = Math.ceil(jobListings.length / jobsPerPage);

  // Determine which jobs to display on the current page
  const startIndex = (currentPage - 1) * jobsPerPage;
  const displayedJobs = jobListings.slice(startIndex, startIndex + jobsPerPage);

  const removeFilter = (type) => {
    setSearchFilter({ ...searchFilter, [type]: '' });
    if (!searchFilter.title && !searchFilter.location) {
      setIsSearched(false);
    }
    // Optionally reset to page 1 after removing a filter:
    // setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ maxWidth: '1256px', margin: '0 auto', padding: '20px' }}>
      {/* Sidebar & Job Listings */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px'
        }}
      >
        {/* Sidebar Filters */}
        <div style={{ width: '195px' }}>
          {/* Current Search Section */}
          {isSearched && (
            <div style={{ marginBottom: '20px' }}>
              <h3>Current Search</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                {searchFilter.title && (
                  <span
                    style={{
                      backgroundColor: '#e0f0ff',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      color: '#333',
                      cursor: 'pointer'
                    }}
                    onClick={() => removeFilter('title')}
                  >
                    {searchFilter.title} ✕
                  </span>
                )}
                {searchFilter.location && (
                  <span
                    style={{
                      backgroundColor: '#ffe7e7',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      color: '#333',
                      cursor: 'pointer'
                    }}
                    onClick={() => removeFilter('location')}
                  >
                    {searchFilter.location} ✕
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Search by Categories */}
          <div style={{ lineHeight: '2.4' }}>
            <h4>Search by Categories</h4>
            <div>
              <input type="checkbox" /> Programming (24)
            </div>
            <div>
              <input type="checkbox" /> Marketing (41)
            </div>
            <div>
              <input type="checkbox" /> Designing (15)
            </div>
            <div>
              <input type="checkbox" /> Accounting (22)
            </div>
            <div>
              <input type="checkbox" /> Analytics (41)
            </div>
          </div>

          {/* Search by Location */}
          <div style={{ marginTop: '20px', lineHeight: '2.4' }}>
            <h4>Search by Location</h4>
            <div>
              <input type="checkbox" /> Bangalore (24)
            </div>
            <div>
              <input type="checkbox" /> Washington (41)
            </div>
            <div>
              <input type="checkbox" /> Hyderabad (15)
            </div>
            <div>
              <input type="checkbox" /> Mumbai (22)
            </div>
            <div>
              <input type="checkbox" /> California (41)
            </div>
          </div>
        </div>

        {/* Latest Jobs Section */}
        <div style={{ flexGrow: 1, paddingLeft: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Latest Jobs</h3>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Get your desired job from top companies
          </p>

          {/* Job Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '20px',
              marginTop: '20px'
            }}
          >
            {displayedJobs.map((job) => (
              <div
                key={job.id}
                style={{
                  width: '300px',
                  padding: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  backgroundColor: '#fff',
                  textAlign: 'center'
                }}
              >
                {/* Logo */}
                <img
                  src={job.company_logo}
                  alt="Company Logo"
                  style={{
                    width: '50px',
                    height: '50px',
                    marginBottom: '10px'
                  }}
                />

                {/* Job Title */}
                <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>
                  {job.title}
                </h3>

                {/* Location & Level Tags */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px',
                    marginBottom: '10px'
                  }}
                >
                  <span
                    style={{
                      backgroundColor: '#e0f7fa',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      fontSize: '12px'
                    }}
                  >
                    {job.location}
                  </span>
                  <span
                    style={{
                      backgroundColor: '#ffe0e0',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      fontSize: '12px'
                    }}
                  >
                    {job.level}
                  </span>
                </div>

                {/* Job Description */}
                <p
                  style={{
                    fontSize: '14px',
                    color: '#555',
                    marginBottom: '15px'
                  }}
                >
                  {job.description}
                </p>

                {/* Buttons */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                >
                  <button
                    style={{
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 15px',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Apply now
                  </button>
                  <button
                    style={{
                      backgroundColor: '#ddd',
                      color: '#333',
                      border: 'none',
                      padding: '8px 15px',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Learn more
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px'
            }}
          >
            {/* Render page number buttons */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  style={{
                    backgroundColor:
                      pageNumber === currentPage ? '#007bff' : '#fff',
                    color: pageNumber === currentPage ? '#fff' : '#333',
                    border: '1px solid #ccc',
                    padding: '5px 10px',
                    margin: '0 5px',
                    cursor: 'pointer',
                    borderRadius: '4px'
                  }}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
