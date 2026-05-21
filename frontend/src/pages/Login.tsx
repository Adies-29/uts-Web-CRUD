
// import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "../components/ui/InputText";
import { InputPassword } from "../components/ui/InputPassword";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";


type FormData = {
    nim: string;
    password: string;
}

const schema = z.object({
    nim: z.string().min(1, "Nim harus diisi"),
    password: z.string().min(8, "Password harus diisi"),
})

export default function Login() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });



    const onSubmit = (data: FormData) => {
        console.log(data);
        if (data.nim == "24090071" && data.password == "24090071") {
            alert("Login berhasil");

            login(data.nim)

            navigate("/dashboard");
        } else {
            alert("Nim & Password salah");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputText
                    label="Nim"
                    name="nim"
                    register={register}
                    error={errors.nim?.message}
                />
                <InputPassword
                    label="Password"
                    name="password"
                    register={register}
                    error={errors.password?.message}
                />
                <div>
                    <Button type="submit" label="Login" />
                </div>
            </form>
        </div>
    );
};

