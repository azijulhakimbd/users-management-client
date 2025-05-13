import React, { use } from 'react';

const Users = ({usersPromise}) => {
    const users = use(usersPromise);
    console.log(users);
    const handleAddUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const user = {name, email};
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            form.reset();
        })
    }
    return (
        <div>
           
            <h2>Users List</h2>
            <form onSubmit={handleAddUser}>
                <input type="text" name="name" placeholder=" User Name" />
                <input type="email" name="email" placeholder=" User Email" />
                <input type='submit' value='Add User'/>
            </form>
            
            
           <div> {
                users.map((user) => (
                    <div key={user.id}>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                      
                    </div>
                ))
            }</div>
        </div>
    );
};

export default Users;