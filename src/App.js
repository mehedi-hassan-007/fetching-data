import React,{ useState, useEffect} from 'react';
import './App.css';

const url="https://rest-api-without-db.herokuapp.com/users/";
function App() {
  const [users, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

const allUser = () =>{
  fetch(url)
  .then((res)=> {
  if(!res){
    throw Error ("The error is not found")
  }
  return res.json()
  })
  .then((data)=>{
    setUser(data.users)
    console.log(data.users);
  })
  .finally(()=>{
    setIsLoading(false)
  })
  .catch((err)=>{
    setError(err.message);
  })
}

  useEffect(() => {
    allUser()
  }, [])

  const handleDelete = (id) =>{
    fetch(url + `/${id}`,{
      method: "DELETE",
    })
    .then((res)=> {
    if(!res){
      throw Error ("COULD NOT DELETE")
    }
    allUser();
    })
  }
   
  return (
    <div className="App">
      <h1>The data management sytem</h1>
      {isLoading && <h2>Data is loading...</h2>}
      {error && (error)}
      <form>
        <input></input>
      </form>
      <section className="section">
      {users && users.map((user)=> {
        const {id, username, email}= user;
        return (
          <article key={id} className="card">
            <h3>{username}</h3>
            <p>{email}</p>
            <button className="btn">Add</button>
            <button className="btn" onClick={()=>{handleDelete(id)}}>Delete</button>
          </article>
        )
      })}
      </section>
    </div>
  );
}

export default App;
