"use client";

import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLogStore } from "@/store";
import { cn } from "@/lib/utils";

export default function Logs() {
  // list from supabase

  const logs = useLogStore((state) => state.logs);

  return (
    <div>
      <Table>
        <TableCaption className="font-semibold">List of logs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w=1/3 font-semibold">Date</TableHead>
            <TableHead className="w=1/3 font-semibold">Hour</TableHead>
            <TableHead className="w=1/3 font-semibold">Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(logs).map((key) => {
            const log = logs[key];

            const date = log.date as Date;
            return (
              <TableRow
                key={key}
                className={cn(log.hour <= 5 ? "bg-red-200" : "")}
              >
                <TableCell className="font-semibold">
                  {date.toDateString()}
                </TableCell>
                <TableCell className="font-semibold">{log.hour}</TableCell>
                <TableCell className="font-semibold">{log.note}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
