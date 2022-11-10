import React,{ useState, useEffect } from 'react';

const Adduser = ({handleSubmitAdd, remove, btnText}) => {
    const [user, setUser] = useState(
    {    username: "",
         email: "", }
    )
    const{ username, email} = user;
    useEffect(() => {
        setUser({
            username: remove.username,
            email: remove.email,
        })
    }, [remove])
    

    const handleChange=(e)=> {
        const selectedfield = e.target.name;
        const selectedvalue = e.target.value;
        setUser(prevstate=>{
            return {...prevstate,[selectedfield]: selectedvalue}
        });
    }
    const handleSubmit= (e)=>{
        e.preventDefault();
        handleSubmitAdd(user);
        setUser({
            username: "",
            email: "",
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="field-group">
                <label  htmlFor="username" >Username:</label>
                <input className="userInput" id="username" placeholder='username' type="text" name="username" value={username} onChange={handleChange} required></input>
            </div>
            <div className="field-group">
                <label  htmlFor="email" >Email:</label>
                <input className="userInput" id="email" type="text" placeholder='email' name="email" value={email} onChange={handleChange} required></input>
            </div>
            <button type="submit" className="btn">{btnText}</button>
        </form>
    );
};
Adduser.defaultProps={
    remove: {
        username: "",
        email: "",
    }
}

export default Adduser;