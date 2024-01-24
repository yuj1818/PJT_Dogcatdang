// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Card = ({ title, content }) => {
//   return (
//     <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
//       <h3>{title}</h3>
//       <p>{content}</p>
//     </div>
//   );
// };

// export const CardList = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://api.example.com/data');
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {data.map(item => (
//         <Card key={item.id} title={item.title} content={item.content} />
//       ))}
//     </div>
//   );
// };
