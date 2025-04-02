import React, { useState, useEffect }  from 'react';
const Home = () => {const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users/")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setUsers(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
      }, [])
      if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (

          <table className='table table-success table-striped'>
            <tbody>
            {users.map(user => (
                <tr key={user.id}>
                   <td>{user.name} </td>
                   <td>{user.email} </td>
                   <td>{user.username} </td>
                </tr>
                ))}
            </tbody>
          
          </table>
            // <ul>
            //     {users.map(user => (
            //     <li key={user.id}>
            //         {user.name} 
            //     </li>
            //     ))}
            // </ul>
        );
    }
}
export default Home;