import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState(JSON.parse(localStorage.getItem("passwords")) || [])
  
 
  
const showPassword = () => {
  passwordRef.current.type = passwordRef.current.type === "password" ? "text" : "password"
  setform({ ...form })

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

  }
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
        <div className=" text-purple-800 flex flex-col p-4 gap-5">
          <input value={form.site} onChange={handleChange} className="rounded-full border border-purple-600 w-full p-2 py-1" type="text" placeholder="Enter website URL" name="site"></input>
          <div className="flex w-full gap-3 justify-center">
            <input value={form.username} onChange={handleChange} className="rounded-full border border-purple-600 w-full p-2 py-1" type="text" placeholder="Enter Username" name="username"></input>
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} className="rounded-full border border-purple-600 w-full p-2 py-1" type="password" placeholder='Enter Password' name="password"></input>
              <span className='absolute right-1  top-1 cursor-pointer' onClick={showPassword}>
                <i className={passwordRef.current?.type === "password" ? "🙈" : "👁️" }></i>
              </span>
            </div>
          </div>
          <div className='flex justify-center w-full '>
            <button onClick={savePassword} className="flex justify-center items-center gap-2 bg-purple-600 rounded-full border border-purple-800 px-2 py-1 w-fit text-purple-100 hover:font-bold text-sm"> Add Password</button></div>
        </div>
        <div className='passwords'>
          <h2 className='font-bold text-2xl text-purple-600 p-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div> No Passwords to Show</div>}
         {passwordArray.length != 0 && <table className="table-auto w-full rounded-xl">
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
    return <tr key={index}>
     < td className='text-center py-2 border border-white w-32'><a href={item.site}></a>{item.site} 
    <i className="bi bi-clipboard-plus px-1" onClick={()=>copyToClipboard(item.site)}></i>
     </td>
      < td className='text-center py-2 border border-white w-32'>{item.username}
      <i className="bi bi-clipboard-plus px-1" onClick={()=>copyToClipboard(item.username)}></i>
      </td>
      < td className='text-center py-2 border border-white w-32'>{item.password}
      <i className="bi bi-clipboard-plus px-1"onClick={()=>copyToClipboard(item.password)} ></i>
      </td>
      <td className='text-center py-2 border border-white w-32'>
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
</table>}
        </div>
      </div>
    </>
  )
}

export default Manager
