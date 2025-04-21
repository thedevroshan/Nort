"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavigationRoute {
  name: string;
  icon: string;
  route: string;
}

interface NavigationActions {
  name: string;
  icon: string;
  action: () => void;
}

const Navbar = () => {
  const [currentPath, setCurrentPath] = useState<string>(usePathname());

  const navigationRoutes: NavigationRoute[] = [
    {
      name: "Home",
      icon: "/home-icon.png",
      route: "/",
    },
    {
      name: "Nort AI",
      icon: "/nort-ai-icon.png",
      route: "/nort-ai",
    },
    {
      name: "Settings",
      icon: "/settings-icon.png",
      route: "/settings",
    },
    {
      name: "Templates",
      icon: "/templates-icon.png",
      route: "/templates",
    },
    {
      name: "Trash",
      icon: "/trash-icon.png",
      route: "/trash",
    },
  ];

  const navigationActions: NavigationActions[] = [
    {
      name: "Search",
      icon: "/search-icon.png",
      action: () => alert("Search"),
    },
    {
      name: "Notifications",
      icon: "/notification-icon.png",
      action: () => alert("Notifications"),
    },
    {
      name: "Invite Members",
      icon: "/invite-icon.png",
      action: () => alert("Invite Members"),
    },
  ];

  const navigationActionsPages: NavigationActions[] = [
    {
      name: "Private",
      icon: "/arrow-icon.png",
      action: () => alert("Private"),
    },
    {
      name: "Teamspaces",
      icon: "/arrow-icon.png",
      action: () => alert("Teamspaces"),
    },
    {
      name: "Your Templates",
      icon: "/arrow-icon.png",
      action: () => alert("Templates"),
    },
  ];

  return (
    <nav className="bg-background border-r-2 border-border w-[20vw] h-[100vh] flex flex-col py-2 px-2 select-none gap-2">
      <span className="text-3xl font-bold text-white">NORT</span>

      {/* Account */}
      <section className="flex gap-1 items-center justify-between px-2 py-1 rounded-lg hover:bg-foreground cursor-pointer transition-all duration-500 ease-in-out">
        <Link href={"/settings/account"}>
          {/* User Details */}
          <div className="flex gap-2 items-center justify-center">
            <Image
              src="/user-icon.png"
              alt="user"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col justify-center">
              <span className="text-white font-semibold">Roshan Kewat</span>
              <input className="text-sm text-text-primary select-none border-none outline-none cursor-pointer" value={'roshankewat9090@gmail.com'} readOnly/>
            </div>
          </div>
        </Link>

        {/* Actions */}
        <Image
          src={"/create-icon.png"}
          alt="create"
          width={20}
          height={20}
          className="rounded-full cursor-pointer active:scale-90 transition-all duration-500 ease-in-out"
          onClick={() => alert("Create new project")}
        />
      </section>

      {/* Navigation */}
      <section className="flex flex-col gap-2 mt-4">
        {navigationRoutes.map((route, index) => {
          if (index <= 1)
            return (
              <Link
                href={route.route}
                key={index}
                className={`flex gap-2 items-center justify-start px-2 py-1 rounded-lg ${
                  currentPath == route.route
                    ? "bg-foreground"
                    : "hover:bg-foreground"
                } cursor-pointer transition-all duration-500 ease-in-out`}
              >
                <Image
                  src={route.icon}
                  alt={route.name}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <span className="text-text-primary font-semibold">
                  {route.name}
                </span>
              </Link>
            );
        })}

        {/* Actions Buttons */}
        {navigationActions.map((action, index) => (
          <div
            key={index}
            className={`flex gap-2 items-center justify-start px-2 py-1 rounded-lg hover:bg-foreground cursor-pointer transition-all duration-500 ease-in-out`}
            onClick={action.action}
          >
            <Image
              src={action.icon}
              alt={action.name}
              width={20}
              height={20}
              className="rounded-full"
            />
            <button className="text-text-primary font-semibold">
              {action.name}
            </button>
          </div>
        ))}

        {/* Pages sections */}
        <section className="flex flex-col gap-2 mt-1 items-start justify-center w-full mb-18">
          {navigationActionsPages.map((action, index) => (
            <div
              className="flex flex-col gap-2 items-center justify-start w-full"
              key={index}
            >
              {/* Header */}
              <div className="w-full flex gap-2 items-center justify-start px-2 py-1 rounded-lg hover:bg-foreground cursor-pointer transition-all duration-500 ease-in-out">
                <Image
                  src={action.icon}
                  alt={"arrow"}
                  width={15}
                  height={15}
                  onClick={action.action}
                />
                <span className="text-text-primary text-sm font-medium">
                  {action.name}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* Bottom Navigation */}
        <section className="flex flex-col gap-2 items-start justify-center w-full">
          {navigationRoutes.map((route, index) => {
            if (index > 1)
              return (
                <Link
                  href={route.route}
                  key={index}
                  className={`flex gap-2 items-center justify-start px-2 py-1 rounded-lg ${
                    currentPath == route.route
                      ? "bg-foreground"
                      : "hover:bg-foreground"
                  } cursor-pointer transition-all duration-500 ease-in-out w-full`}
                >
                  <Image
                    src={route.icon}
                    alt={route.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span className="text-text-primary font-semibold">
                    {route.name}
                  </span>
                </Link>
              );
          })}
        </section>
      </section>
    </nav>
  );
};

export default Navbar;
