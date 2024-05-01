import { db } from "@/lib/db";


export const getVerificationTokeByEmail = async (
    email: string
) => {

    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: { email }
        });

        return verificationToken;

    } catch (error) {
        return null;
    }
};



export const getVerificationTokeByToken = async (
    token: string
) => {

    try {
        const verificationToken = await db.verificationToken.findUnique({
            where: {token}
        });

        return verificationToken;
    } catch (error) {
        return null;
    };
};