import { Row } from "@tanstack/react-table";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Eye, MoreHorizontal, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router";
import { ZodSchema } from "zod";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  schema: ZodSchema;
  viewDetails?: string | undefined | null;
}

export function DataTableRowActions<TData>({
  row,
  schema,
  viewDetails,
}: DataTableRowActionsProps<TData>) {
  const [dialogContent, setDialogContent] =
    React.useState<React.ReactNode | null>(null);
  const navigate = useNavigate();

  try {
    // const data = schema.parse(row.original);
    const data = schema.safeParse(row.original);
    console.log("datad: ", data);
    return (
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[200px] bg-white shadow-md border border-gray-200 z-[9999]"
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {viewDetails && (
              <DialogTrigger asChild onClick={() => navigate(viewDetails)}>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
              </DialogTrigger>
            )}
            <DialogTrigger
              asChild
              // onClick={() => navigate(`/update/${data?.id}`)}
            >
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Details
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        {dialogContent && (
          <DialogContent className="bg-white p-6 rounded-lg shadow-lg z-[9999]">
            {dialogContent}
          </DialogContent>
        )}
      </Dialog>
    );
  } catch (error) {
    console.error("Schema validation failed:", error);
    return null;
  }
}
