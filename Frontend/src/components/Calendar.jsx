"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Calendar22(props) {
  const { setExpiryDate, expiryDate } = props;
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal bg-[#303130] !border-none !ring-0 !outline-none shadow-none hover:bg-[#303130] text-white placeholder:text-white hover:text-white"
          >
            {expiryDate ? expiryDate.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={expiryDate}
            captionLayout="dropdown"
            onSelect={(d) => {
              setExpiryDate(d);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
