// import React, { useState, useEffect } from 'react';

// // Define types for your entities
// type Supplier = {
//   id: string;
//   name: string;
// };

// type Item = {
//   id: string;
//   name: string;
// };

// type City = {
//   id: string;
//   name: string;
// };

// type Relationship = {
//   from: string;
//   to: string;
//   type: string; // e.g., 'DELIVERS_TO', 'HAS_ITEM'
// };

// const SuperAdmin: React.FC = () => {
//   const [suppliers, setSuppliers] = useState<Supplier[]>([]);
//   const [parts, setParts] = useState<Item[]>([]);
//   const [tools, setTools] = useState<Item[]>([]);
//   const [cities, setCities] = useState<City[]>([]);
//   const [relationships, setRelationships] = useState<Relationship[]>([]);

//   const [selectedSupplier, setSelectedSupplier] = useState<string>('');
//   const [selectedItem, setSelectedItem] = useState<string>('');
//   const [itemType, setItemType] = useState<'part' | 'tool'>('part');
//   const [selectedCity, setSelectedCity] = useState<string>('');

//   // Fetch suppliers
//   // useEffect(() => {
//   //   const fetchSuppliers = async () => {
//   //     try {
//   //       const response = await fetch('http://127.0.0.1:5000/suppliers');
//   //       const data: Supplier[] = await response.json();
//   //       setSuppliers(data);
//   //     } catch (error) {
//   //       console.error('Error fetching suppliers:', error);
//   //     }
//   //   };
//   //   fetchSuppliers();
//   // }, []);
//   useEffect(() => {
//     const fetchSuppliers = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:5000/suppliers');
//         if (!response.ok) throw new Error('Error fetching suppliers');
//         const data: Supplier[] = await response.json();
//         setSuppliers(data);
//       } catch (error) {
//         console.error('Error fetching suppliers:', error);
//       }
//     };
//     fetchSuppliers();
//   }, []);
  

//   // Fetch parts
//   useEffect(() => {
//     const fetchParts = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:5000/parts');
//         const data: Item[] = await response.json();
//         setParts(data);
//       } catch (error) {
//         console.error('Error fetching parts:', error);
//       }
//     };
//     fetchParts();
//   }, []);

//   // Fetch tools
//   useEffect(() => {
//     const fetchTools = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:5000/tools');
//         const data: Item[] = await response.json();
//         setTools(data);
//       } catch (error) {
//         console.error('Error fetching tools:', error);
//       }
//     };
//     fetchTools();
//   }, []);

//   // Fetch cities
//   useEffect(() => {
//     const fetchCities = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:5000/cities');
//         const data: City[] = await response.json();
//         setCities(data);
//       } catch (error) {
//         console.error('Error fetching cities:', error);
//       }
//     };
//     fetchCities();
//   }, []);

//   const createRelationship = async (type: 'delivery' | 'item') => {
//     try {
//       const payload = type === 'delivery'
//         ? { supplierId: selectedSupplier, targetId: selectedCity, relationship_type: 'delivers to' }
//         : { supplierId: selectedSupplier, targetId: selectedItem, relationship_type: 'supplies' };
  
//       const response = await fetch('http://127.0.0.1:5000/api/relationship', {  // Make sure the endpoint is '/relationship'
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });
  
//       if (response.ok) {
//         // Fetch the updated relationships after creating a new one
//         fetchRelationships();
//         // Reset selections
//         setSelectedSupplier('');
//         setSelectedItem('');
//         setSelectedCity('');
//       }
//     } catch (error) {
//       console.error('Error creating relationship:', error);
//     }
//   };
  

//   // Fetch relationships (you can define this as its own function)
//   const fetchRelationships = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:5000/api/relationships');
//       const data: Relationship[] = await response.json();
//       setRelationships(data);
//     } catch (error) {
//       console.error('Error fetching relationships:', error);
//     }
//   };

//   useEffect(() => {
//     fetchRelationships();
//   }, []);

//   const styles = {
//     container: {
//       padding: '20px',
//       maxWidth: '1200px',
//       margin: '0 auto',
//     },
//     title: {
//       fontSize: '24px',
//       fontWeight: 'bold',
//       marginBottom: '20px',
//     },
//     grid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//       gap: '20px',
//       marginBottom: '20px',
//     },
//     card: {
//       border: '1px solid #ddd',
//       borderRadius: '8px',
//       padding: '20px',
//       backgroundColor: 'white',
//       boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//     },
//     cardTitle: {
//       fontSize: '18px',
//       fontWeight: 'bold',
//       marginBottom: '15px',
//     },
//     select: {
//       width: '100%',
//       padding: '8px',
//       marginBottom: '10px',
//       border: '1px solid #ddd',
//       borderRadius: '4px',
//     },
//     button: {
//       width: '100%',
//       padding: '10px',
//       backgroundColor: '#007bff',
//       color: 'white',
//       border: 'none',
//       borderRadius: '4px',
//       cursor: 'pointer',
//       marginTop: '10px',
//     },
//     disabledButton: {
//       backgroundColor: '#cccccc',
//       cursor: 'not-allowed',
//     },
//     relationshipItem: {
//       padding: '10px',
//       border: '1px solid #ddd',
//       borderRadius: '4px',
//       marginBottom: '10px',
//       backgroundColor: '#f8f9fa',
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Super Admin Dashboard</h1>
      
//       <div style={styles.grid}>
//         {/* Item Relationship Section */}
//         <div style={styles.card}>
//           <h2 style={styles.cardTitle}>Create Item Relationship</h2>
          
//           <select 
//             style={styles.select}
//             value={selectedSupplier}
//             onChange={(e) => setSelectedSupplier(e.target.value)}
//           >
//             <option value="">Select Supplier</option>
//             {suppliers.map(supplier => (
//               <option key={supplier.id} value={supplier.id}>
//                 {supplier.name}
//               </option>
//             ))}
//           </select>

//           <select 
//             style={styles.select}
//             value={itemType}
//             onChange={(e) => setItemType(e.target.value as "part" | "tool")}
//           >
//             <option value="part">Part</option>
//             <option value="tool">Tool</option>
//           </select>

//           <select 
//             style={styles.select}
//             value={selectedItem}
//             onChange={(e) => setSelectedItem(e.target.value)}
//           >
//             <option value="">Select {itemType}</option>
//             {(itemType === 'part' ? parts : tools).map(item => (
//               <option key={item.id} value={item.id}>
//                 {item.name}
//               </option>
//             ))}
//           </select>

//           <button 
//             style={{
//               ...styles.button,
//               ...((!selectedSupplier || !selectedItem) && styles.disabledButton)
//             }}
//             onClick={() => createRelationship('item')}
//             disabled={!selectedSupplier || !selectedItem}
//           >
//             Create Item Relationship
//           </button>
//         </div>

//         {/* Delivery Relationship Section */}
//         <div style={styles.card}>
//           <h2 style={styles.cardTitle}>Create Delivery Relationship</h2>
          
//           <select 
//             style={styles.select}
//             value={selectedSupplier}
//             onChange={(e) => setSelectedSupplier(e.target.value)}
//           >
//             <option value="">Select Supplier</option>
//             {suppliers.map(supplier => (
//               <option key={supplier.id} value={supplier.id}>
//                 {supplier.name}
//               </option>
//             ))}
//           </select>

//           <select 
//             style={styles.select}
//             value={selectedCity}
//             onChange={(e) => setSelectedCity(e.target.value)}
//           >
//             <option value="">Select City</option>
//             {cities.map(city => (
//               <option key={city.id} value={city.id}>
//                 {city.name}
//               </option>
//             ))}
//           </select>

//           <button 
//             style={{
//               ...styles.button,
//               ...((!selectedSupplier || !selectedCity) && styles.disabledButton)
//             }}
//             onClick={() => createRelationship('delivery')}
//             disabled={!selectedSupplier || !selectedCity}
//           >
//             Create Delivery Relationship
//           </button>
//         </div>
//       </div>

//       {/* Relationships Display */}
//       <div style={styles.card}>
//         <h2 style={styles.cardTitle}>Current Relationships</h2>
//         {relationships.map((rel, index) => (
//           <div key={index} style={styles.relationshipItem}>
//             {`${rel.from} ${rel.type} ${rel.to}`}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SuperAdmin;

import React, { useState, useEffect } from 'react';

// Define types for your entities
type Supplier = {
  id: string;
  name: string;
};

type Item = {
  id: string;
  name: string;
};

type City = {
  id: string;
  name: string;
};

type Relationship = {
  from: string;
  to: string;
  type: string; // e.g., 'DELIVERS_TO', 'SUPPLIES'
};

const SuperAdmin: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [parts, setParts] = useState<Item[]>([]);
  const [tools, setTools] = useState<Item[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);

  const [selectedSupplier, setSelectedSupplier] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [itemType, setItemType] = useState<'part' | 'tool'>('part');
  const [selectedCity, setSelectedCity] = useState<string>('');

  // Fetch suppliers, parts, tools, cities, and relationships
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/suppliers');
        const data: Supplier[] = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/parts');
        const data: Item[] = await response.json();
        setParts(data);
      } catch (error) {
        console.error('Error fetching parts:', error);
      }
    };
    fetchParts();
  }, []);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/tools');
        const data: Item[] = await response.json();
        setTools(data);
      } catch (error) {
        console.error('Error fetching tools:', error);
      }
    };
    fetchTools();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/cities');
        const data: City[] = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, []);

  // const createRelationship = async (type: 'delivery' | 'item') => {
  //   try {
  //     const payload = type === 'delivery'
  //       ? { supplierId: selectedSupplier, targetId: selectedCity, relationship_type: 'delivers to' }
  //       : { supplierId: selectedSupplier, targetId: selectedItem, relationship_type: 'supplies' };

  //     const response = await fetch('http://127.0.0.1:5000/api/relationship', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(payload),
  //     });

  //     if (response.ok) {
  //       // Fetch the updated relationships after creating a new one
  //       fetchRelationships();
  //       // Reset selections
  //       setSelectedSupplier('');
  //       setSelectedItem('');
  //       setSelectedCity('');
  //     }
  //   } catch (error) {
  //     console.error('Error creating relationship:', error);
  //   }
  // };
  const createRelationship = async (type: 'delivery' | 'item') => {
    try {
      // Set the appropriate payload and endpoint based on the relationship type
      let payload: Record<string, any> = {};
      let endpoint: string | undefined;

      if (type === 'delivery') {
        // For "delivers to" relationship (supplier -> city)
        payload = { supplier_id: selectedSupplier, city_id: selectedCity, relationship_type: 'delivers to' };
        endpoint = 'http://127.0.0.1:5000/api/relationship/delivers_to';
      } else if (type === 'item') {
        // For "supplies" relationship (supplier -> part/tool)
        payload = { supplier_id: selectedSupplier, item_id: selectedItem, relationship_type: 'supplies' };
        endpoint = 'http://127.0.0.1:5000/api/relationship/supplies';
      }

      // Check if the endpoint is valid before calling fetch
      if (!endpoint) {
        throw new Error('Invalid endpoint.');
      }

      // Make the POST request to the appropriate endpoint with the correct payload
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Fetch the updated relationships after creating a new one
        fetchRelationships();
        // Reset selections
        setSelectedSupplier('');
        setSelectedItem('');
        setSelectedCity('');
      } else {
        const errorResponse = await response.json();
        console.error('Error response:', errorResponse);
      }
    } catch (error) {
      console.error('Error creating relationship:', error);
    }
  };


  const fetchRelationships = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/relationships');
      const data: Relationship[] = await response.json();
      setRelationships(data);
    } catch (error) {
      console.error('Error fetching relationships:', error);
    }
  };

  useEffect(() => {
    fetchRelationships();
  }, []);

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '20px',
    },
    card: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '15px',
    },
    select: {
      width: '100%',
      padding: '8px',
      marginBottom: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    disabledButton: {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed',
    },
    relationshipItem: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      marginBottom: '10px',
      backgroundColor: '#f8f9fa',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Super Admin Dashboard</h1>

      <div style={styles.grid}>
        {/* Item Relationship Section */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Create Item Relationship</h2>

          <select
            style={styles.select}
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
          >
            <option value="">Select Supplier</option>
            {suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>

          <select
            style={styles.select}
            value={itemType}
            onChange={(e) => setItemType(e.target.value as 'part' | 'tool')}
          >
            <option value="part">Part</option>
            <option value="tool">Tool</option>
          </select>

          <select
            style={styles.select}
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
          >
            <option value="">Select {itemType}</option>
            {(itemType === 'part' ? parts : tools).map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <button
            style={{
              ...styles.button,
              ...((!selectedSupplier || !selectedItem) && styles.disabledButton)
            }}
            onClick={() => createRelationship('item')}
            disabled={!selectedSupplier || !selectedItem}
          >
            Create Item Relationship
          </button>
        </div>

        {/* Delivery Relationship Section */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Create Delivery Relationship</h2>

          <select
            style={styles.select}
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
          >
            <option value="">Select Supplier</option>
            {suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>

          <select
            style={styles.select}
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>

          <button
            style={{
              ...styles.button,
              ...((!selectedSupplier || !selectedCity) && styles.disabledButton)
            }}
            onClick={() => createRelationship('delivery')}
            disabled={!selectedSupplier || !selectedCity}
          >
            Create Delivery Relationship
          </button>
        </div>
      </div>

      {/* Relationships Display */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Current Relationships</h2>
        {relationships.map((rel, index) => (
          <div key={index} style={styles.relationshipItem}>
            {`${rel.from} ${rel.type} ${rel.to}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperAdmin;
