import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './ContactForm';

let ContactsList = () => {
    let [contacts, setContacts] = useState([]);
    let [search, setSearch] = useState('');
    let [page, setPage] = useState(1);
    let [limit, setLimit] = useState(5);

    useEffect(() => {
        fetchContacts();
    }, [page]);

    let fetchContacts = async () => {
        const response = await axios.get(`http://localhost:5000/contacts?_page=${page}&_limit=${limit}&q=${search}`);
        setContacts(response.data);
    };

    let handleDelete = async (id) => {
        await axios.patch(`http://localhost:5000/contacts/${id}`, { status: false });
        fetchContacts();
    };

    let totalPages = Math.ceil(contacts.length / limit);

    return (
        <div>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
            <ContactForm fetchContacts={fetchContacts} />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.filter(contact => contact.status).map(contact => (
                        <tr key={contact.id}>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                            <td><img src={contact.image} alt={contact.name} style={{ width: '50px', height: '50px' }} /></td>
                            <td>
                                <button onClick={() => handleDelete(contact.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>Previous</button>
                <button onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}>Next</button>
                <select onChange={(e) => setLimit(e.target.value)} value={limit}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </div>
        </div>
    );
};

export default ContactsList;


