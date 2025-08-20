
import React from "react";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 px-4 py-1 text-sm font-medium rounded">Status: Completed</Badge>;
    case "in-progress":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 px-4 py-1 text-sm font-medium rounded">Status: In Progress</Badge>;
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 px-4 py-1 text-sm font-medium rounded">Status: Pending</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 px-4 py-1 text-sm font-medium rounded">Status: {status}</Badge>;
  }
};
