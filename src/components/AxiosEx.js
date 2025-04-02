import axios from 'axios';
import React, { useState, useEffect } from 'react';

const AxiosEx = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users/")
            .then(res => {
                setIsLoaded(true);
                setUsers(res.data); 
            })
            .catch(error => {
                setIsLoaded(true);
                setError(error);
            });
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <table className="table table-success table-striped">
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default AxiosEx;
