"use client"

import CardWrapper from "@/components/auth/CardWrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if(!token) {
            setError("Missing token");
            return;
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success),
                setError(data.error);
            })
            .catch(() => {
                setError("Something went wrong!");
            })
    }, [token])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center justify-center w-full">
                
                {!success && !error && (
                    <BeatLoader />
                )}
                <FormError message={error}/>
                <FormSuccess message={success}/>
            </div>
        </CardWrapper>
    )
}