import axios from "axios"
import { BASE_URL } from "../../utils/constant"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useEffect} from "react"
import { addConnection } from "../../utils/Store/connectionSlice"
import UserProfileCard from "../UserProfileCard"
import { BsChatSquareTextFill } from "react-icons/bs";
import { Link } from "react-router-dom"

const Connections = () => {
    const connections = useSelector((store)=>store.connection)
    
    const dispatch = useDispatch()
    

    const userConnections = async()=>{
        // if (connections?.length) return; // Ensure not to fetch if connections are already loaded
        try{
            const response = await axios.get(BASE_URL + "/user/connections",{withCredentials : true})
            console.log(response?.data);
            if (connections?.length) toast.success(response?.data?.message);
            dispatch(addConnection(response?.data?.data))
        }catch(e){
            toast.error(e?.response?.data);
        }
    }

    useEffect(() => {
        userConnections();
    }, []); 

if(!connections) return

if(connections?.length === 0) return <h1 className="text-center text-2xl font-bold my-4">No Connections</h1>

return ( 
        <> 
            <h1 className="text-center text-2xl font-bold my-4">Connections</h1>
            <div className="w-full grid grid-cols-4 grid-rows-none gap-4 scroll-auto">
            {connections?.map((eachConn) => {
                const {_id, firstName, lastName, photoUrl, age, gender, skills, about } = eachConn || {};
                return (
                    <div key={_id} className="relative">
                        <Link to={`/main/chat/${_id}`}  className="absolute top-20 right-5"><BsChatSquareTextFill size={30}/></Link>
                        <UserProfileCard userData={{firstName,lastName,photoUrl,age,gender,skills,about}}/>
                    </div>
                );
            })}
            </div>
        </>
)
}

export default Connections
