"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import {useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../(dashboard)/list/loading";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isCheckingRole, setIsCheckingRole] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && user && !isCheckingRole) {
      setIsCheckingRole(true);
      
      // Wait for metadata to be available
      const checkRole = async () => {
        try {
          // Force refresh the user object to get latest metadata
          await user.reload();
          
          const role = user.publicMetadata.role;
          console.log("User role:", role);
          
          if (role) {
            router.push(`/${role}`);
          } else {
            console.warn("No role assigned to user");
            // Handle case where role isn't set
            router.push("/unauthorized");
          }
        } catch (err) {
          console.error("Error checking role:", err);
        } finally {
          setIsCheckingRole(false);
        }
      };

      checkRole();
    }
  }, [isSignedIn, user, router, isCheckingRole]);


  if (!isLoaded) {
    return <Loading/> 
  }


  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
        >
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Image src="/logo.png" alt="" width={24} height={24} />
            Financial Reporting System
          </h1>
          <h2 className="text-gray-400">Sign in to your account</h2>
          <Clerk.GlobalError className="text-sm text-red-400" />
          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          <SignIn.Action
            submit
            className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]"
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default LoginPage;
