import { useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import useBoolean from "@/hooks/use-boolean";

import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const ModeSwitcher = () => {
  const isMounted = useBoolean();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    isMounted.onTrue();
  }, [isMounted]);

  if (!isMounted.value) return null;
  const isDark = theme === "dark";

  return (
    <li>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="!outline-none w-10 h-10" asChild>
            <Button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`flex rounded-full items-center cursor-pointer transform transition-transform duration-500 ${
                isDark ? "rotate-180" : "rotate-0"
              }`}
              variant="ghost"
            >
              {isDark ? (
                <Sun className="h-6 w-6 text-yellow-500" />
              ) : (
                <Moon className="h-6 w-6 text-blue-500" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isDark ? "Light" : "Dark"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </li>
  );
};

export default ModeSwitcher;
