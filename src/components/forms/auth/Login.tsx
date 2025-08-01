"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLoginUserMutation } from "@/lib/redux/features/auth/authApiSlice";
import { setAuth } from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks/typedHooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginTerramoAdminSchema, TRLoginTerramoAdminSchema } from "@/lib/validationSchemas/LoginSchema";
import { toast } from "react-toastify";
import  extractErrorMessage from "@/utils/extractErrorMessage";
import Spinner from "@/components/shared/Spinner";

export default function Login() {

    
    const [loginTerramoAdmin, { isLoading }] = useLoginUserMutation();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TRLoginTerramoAdminSchema>({
        resolver: zodResolver(loginTerramoAdminSchema),
        mode: "all",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof loginTerramoAdminSchema>) => {
        try {
            console.log()
            await loginTerramoAdmin(values).unwrap();
            dispatch(setAuth());
            toast.success("Login Successful");
            router.push("/clients");
            reset();
        } catch (error) {
            const errorMessage = extractErrorMessage(error);
            console.log('error->', error)
            toast.error(errorMessage || "An error occurred");
        }
    };
    
    // ---------- end


  return (
  <Container maxWidth="sm">
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Admin-Anmelden
      </Typography>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={{ mb: 2 }}>
          <TextField
            type="email"
            label="Benutzername"
            variant="outlined"
            fullWidth
            required
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            type="password"
            label="Passwort"
            variant="outlined"
            fullWidth
            required
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Box>
        {/* <Button
          type="submit"
          style={{ background: "#026770", color: "#FFFF" }}
          fullWidth
        >
          Login
        </Button> */}
        <Button
            type="submit"
            style={{ background: "#026770", color: "#FFFF" }}
            className="h4-semibold w-full"
            disabled={isLoading}
        >
            {isLoading ? `Authenticating...` : `Login`}
        </Button>
      </form>
    </Box>
  </Container>
);

};


