import { Lock, LockIcon, LockKeyhole } from "lucide-react";
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UserBoardViewPage = () => {
  console.log("DF");

  return (
    <section className="p-4">
      <div className="max-w-screen-md mx-auto">
        <div className="flex gap-3">
          <div className="grid place-items-center rounded-sm w-14 h-14 bg-gradient-to-b from-green-300 to-green-500">
            <span className="text-black text-4xl font-bold">T</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold">Trello Workspace</h3>
            <div className="flex gap-2 items-center">
              <p className="text-xs">Premium</p>
              <p className="text-xs flex gap-1 items-center">
                <LockKeyhole className="w-3 h-3" />
                private
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-8" />

      <div className="flex flex-col gap-8">
        <h3 className="text-xl font-semibold">Boards</h3>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-2">
            <h4 className="text-xs text-muted-foreground mb-2 font-bold">
              Sort by
            </h4>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Most recently active" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2">
            <h4 className="text-xs mb-2 text-muted-foreground font-bold">
              Filter by
            </h4>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose a collection" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2" />
          <div className="col-span-2" />
          <div className="col-span-2" />
          <div className="col-span-2">
            <h4 className="text-xs mb-2 text-muted-foreground font-bold">
              Search
            </h4>
            <Input type="email" placeholder="Search boards" />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3 ">
            <Button variant="secondary" className="w-full p-12 rounded-lg">
              Create new board
            </Button>
          </div>
          <div className="col-span-3 p-12 rounded-lg bg-gradient-to-br from-pink-200 to-pink-400"></div>
          <div className="col-span-3 p-12 rounded-lg bg-gradient-to-br from-blue-200 to-blue-400"></div>
        </div>
      </div>
    </section>
  );
};

export default UserBoardViewPage;
