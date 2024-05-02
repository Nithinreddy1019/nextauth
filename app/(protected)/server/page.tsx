import { auth } from "@/auth";
import { UserInfo } from "@/components/user-info";
import { curretnUser } from "@/lib/auth";

const ServerPage = async () => {

    let user = await curretnUser();
    

    return ( 
        <UserInfo 
            user={user}
            label="🖥️Server component"
        />
    );
}
 
export default ServerPage;