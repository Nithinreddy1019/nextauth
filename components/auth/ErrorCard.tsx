import Header from "@/components/auth/Header";
import BackButton from "@/components/auth/BackButton";

import CardWrapper from "./CardWrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";


const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Oops! SOmething went wrong"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
        >
            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="text-destructive"/>
            </div>
        </CardWrapper>
    )
}


export default ErrorCard;