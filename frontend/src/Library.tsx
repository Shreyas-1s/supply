import React, { useState, useEffect } from 'react';
import './Library.css'; // Import your custom CSS

interface Resource {
  id: string;
  title: string;
  description: string;
  link: string;
}

const Library: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [newResource, setNewResource] = useState<Omit<Resource, 'id'>>({
    title: '',
    description: '',
    link: '',
  });

  useEffect(() => {
    fetchResources();
  }, []);

  // Fetch resources from the API
  const fetchResources = async () => {
    try {
      const response = await fetch('/api/library');
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewResource((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to add a new resource
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newResource),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const addedResource = await response.json();
      setResources([...resources, addedResource]); // Update the resource list
      setNewResource({ title: '', description: '', link: '' }); // Reset the form
    } catch (error) {
      console.error('Error adding resource:', error);
    }
  };

  return (
    <div className="library-container">
      <h2>Supply Chain Library</h2>
      
      <form onSubmit={handleSubmit} className="library-form">
        <input
          type="text"
          name="title"
          value={newResource.title}
          onChange={handleInputChange}
          placeholder="Resource Title"
          required
          className="input-field"
        />
        <input
          type="text"
          name="description"
          value={newResource.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
          className="input-field"
        />
        <input
          type="url"
          name="link"
          value={newResource.link}
          onChange={handleInputChange}
          placeholder="Resource Link"
          required
          className="input-field"
        />
        <button type="submit" className="add-button">Add Resource</button>
      </form>

      <div className="resource-list">
        <h3>Available Resources</h3>
        {resources.length > 0 ? (
          <ul>
            {resources.map((resource) => (
              <li key={resource.id} className="resource-item">
                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                  <h4>{resource.title}</h4>
                </a>
                <p>{resource.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No resources available.</p>
        )}
      </div>
    </div>
  );
};

export default Library;
