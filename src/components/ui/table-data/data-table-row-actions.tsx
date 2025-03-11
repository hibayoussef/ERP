"use client";

import { Row } from "@tanstack/react-table";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Copy, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { brandSchema } from "@/components/lib/validations/brand";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [dialogContent, setDialogContent] =
    React.useState<React.ReactNode | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] =
    React.useState<boolean>(false);
  const task = brandSchema.parse(row.original);

  const handleEditClick = () => {
    // setDialogContent(<EditDialog task={task} />);
  };

  const navigate = useNavigate(); 

  return (
    //   <></>
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
          <DropdownMenuItem
          // onClick={() => navigator.clipboard.writeText(task.id)}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Task ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger asChild onClick={() => {}}>
            <DropdownMenuItem>
              {" "}
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild onClick={handleEditClick}>
            <DropdownMenuItem onClick={() => navigate("/brands/update/:id")}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Details
            </DropdownMenuItem>
          </DialogTrigger>
          {/* <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Details
          </DropdownMenuItem> */}
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuSub>
            {/* <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger> */}
            {/* <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={task.label}>
                {label_options.map((label) => (
                  <DropdownMenuRadioItem key={label.value} value={label.value}>
                    <label.icon className="w-4 h-4 mr-2" />
                    {label.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent> */}
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
      {dialogContent && (
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg z-[9999]">
          {dialogContent}
        </DialogContent>
      )}
      {/* <DeleteDialog
        task={task}
        isOpen={showDeleteDialog}
        showActionToggle={setShowDeleteDialog}
      /> */}
    </Dialog>
  );
}
