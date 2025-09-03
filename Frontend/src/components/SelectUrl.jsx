"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectUrl() {
  return (
    <Select>
      <SelectTrigger
        className="w-48 justify-between font-normal bg-[#303130] 
                   !border-none !ring-0 !outline-none shadow-none 
                   hover:bg-[#303130] text-white data-[placeholder]:text-white placeholder:text-white"
      >
        {/* ✅ Force placeholder to white */}
        <SelectValue
          placeholder="Select a URL"
          className="text-white placeholder:text-white"
        />
      </SelectTrigger>
      <SelectContent className="bg-[#1e1e1e] border border-gray-700 text-gray-200 rounded-xl">
        <SelectGroup>
          <SelectLabel className="text-gray-400">Your URLs</SelectLabel>
          <SelectItem value="001I">001I</SelectItem>
          <SelectItem value="001J">001J</SelectItem>
          <SelectItem value="001K">001K</SelectItem>
          <SelectItem value="001L">001L</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
