import {FieldValues} from "react-hook-form";
import {LoginForm} from "./LoginForm";
import {IdentityService} from "../../../../services/IdentityService";
import {ILogin} from "../../../../dto/identity/ILogin";
import {useContext, useState} from "react";
import {JwtContext} from "../../../Root";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const {jwtResponseCtx, setJwtResponseCtx} = useContext(JwtContext);
  const navigate = useNavigate();
  const identityService = new IdentityService();
  const [error, setError] = useState<string | null>(null)
  const handleSubmit = async (data: FieldValues) => {
    console.log(data)
    identityService.login(data as ILogin).then(response =>{
      if(response !== undefined && response){
        setJwtResponseCtx!(response);
        navigate("../..")
      }
      console.log("Success")
    }).catch(e => {
      if(e.message.startsWith("4")){
        setError("Incorrect username or password")
      }else{
        setError("Service is currently unavailable")
      }

    })
  }
  return <LoginForm error={error} onSubmit={handleSubmit}/>
}

export default Login;