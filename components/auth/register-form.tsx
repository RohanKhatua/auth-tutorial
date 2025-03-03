"use client";

import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "@/schemas"
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register";
import { useState, useTransition } from "react";

export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values).then((data) => {
                setError(data.error);
                setSuccess(data.success);
            })
        });
        // calling the server action
    };

    return (
        <CardWrapper
            headerLabel="Create an Account"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="John Doe" disabled={isPending}></Input>
                                    </FormControl>
                                    <FormMessage>
                                        {/* gets from ZOD, can customise */}
                                    </FormMessage>
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} type="email" placeholder="john.doe@example.com" disabled={isPending}></Input>
                                    </FormControl>
                                    <FormMessage>
                                        {/* gets from ZOD, can customise */}
                                    </FormMessage>
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="*****" disabled={isPending}></Input>
                                    </FormControl>
                                    <FormMessage>
                                        {/* gets from ZOD, can customise */}
                                    </FormMessage>
                                </FormItem>
                            )}
                        ></FormField>
                    </div>
                    <FormError message={error}></FormError>
                    <FormSuccess message={success}></FormSuccess>
                    <Button type="submit" className="w-full" disabled={isPending}>
                        Sign Up
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}