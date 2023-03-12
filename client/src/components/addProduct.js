import React, {  useEffect ,useState} from 'react'
import AddItemModal from "./AddItemModal"
export default function (props) {

  const [user, setuser] = useState("")
  const checkUser = async() => {
   const token= localStorage.getItem("token")
   
    const response = await fetch("http://localhost:5000/api/auth/getuser", {
      method: 'POST',
      headers: {
        'Authorization': `${token}`,
        "auth-token": `${token}`,
    },
   
    });
    const json = await response.json()
    setuser(json.role)
    
  }


const onClick=()=>{
//  open modal to add products
}
useEffect(() => {
  checkUser();
}, [])

return (
  <>
    {user != "buyer" ? 
    <div className='d-flex justify-content-center d-block'>
    <button className='btn btn-success ' onClick={onClick}>Add Product</button>

    <div className='d-block'> functionality completed on backend for product creation , frontend integration remaining </div>
    </div>
    : 
    props.showAlert("danger", "you can add products as buyer")}
  </>
)

}