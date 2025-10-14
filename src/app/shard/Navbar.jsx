"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, X, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [
    { name: "Home", href: "/" },
    { name: "Chat", href: "/chat" },
  ];

  const hideNavbar = pathname === "/login" || pathname === "/register";

  return (
    <>
      {!hideNavbar && (
        <header className="w-full bg-white dark:bg-gray-900 shadow-md fixed top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white"
            >
              <MessageCircle className="w-6 h-6 text-blue-500" />
              MyApp
            </Link>

            {/* Desktop Links */}
            <nav className="hidden md:flex space-x-4 items-center">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md ${
                    pathname === link.href
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* ✅ Show Login or Logout */}
              {session ? (
                <Button
                  onClick={() => signOut()}
                  className="bg-red-500 hover:bg-red-600 text-white ml-2"
                >
                  Logout
                </Button>
              ) : (
                <Link
                  href="/login"
                  className="px-3 py-2 rounded-md bg-blue-500 text-white ml-2"
                >
                  Login
                </Link>
              )}
            </nav>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Menu size={20} />
                  </button>
                </SheetTrigger>

                <SheetContent side="right" className="w-64">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>

                  <nav className="flex flex-col mt-4 space-y-2">
                    {links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`px-3 py-2 rounded-md ${
                          pathname === link.href
                            ? "bg-blue-500 text-white"
                            : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}

                    {/* ✅ Mobile Logout/Login */}
                    {session ? (
                      <Button
                        onClick={() => {
                          signOut();
                          setOpen(false);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white w-full"
                      >
                        Logout
                      </Button>
                    ) : (
                      <Link
                        href="/login"
                        onClick={() => setOpen(false)}
                        className="px-3 py-2 rounded-md bg-blue-500 text-white text-center"
                      >
                        Login
                      </Link>
                    )}
                  </nav>

                  <SheetClose asChild>
                    <button className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                      <X size={20} />
                    </button>
                  </SheetClose>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
