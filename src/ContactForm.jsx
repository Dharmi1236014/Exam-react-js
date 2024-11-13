
import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = ({ fetchContacts, contact }) => {
    const [name, setName] = useState(contact ? contact.name : '');
    const [emai l, setEmail] = useState(contact ? contact.email : '');
    const [phone, setPhone] = useState(contact ? contact.phone : '');
    const [image, setImage] = useState(contact ? contact.image : '');
    const [error, setError] = useState('');

    const validate = () => {
        if (name.length < 3) return "Name must be at least 3 characters.";
   
        if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email.";
        if (!/^\d+$/.test(phone)) return "Phone must contain only numbers.";
        if (!image) return "Image link cannot be blank.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        const contactData = { name, email, phone, image, status: true };

        try {
            await axios.post('http://localhost:5000/contacts', contactData);
            fetchContacts();
            resetForm();
        } catch (error) {
            setError("An error occurred while submitting the data.");
        }
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setImage('');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                required
            />
            <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL"
                required
            />
            <button type="submit">Add Contact</button>
            {error && <p className="error">{error}</p>}
        </form>
    );
};

export default ContactForm;






