"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowDownNarrowWide,
  Bell,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Grip,
  LayoutDashboard,
  MessageCircleQuestion,
  MoveLeft,
  Share,
  Star,
  Users,
} from "lucide-react";

import useBoolean from "@/hooks/use-boolean";

import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import ModeSwitcher from "./mode-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import LogoutComponent from "./logout-component";

const Header = () => {
  const isEnable = useBoolean();
  const isChecked = useBoolean();
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        isEnable.onFalse();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEnable]);

  const handleChange = (event) => {
    isChecked.onToggle();
  };

  return (
    <header className="p-2 w-full flex justify-between  border-b-2">
      <ul className="flex items-center gap-2">
        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">
                  <Grip />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>More From Atlassian</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li>
          <Button variant="ghost" className="font-semibold text-base">
            <LayoutDashboard className="animate-bounce" />
            FlowBoard
          </Button>
        </li>
        <li>
          <TooltipProvider>
            <Tooltip>
              <DropdownMenu>
                <TooltipTrigger className="!outline-none" asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      WorkSpaces <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>WorkSpaces</p>
                </TooltipContent>
                <DropdownMenuContent className="w-72 p-4">
                  <DropdownMenuLabel>
                    <span className="text-muted-foreground text-xs">
                      Current Workspace
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuItem className="mb-2">
                    <div className="grid place-items-center rounded-sm w-10 h-10 bg-gradient-to-b from-green-300 to-green-500">
                      <span className="text-black text-xl font-bold">T</span>
                    </div>
                    Trello Workspace
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuLabel>
                    <span className="text-muted-foreground text-xs">
                      Your Workspaces
                    </span>
                  </DropdownMenuLabel>

                  <div className="flex flex-col gap-2">
                    <DropdownMenuItem className="cursor-pointer">
                      <div className="grid place-items-center rounded-sm w-10 h-10 bg-gradient-to-b from-red-300 to-red-500">
                        <span className="text-black text-xl font-bold">E</span>
                      </div>
                      Example Workspace
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <div className="grid place-items-center rounded-sm w-10 h-10 bg-gradient-to-b from-green-300 to-green-500">
                        <span className="text-black text-xl font-bold">T</span>
                      </div>
                      Trello Workspace
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <div className="grid place-items-center rounded-sm w-10 h-10 bg-gradient-to-b from-green-300 to-green-500">
                        <span className="text-black text-xl font-bold">T</span>
                      </div>
                      Trello Workspace
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li>
          <TooltipProvider>
            <Tooltip>
              <DropdownMenu>
                <TooltipTrigger className="!outline-none" asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      Recent <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Recent</p>
                </TooltipContent>
                <DropdownMenuContent className="w-80 p-4">
                  <div className="flex flex-col gap-2 ">
                    <DropdownMenuItem className="flex justify-between items-center cursor-pointer">
                      <div className="flex gap-2 items-center">
                        <div className="rounded-sm w-12 h-9 bg-red-400" />
                        <div>
                          <h2 className="font-bold">Design_Team</h2>
                          <p className="text-muted-foreground">
                            Example Workspace
                          </p>
                        </div>
                      </div>
                      <Star className="w-4 h-4" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex justify-between items-center cursor-pointer">
                      <div className="flex gap-2 items-center">
                        <div className="rounded-sm w-12 h-9 bg-gradient-to-b bg-red-400" />
                        <div>
                          <h2 className="font-bold">Software Team</h2>
                          <p className="text-muted-foreground">
                            Trello Workspace
                          </p>
                        </div>
                      </div>
                      <Star className="w-4 h-4" />
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li>
          <TooltipProvider>
            <Tooltip>
              <DropdownMenu>
                <TooltipTrigger className="!outline-none" asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      Starred <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Starred</p>
                </TooltipContent>
                <DropdownMenuContent className="w-80 p-4">
                  <div className="flex flex-col gap-2 ">
                    <DropdownMenuItem className="flex justify-between items-center cursor-pointer">
                      <div className="flex gap-2 items-center">
                        <div className="rounded-sm w-12 h-9 bg-red-400" />
                        <div>
                          <h2 className="font-bold">Design_Team</h2>
                          <p className="text-muted-foreground">
                            Example Workspace
                          </p>
                        </div>
                      </div>
                      <Star className="w-4 h-4" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex justify-between items-center cursor-pointer">
                      <div className="flex gap-2 items-center">
                        <div className="rounded-sm w-12 h-9 bg-gradient-to-b bg-red-400" />
                        <div>
                          <h2 className="font-bold">Software Team</h2>
                          <p className="text-muted-foreground">
                            Trello Workspace
                          </p>
                        </div>
                      </div>
                      <Star className="w-4 h-4" />
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li>
          <Button className="bg-blue-400 hover:bg-blue-300">Create</Button>
        </li>
      </ul>
      <ul className="flex w-1/2 justify-end gap-2 items-center">
        <li ref={inputRef} className={cn(isEnable.value ? "w-3/4" : "w-auto")}>
          <Input
            value={search}
            onClick={isEnable.onTrue}
            onChange={(e) => setSearch(e.target.value)}
            type="email"
            placeholder="Search"
          />
        </li>

        <ModeSwitcher />
        <li>
          <TooltipProvider>
            <Tooltip>
              <DropdownMenu>
                <TooltipTrigger className="!outline-none" asChild>
                  <DropdownMenuTrigger className="w-10 h-10" asChild>
                    <Button variant="ghost" className="rounded-full">
                      <Bell />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
                <DropdownMenuContent className="w-96 p-4">
                  <DropdownMenuLabel className="mb-3">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold">Notifications</h2>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="unread" className="text-xs">
                          Only show unread
                        </Label>
                        <Switch
                          checked={isChecked.value}
                          onCheckedChange={handleChange}
                          id="unread"
                        />
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div className="h-80 w-full grid place-items-center">
                      <span className="text-xl text-muted-foreground">
                        No unread notifications
                      </span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Tooltip>
          </TooltipProvider>
        </li>

        <li>
          <TooltipProvider>
            <Tooltip>
              <DropdownMenu>
                <TooltipTrigger className="!outline-none" asChild>
                  <DropdownMenuTrigger className="w-10 h-10" asChild>
                    <Button variant="ghost" className="rounded-full">
                      <MessageCircleQuestion />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Information</p>
                </TooltipContent>
                <DropdownMenuContent className="w-72 p-4" />
              </DropdownMenu>
            </Tooltip>
          </TooltipProvider>
        </li>

        <li>
          <TooltipProvider>
            <Tooltip>
              <DropdownMenu>
                <TooltipTrigger className="!outline-none" asChild>
                  <DropdownMenuTrigger className="w-10 h-10 " asChild>
                    <Button variant="ghost" className="rounded-full ">
                      <Avatar>
                        <AvatarImage src="https://gitdhub.com/shadcn.png" />
                        <AvatarFallback className="bg-cyan-950	">
                          A
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Account</p>
                </TooltipContent>
                <DropdownMenuContent className="w-80 p-4 text-muted-foreground">
                  <DropdownMenuLabel className="mb-3">
                    <div className="flex flex-col gap-4">
                      <h4 className="uppercase text-xs ">Account</h4>
                      <div className="flex gap-2">
                        <Avatar className="rounded-full ">
                          <AvatarImage src="https://gitdhub.com/shadcn.png" />
                          <AvatarFallback className="bg-cyan-950	">
                            A
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4>amithsulakhe2468</h4>
                          <p>amithsulakhe2468@gmail.com</p>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuItem className="cursor-pointer">
                    <span className="text-sm">Switch accounts</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex cursor-pointer justify-between">
                    <span className="text-sm">Manage accounts</span>
                    <ExternalLink />
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-4" />

                  <DropdownMenuLabel>
                    <h4 className="uppercase text-xs ">FlowBoard</h4>
                  </DropdownMenuLabel>

                  <DropdownMenuItem className="cursor-pointer">
                    <span className="text-sm">Profile and visibility</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <span className="text-sm">Activity</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <span className="text-sm">Cards</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <span className="text-sm">Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex cursor-pointer justify-between">
                    <span className="text-sm">Theme</span>
                    <ChevronRight />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-4" />
                  <DropdownMenuItem className="flex cursor-pointer gap-2">
                    <Users />
                    <span className="text-sm">Create Workspace</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-4" />
                  <DropdownMenuItem className="cursor-pointer">
                    <span className="text-sm">Help</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <span className="text-sm">Shortcuts</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-4" />
                  <LogoutComponent />
                </DropdownMenuContent>
              </DropdownMenu>
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>
    </header>
  );
};

export default Header;
