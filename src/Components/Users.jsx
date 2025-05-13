import React, { useEffect, useState } from 'react';

const Users = ({ usersPromise }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        usersPromise
            .then(initialUsers => {
                setUsers(initialUsers);
            })
            .catch(error => {
                console.error('Error loading users:', error);
            });
    }, [usersPromise]);

    const handleAddUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const user = { name, email };

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            setUsers(prev => [...prev, data]);
            form.reset();
        })
        .catch(err => console.error('Failed to add user:', err));
    };

    return (
        <div>
            <h2>Users List</h2>
            <form onSubmit={handleAddUser}>
                <input type="text" name="name" placeholder="User Name" required />
                <input type="email" name="email" placeholder="User Email" required />
                <input type='submit' value='Add User' />
            </form>

            <div>
                {users.map(user => (
                    <div key={user.id}>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;
