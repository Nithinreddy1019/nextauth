"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFileds = RegisterSchema.safeParse(values);

    if(!validatedFileds.success) {
        return {error: "Invalid fields"}
    }

    const { email, password, name } = validatedFileds.data
    const hashedPasswrd = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);
    if(existingUser) {
        return {error: "Email already in use"}
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPasswrd
        }
    });


    const verificationToken = await generateVerificationToken(email)

    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return {success: "conformation email sent"}

    return {success: "user created!"}
}