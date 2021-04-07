import React, { useState } from 'react';
import "./UserForm.css";

const UserForm = () => {
    const initialState = {
        username: "",
        email: ""
    }
    const [formData, setFormData] = useState(initialState)
    const [username, setUsername] = useState("")

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, email } = formData;
        // alert(`Created user, ${username} w/ email ${email}`);
        setFormData(initialState)
        setUsername(username)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    placeholder="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <button>Create User!</button>
            </form >
            <div>
                {username ? <h4>You are logged in as: {username}</h4> : null}
            </div>
        </>
    )
}

export default UserForm;