import React, { useState, useEffect } from 'react';
import './Dashboard.css';


// Define types for supplier, part, and tool
interface Supplier {
    id: string;
    name: string;
    email: string;
    company: string;
}

interface Part {
    id: string;
    name: string;
    description: string;
}

interface Tool {
    id: string;
    name: string;
    description: string;
}



const Dashboard: React.FC = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [parts, setParts] = useState<Part[]>([]);
    const [tools, setTools] = useState<Tool[]>([]);
    const [selectedCard, setSelectedCard] = useState<string | null>(null);

    const [newSupplier, setNewSupplier] = useState<Supplier>({ id: '', name: '', email: '', company: '' });
    const [newPart, setNewPart] = useState<Part>({ id: '', name: '', description: '' });
    const [newTool, setNewTool] = useState<Tool>({ id: '', name: '', description: '' });

    const [message, setMessage] = useState<string>('');

    const fetchSuppliers = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/suppliers');
            if (response.ok) {
                const data: Supplier[] = await response.json();
                setSuppliers(data);
            } else {
                console.error('Failed to fetch suppliers');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchParts = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/parts');
            if (response.ok) {
                const data: Part[] = await response.json();
                console.log("Fetched parts:", data);  // Add this line
                setParts(data);
            } else {
                console.error('Failed to fetch parts');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchTools = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/tools');
            if (response.ok) {
                const data: Tool[] = await response.json();
                setTools(data);
            } else {
                console.error('Failed to fetch tools');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCardClick = (cardName: string) => {
        setSelectedCard(cardName);
        if (cardName === 'Suppliers') {
            fetchSuppliers();
        } else if (cardName === 'Parts') {
            fetchParts();
        } else if (cardName === 'Tools') {
            fetchTools();
        }
    };

    const handleDeletesup = async (name: string) => {
        
        const endpoint = `http://127.0.0.1:5000/delete_supplier/${name}`;
        try {
            const response = await fetch(endpoint, {
                method: 'DELETE',
            });
            if (response.ok) {
                setMessage("Supplier deleted successfully!");
                // Remove the supplier from the state
                setSuppliers(suppliers.filter((supplier) => supplier.name !== name));
            } else {
                setMessage("Failed to delete supplier.");
            }
        } catch (error) {
            setMessage("Error deleting supplier.");
            console.error('Error:', error);
        }
    };

    const handleDeletepart = async (name: string) => {
        
        const endpoint = `http://127.0.0.1:5000/delete_part/${name}`;
        try {
            const response = await fetch(endpoint, {
                method: 'DELETE',
            });
            if (response.ok) {
                setMessage("Part deleted successfully!");
                // Remove the supplier from the state
                setParts(parts.filter((part) => part.name !== name));
            } else {
                setMessage("Failed to delete part.");
            }
        } catch (error) {
            setMessage("Error deleting part.");
            console.error('Error:', error);
        }
    };

    const handleDeletetool = async (name: string) => {
        
        const endpoint = `http://127.0.0.1:5000/delete_tool/${name}`;
        try {
            const response = await fetch(endpoint, {
                method: 'DELETE',
            });
            if (response.ok) {
                setMessage("Tool deleted successfully!");
                // Remove the supplier from the state
                setTools(tools.filter((tool) => tool.name !== name));
            } else {
                setMessage("Failed to delete tool.");
            }
        } catch (error) {
            setMessage("Error deleting tool.");
            console.error('Error:', error);
        }
    };
    
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'supplier' | 'part' | 'tool') => {
        if (type === 'supplier') {
            setNewSupplier({
                ...newSupplier,
                [e.target.name]: e.target.value,
            });
        } else if (type === 'part') {
            setNewPart({
                ...newPart,
                [e.target.name]: e.target.value,
            });
        } else if (type === 'tool') {
            setNewTool({
                ...newTool,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleFormSubmit = async (e: React.FormEvent, type: 'supplier' | 'part' | 'tool') => {
        e.preventDefault();
        let endpoint = '';
        let newItem = {};
        if (type === 'supplier') {
            endpoint = 'http://127.0.0.1:5000/add_supplier';
            newItem = newSupplier;
        } else if (type === 'part') {
            endpoint = 'http://127.0.0.1:5000/add_part';
            newItem = newPart;
        } else if (type === 'tool') {
            endpoint = 'http://127.0.0.1:5000/add_tool';
            newItem = newTool;
        }
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });

            if (response.ok) {
                setMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully!`);
                if (type === 'supplier') fetchSuppliers();
                else if (type === 'part') fetchParts();
                else if (type === 'tool') fetchTools();
                if (type === 'supplier') setNewSupplier({ id: '', name: '', email: '', company: '' });
                else if (type === 'part') setNewPart({ id: '', name: '', description: '' });
                else if (type === 'tool') setNewTool({ id: '', name: '', description: '' });
            } else {
                setMessage(`Failed to add ${type}.`);
            }
        } catch (error) {
            setMessage(`Error adding ${type}.`);
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (selectedCard === 'Suppliers') {
            fetchSuppliers();
        } else if (selectedCard === 'Parts') {
            fetchParts();
        } else if (selectedCard === 'Tools') {
            fetchTools();
        }
    }, [selectedCard]);

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <ul>
                    <li><a href="/superadmin">Super Admin</a></li>
                    <li><a href="/ordertracking">Order Tracking</a></li>
                    <li><a href="#rfq">RFQ</a></li>
                    <li><a href="/products">Products</a></li>
                    <li><a href="/shipments">Shipment</a></li>
                    <li><a href="/library">Library</a></li>
                </ul>
            </aside>
            <main className="main-content">
                <header className="header">
                    <h1>Supply Chain Dashboard</h1>
                    <div className="user-info">
                        <img src="profile-pic-url" alt="Profile" className="profile-pic" />
                        <span>User Name</span>
                    </div>
                </header>
                <section className="favorites">
                    <div className="card" onClick={() => handleCardClick('Suppliers')}>
                        Suppliers
                    </div>
                    <div className="card" onClick={() => handleCardClick('Parts')}>
                        Parts
                    </div>
                    <div className="card" onClick={() => handleCardClick('Tools')}>
                        Tools
                    </div>
                </section>
                
                {/* Conditional Rendering Based on Selected Card */}
{selectedCard === 'Suppliers' && (
    <section id="suppliers" className="items-list">
        <h2>Suppliers</h2>
        <form onSubmit={(e) => handleFormSubmit(e, 'supplier')}>
            <input
                type="text"
                name="name"
                value={newSupplier.name}
                onChange={(e) => handleInputChange(e, 'supplier')}
                placeholder="Supplier Name"
                required
            />
            <input
                type="email"
                name="email"
                value={newSupplier.email}
                onChange={(e) => handleInputChange(e, 'supplier')}
                placeholder="Supplier Email"
                required
            />
            <input
                type="text"
                name="company"
                value={newSupplier.company}
                onChange={(e) => handleInputChange(e, 'supplier')}
                placeholder="Supplier Company"
                required
            />
            <button type="submit">Add Supplier</button>
        </form>
        {message && <p>{message}</p>}
        <ul>
    {suppliers.map((supplier) => (
        <li key={supplier.id}>  {/* Add the key prop here */}
            <span>{supplier.name}</span>
            <div className="supplier-actions">
                <button onClick={() => handleDeletesup(supplier.name)}>Delete</button>
            </div>
        </li>
    ))}
</ul>
    </section>
)}
{selectedCard === 'Parts' && (
    <section id="parts" className="items-list">
        <h2>Parts</h2>
        <form onSubmit={(e) => handleFormSubmit(e, 'part')}>
            <input
                type="text"
                name="name"
                value={newPart.name}
                onChange={(e) => handleInputChange(e, 'part')}
                placeholder="Part Name"
                required
            />
            <input
                type="text"
                name="description"
                value={newPart.description}
                onChange={(e) => handleInputChange(e, 'part')}
                placeholder="Part Description"
                required
            />
            <button type="submit">Add Part</button>
        </form>
        {message && <p>{message}</p>}
        <ul>
    {parts.map((part) => (
        <li key={part.id}>  {/* Add the key prop here */}
            <span>{part.name}</span>
            <div className="part-actions">
                <button onClick={() => handleDeletepart(part.name)}>Delete</button>
            </div>
        </li>
    ))}
</ul>
    </section>
)}
{selectedCard === 'Tools' && (
    <section id="tools" className="items-list">
        <h2>Tools</h2>
        <form onSubmit={(e) => handleFormSubmit(e, 'tool')}>
            <input
                type="text"
                name="name"
                value={newTool.name}
                onChange={(e) => handleInputChange(e, 'tool')}
                placeholder="Tool Name"
                required
            />
            <input
                type="text"
                name="description"
                value={newTool.description}
                onChange={(e) => handleInputChange(e, 'tool')}
                placeholder="Tool Description"
                required
            />
            <button type="submit">Add Tool</button>
        </form>
        {message && <p>{message}</p>}
        <ul>
    {tools.map((tool) => (
        <li key={tool.id}>  {/* Add the key prop here */}
            <span>{tool.name}</span>
            <div className="tool-actions">
                <button onClick={() => handleDeletetool(tool.name)}>Delete</button>
            </div>
        </li>
    ))}
</ul>
    </section>
)}

            </main>
        </div>
    );
};

export default Dashboard;
