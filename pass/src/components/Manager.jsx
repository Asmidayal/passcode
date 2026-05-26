import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState(JSON.parse(localStorage.getItem("passwords")) || [])
  // This starts as false because you want the password hidden initially
const [isPasswordVisible, setIsPasswordVisible] = useState(false);
 
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
};

   // passwordRef.current.type="text"
   // console.log(ref.current.src)
    //if (ref.current.src.includes("icons/hidden.png")) {
        
    //  ref.current.src = "icons/eye.png"
    //   passwordRef.current.type="text"
   // }
   // else {
    //  ref.current.src = "icons/hidden.png"
   //  passwordRef.current.type="password"
   // }

  
  const savePassword = () => {
    if (form.site.length>3 && form.username.length>3 && form.password.length>3) {
     const id = uuidv4(); //  generate once, reuse everywhere
    const newEntry = { ...form, id };
    setPasswordArray([...passwordArray, newEntry])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, newEntry]))
    
     setform({ site: "", username: "", password: "" }); // ✅ reset form after save
  } else {
    alert("Each field must be longer than 3 characters!"); // ✅ user feedback
  }
};

    //localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
   // console.log(passwordArray)
  
  const deletePassword =  (id) => {
    console.log("delete password", id)
    setPasswordArray(passwordArray.filter(item=>item.id !== id))
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
  

 }
 const editPassword = (id) => {
   console.log("edit password", id)
   setform({ ...passwordArray.filter(i=>i.id === id)[0], id })
   setPasswordArray(passwordArray.filter(item=>item.id !== id))
  
   localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
    //console.log(passwordArray)
}
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  alert("Copied to Clipboard")
}
  
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      <div className=" mycontainer ">
        <h2 className='text-purple-600 font-bold text-center'> Your own password manager</h2>
        <div className=" text-purple-800 flex flex-col p-4 max-w-2xl mx-auto w-full gap-5">
          <input value={form.site} onChange={handleChange} className="rounded-full border border-purple-600 w-full p-2 py-1px-4 focus:outline-none " type="text" placeholder="Enter website URL" name="site"></input>
          <div className="flex flex-col md:flex-row w-full gap-3 justify-center">
            <input value={form.username} onChange={handleChange} className="rounded-full border border-purple-600 w-full p-2 py-1 md:w-1/2 px-4 focus:outline-none " type="text" placeholder="Enter Username" name="username"></input>
            <div className="relative w-full md:w-1/2" >
              <input type={isPasswordVisible ? "text" : "password"} 
    value={form.password} 
    onChange={handleChange} className="rounded-full border border-purple-600 w-full p-2 py-1 pl-4 pr-10 focus:outline-none"  placeholder='Enter Password' name="password"></input>
              <span className= 'absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'onClick={togglePasswordVisibility}>
                {isPasswordVisible ? "🙈" : "👁️" }
              </span>
            </div>
          </div>
          <div className='flex justify-center w-full '>
            <button onClick={savePassword} className="flex justify-center items-center gap-2 bg-purple-600 rounded-full border border-purple-800 px-2 py-1 w-fit text-purple-100 hover:font-bold text-sm"> Add Password</button></div>
        </div>
        <div className='passwords'>
          <h2 className='font-bold text-2xl text-purple-600 p-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div> No Passwords to Show</div>}
         {passwordArray.length != 0 && 
         <div className="w-full overflow-x-auto rounded-xl border border-purple-200 shadow-sm">
         <table className="table-auto w-full min-w-[600px] rounded-xl">
  <thead className='bg-purple-300 text-purple-900 py-2 '>
    <tr>
      <th>Site</th>
      <th>Username</th>
      <th>Password</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody className='bg-purple-100'>
    {passwordArray.map((item,index) => {
    return <tr key={index} className="border-b border-white">
     < td className='text-center py-2 px-4 max-w-[150px] truncate '><a href={item.site}></a>{item.site} 
    <i className="bi bi-clipboard-plus px-1" onClick={()=>copyToClipboard(item.site)}></i>
     </td>
      < td className='text-center py-2 px-4'>{item.username}
      <i className="bi bi-clipboard-plus px-1" onClick={()=>copyToClipboard(item.username)}></i>
      </td>
      < td className='text-center py-2 px-4'>{item.password}
      <i className="bi bi-clipboard-plus px-1"onClick={()=>copyToClipboard(item.password)} ></i>
      </td>
      <td className='text-center py-2 px-4'>
        <span className='px-2'onClick={()=>{deletePassword(item.id)} } > 
          <lord-icon
   src="https://cdn.lordicon.com/xyfswyxf.json"
    trigger="hover"
    colors="primary:#4f1091"
    style={{"width":"25px" ,"height":"25px"}}>
</lord-icon>
        </span>
 <span className=''onClick={()=>{editPassword(item.id)} }> 
  <lord-icon
  src="https://cdn.lordicon.com/vysppwvq.json"
    trigger="hover"
    state="hover-line"
    colors="primary:#4f1091,secondary:#4f1091"
    style={{"width":"25px", "height":"25px"}}>
  
</lord-icon>
        </span>
      </td>
       
        
        
    </tr>
})}
  
  </tbody>
</table>
</div>}
        </div>
      </div>
    </>
  )
}

export default Manager
