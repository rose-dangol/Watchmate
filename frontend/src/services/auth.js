import { API_BASE_URL } from "../commons/api"
const base_url = " http://localhost:8000/account/"

export const registerUser= async(registerFormData)=>{
    try{
        const response = await fetch(base_url+"register/",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerFormData),
        });
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const newUser = await response.json()
        return newUser;
    }catch(error){
        console.log("Registration faild",error.message)
    }
};


export const loginUser=async(loginFormData)=>{
    try{
        const response = await fetch (base_url+"login/",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginFormData),
        });
        if(!response.ok){
            throw new Error(`Repsponse status: ${response.status}`);
        } 
    }catch(error){
        console.log(error)
    }
}