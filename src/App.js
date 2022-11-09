import React,{ useState, useEffect} from 'react';
import './App.css';
import Adduser from './components/adduser';

const url="https://rest-api-without-db.herokuapp.com/users/";
function App() {
  const [users, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //For removing data
  const [remove, setRemove] = useState({
    username: "",
    email: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedUpdaterId, setSelectedUpdaterId] = useState(false);


const allUser = () =>{
  fetch(url)
  .then((res)=> {
  if(!res.ok){
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
    if(!res.ok){
      throw Error ("COULD NOT DELETE")
    }
    allUser();
    })
  }

  const addUser =(user)=>{
    fetch(url,{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(user),
    })
    .then((res)=> {
    if(!res.ok){
      throw Error("COULD NOT CREATE")
    }else
    {allUser();}
    })
    .catch((err)=>{
      setError(err.message)
    })
  }
  const selectedUser= (id)=>{
    setSelectedUpdaterId(id);
    const editFiltered=users.filter((user)=>user.id === id)
    setRemove({
      username: editFiltered[0].username,
      email: editFiltered[0].email,
  })
  setIsUpdate(true);
  }

  const handleUpdate=(user)=>{
    fetch(url+`/${selectedUpdaterId}`,{
      method: "PUT",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(user),
    })
    .then((res)=> {
    if(!res.ok){
      throw Error("COULD NOT UPDATE")
    }else
    {allUser();}
    setIsUpdate(false);
    })
    .catch((err)=>{
      setError(err.message)
    })

  }
   
  return (
    <div className="App">
      <h1>The data management sytem</h1>
      {isLoading && <h2>Data is loading...</h2>}
      {error && <h1>{error}</h1>}
      {isUpdate ? <Adduser 
      handleSubmitAdd={handleUpdate}
      btnText="Update User" 
      remove={remove}/> : <Adduser handleSubmitAdd={addUser} btnText="Add user"  />}
      <section className="section">
      {users && users.map((user)=> {
        const {id, username, email}= user;
        return (
          <article key={id} className="card">
            <h3>{username}</h3>
            <p>{email}</p>
            <button className="btn" onClick={()=>{selectedUser(id)}}>Edit</button>
            <button className="btn" onClick={()=>{handleDelete(id)}}>Delete</button>
          </article>
        )
      })}
      </section>
    </div>
  );
}

export default App;
