"use client";

import * as React from "react";
import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export interface Option {
  label: string;
  value: string;
}

export interface ComboboxProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export const Combobox = forwardRef<HTMLButtonElement, ComboboxProps>(
  ({ options, value, onChange, placeholder = "Select…" }, ref) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {options.find((o) => o.value === value)?.label ?? placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Type to search…" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={(value) => onChange?.(value)}
                  >
                    {opt.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

Combobox.displayName = "Combobox";
