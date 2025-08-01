import { Metadata } from "next";
import Image from "next/image";
import terramoLogo from "@/../public/assets/images/terramo.svg";
import Navbar from "@/components/shared/navbar/Navbar";
import Login from "@/components/forms/auth/Login";
import Header from "@/components/shared/header/header";
import Link from "next/link";
import { Typography } from "@mui/material";
export const metadata:Metadata = {
  title:"Home | Terramo Tool",
  description: "Terramo tool Survey"
}

export default function Home() {
  return (
    <>
      {/* <Navbar/> */}
      <Header/>
      <div className="mt-32 flex w-full flex-col items-center justify-center rounded-lg bg-white">
    
     <Typography variant="h1"  mb={2} style={{fontSize: '3rem',fontWeight: '300',
    lineHeight: '1.167',
    marginBottom: '16px'}}>
        Welcome to Terramo Tool
      </Typography>
      <Link href="/login" >Login</Link>
       {/* <Login/> */}
      </div>
    </>
  );
}
