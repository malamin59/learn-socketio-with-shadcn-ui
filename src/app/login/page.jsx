"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import From from "./Components/From";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export default function LoginCard() {
  const pathname = usePathname();
  useEffect(() => {
    // console.log("Current Pathname is", pathname);
  }, [pathname]);
  return (
    <div className="flex items-center justify-center min-h-[100dvh]  p-2 
    
    ">
      <Card className="w-[350px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <From />
        </CardContent>
      </Card>
    </div>
  );
}
