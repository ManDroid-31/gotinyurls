// src/components/UrlTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Copy, BarChart3, ExternalLink } from "lucide-react";

const data = [
  {
    original: "https://www.example.com/very-long-url-that-needs-shortening",
    short: "https://shortify.co/abc123",
    clicks: "1,247",
    created: "Jan 15, 2024",
    custom: false,
  },
  {
    original: "https://github.com/user/repository",
    short: "https://shortify.co/github",
    clicks: "856",
    created: "Jan 12, 2024",
    custom: true,
  },
  {
    original: "https://docs.example.com/api/documentation",
    short: "https://shortify.co/docs-api",
    clicks: "432",
    created: "Jan 10, 2024",
    custom: true,
  },
];

export default function UrlTable() {
  return (
    <div className="pt-0">
      <div className="rounded-md border-1 border-[#3a3737] overflow-hidden">
        <div className="relative w-full overflow-auto">
          <Table className="w-full caption-bottom text-sm min-w-[1200px]">
            <TableHeader className="">
              <TableRow className="hover:bg-[#181818] bg-[#181818] border-b-1 border-[#3a3737]">
                <TableHead className="h-10 hover:bg-[#2c2c2c] p-4 text-left font-lg text-[#a1a1a1]">
                  Original URL
                </TableHead>
                <TableHead className="h-10 p-4 hover:bg-[#2c2c2c] text-left font-lg text-[#a1a1a1]">
                  Short URL
                </TableHead>
                <TableHead className="h-10 p-4 hover:bg-[#2c2c2c] text-center font-lg text-[#a1a1a1]">
                  Clicks
                </TableHead>
                <TableHead className="h-10 p-4 hover:bg-[#2c2c2c] text-left font-lg text-[#a1a1a1]">
                  Created
                </TableHead>
                <TableHead className="h-10 p-4 hover:bg-[#2c2c2c] text-right font-lg text-[#a1a1a1]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="">
              {data.map((item, idx) => (
                <TableRow
                  key={idx}
                  className="hover:bg-transparent border-b-1 border-[#3a3737]"
                >
                  {/* Original URL */}
                  <TableCell className="p-4 max-w-xs">
                    <div className="flex items-center space-x-2">
                      <div className="truncate">
                        <p className="font-medium truncate">{item.original}</p>
                        {item.custom && (
                          <div className="inline-flex items-center rounded-md px-3 py-1 text-xs font-semibold mt-2 bg-[#262626] text-gray-300">
                            Custom
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* Short URL */}
                  <TableCell className="p-2">
                    <div className="flex items-center space-x-2 bg-">
                      <code className="text-sm bg-[#262626] px-2  py-1 rounded-md">
                        {item.short}
                      </code>
                    </div>
                  </TableCell>

                  {/* Clicks */}
                  <TableCell className="p-2 text-center">
                    <div className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold">
                      <code className="bg-[#262626] px-2 py-1 rounded-md">
                        {item.clicks}
                      </code>
                    </div>
                  </TableCell>

                  {/* Created */}
                  <TableCell className="p-2">
                    <time className="text-sm text-[#a1a1a1]">
                      {item.created}
                    </time>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="p-2 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <button className="inline-flex items-center justify-center h-8 w-8 rounded-md text-xs ">
                        <Copy className="h-4 w-4" />
                      </button>
                      <button className="inline-flex items-center justify-center h-8 w-8 rounded-md text-xs ">
                        <BarChart3 className="h-4 w-4" />
                      </button>
                      <button className="inline-flex items-center justify-center h-8 w-8 rounded-md text-xs ">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
