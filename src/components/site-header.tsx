import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import logo from "@/assets/logo.jpg";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { to: "/features", label: "Services" },
  { to: "/pricing", label: "Packages" },
  { to: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-card ring-1 ring-warm shadow-soft">
            <img src={logo} alt="Amani Nzuri logo" className="h-full w-full
