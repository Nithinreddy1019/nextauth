"use client"
import React, { useState } from 'react'
import CardWrapper from './CardWrapper'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useTransition } from 'react'

import { RegisterSchema } from '@/schemas'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import FormError from '../FormError'
import FormSuccess from '../FormSuccess'
import { register } from '@/actions/register'


const RegisterForm = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] =  useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {

        setError("")
        setSuccess("")

        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
        });
        
    }

  return (
    <CardWrapper
        headerLabel='Create an account'
        backButtonLabel="Already have an account?"
        backButtonHref='/auth/login'
        showSocial
    >
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
            >
                <div className='space-y-4'>
                    <FormField 
                        control={form.control}
                        name='email'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel >Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder='John.doe@gmail.com'
                                        type='email'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField 
                        control={form.control}
                        name='password'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel >Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder='123456'
                                        type='password'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField 
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel >Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder='John Doe'
                                        type='text'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormError message={error}/>
                <FormSuccess message={success}/>

                <Button
                    disabled={isPending}
                    type='submit'
                    className='w-full'
                >
                    Register
                </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}

export default RegisterForm
