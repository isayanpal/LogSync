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

export default function Logs() {
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
          <TableRow>
            <TableCell className="font-semibold">
              {new Date().toDateString()}
            </TableCell>
            <TableCell className="font-semibold">10</TableCell>
            <TableCell className="font-semibold">
              This is a placeholder
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
