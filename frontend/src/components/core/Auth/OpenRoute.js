import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function OpenRoute({children}){
const{token}=useSelector((state)=>state.auth)

if(token===null){
    return children;
}
else{
    return <Navigate to="/dashboard/my-profile"/>
}
}
export default OpenRoute