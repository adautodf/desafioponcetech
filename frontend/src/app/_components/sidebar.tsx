"use client"

import { Button, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Para Next.js 13+ com App Directory
import { CheckCircle, CircleDotDashedIcon, CogIcon, Home } from 'lucide-react';

function Sidebar() {
  const pathname = usePathname(); // Pega a rota atual
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Geral", href: "/", icon: <Home /> },
    { name: "Concluídas", href: "/concluidas", icon: <CheckCircle /> },
    { name: "Em Progresso", href: "/emProgresso", icon: <CircleDotDashedIcon /> },
    { name: "Pendentes", href: "/pendentes", icon: <CogIcon /> },
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <div className='w-14 h-14'>
            <Image
              width={100}
              alt="Logo PonceTech"
              src="https://utfs.io/f/538b1ab8-d559-4933-8d2e-e09bab567430-gzyj6y.png"
            />
          </div>
          <p className="font-bold text-inherit">PonceTech</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <div className='w-14 h-14'>
            <Image
              width={100}
              alt="Logo PonceTech"
              src="https://utfs.io/f/538b1ab8-d559-4933-8d2e-e09bab567430-gzyj6y.png"
            />
          </div>
          <p className="font-bold text-inherit">PonceTech</p>
        </NavbarBrand>

        <div className='ml-10 flex flex-row gap-5 '>
          {menuItems.map((item) => (
            <NavbarItem key={item.href} isActive={pathname === item.href}>
              <Link href={item.href}>
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </div>

      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full"
              href={item.href}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Sidebar;
