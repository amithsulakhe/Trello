"use client";

import { useTheme } from "next-themes";
import { HashLoader } from "react-spinners";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const UniversalLoader = () => {
  const { theme } = useTheme();

  return (
    <div>
      <Dialog open>
        <DialogTitle />
        <DialogContent className="h-80 [&>button]:hidden bg-transparent border-none outline-none  grid place-items-center">
          <DialogHeader>
            <DialogDescription>
              <HashLoader
                color={theme === "dark" ? "#fff" : "black"}
                size={80}
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UniversalLoader;
