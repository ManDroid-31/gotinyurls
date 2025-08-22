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
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function Url() {
  const data = useSelector((state) => state.urls.urls);

  const copyHandler = (item) => {
    navigator.clipboard
      .writeText(`${import.meta.env.VITE_BACKEND_URL}/${item.shortUrl}`)
      .then(() => {
        toast.success("Shortened URL copied to clipboard!");
      });
  };

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
                <TableHead className="h-10 p-4 hover:bg-[#2c2c2c] text-right font-lg text-[#a1a1a1]">
                  Created
                </TableHead>
                <TableHead className="h-10 p-4 hover:bg-[#2c2c2c] text-right font-lg text-[#a1a1a1]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="">
              {data.map(
                (item, idx) => (
                  console.log("Rendering item:", item),
                  (
                    <TableRow
                      key={idx}
                      className="hover:bg-transparent border-b-1 border-[#3a3737]"
                    >
                      {/* Original URL */}
                      <TableCell className="p-4 max-w-xs">
                        <div className="flex items-center space-x-2">
                          <div className="truncate">
                            <p className="font-medium truncate">
                              {item.originalUrl}
                            </p>
                            {item.alias && (
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
                            {item.shortUrl}
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
                      <TableCell className="p-2 text-right">
                        <time className="text-sm text-[#a1a1a1]">
                          {item.createdAt.split("T")[0]}
                        </time>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="p-2 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <button
                            className="inline-flex hover:bg-gray-700 hover:cursor-pointer items-center justify-center h-8 w-8 rounded-md text-xs"
                            onClick={() => copyHandler(item)}
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          <button className="inline-flex hover:bg-gray-700 hover:cursor-pointer items-center justify-center h-8 w-8 rounded-md text-xs ">
                            <BarChart3 className="h-4 w-4" />
                          </button>
                          <button
                            className="inline-flex items-center hover:bg-gray-700 hover:cursor-pointer justify-center h-8 w-8 rounded-md text-xs "
                            onClick={() =>
                              window.open(
                                `${import.meta.env.VITE_BACKEND_URL}/${
                                  item.shortUrl
                                }`,
                                "_blank"
                              )
                            }
                          >
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                )
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
