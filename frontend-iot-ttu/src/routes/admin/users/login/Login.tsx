import {FieldValues} from "react-hook-form";
import {LoginForm} from "./LoginForm";
import {IdentityService} from "../../../../services/IdentityService";
import {ILogin} from "../../../../dto/identity/ILogin";
import {useState} from "react";

const Login = () => {

  const identityService = new IdentityService();
  const [error, setError] = useState<string>()
  const handleSubmit = async (data: FieldValues) => {
    console.log(data)
    identityService.login(data as ILogin).then(response =>{
      console.log("Success")
    }).catch(e => {
      setError(e.message)
    })
  }
  return <LoginForm onSubmit={handleSubmit}/>
}

export default Login;