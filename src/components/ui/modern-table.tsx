
import React from 'react';
import { cn } from "@/lib/utils";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface ModernTableProps {
  children: React.ReactNode;
  className?: string;
}

interface ModernTableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface ModernTableBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface ModernTableRowProps {
  children: React.ReactNode;
  className?: string;
  isClickable?: boolean;
  onClick?: () => void;
}

interface ModernTableCellProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

const ModernTable = ({ children, className }: ModernTableProps) => {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
      <Table className={cn("w-full border-collapse font-sans", className)}>
        {children}
      </Table>
    </div>
  );
};

const ModernTableHeader = ({ children, className }: ModernTableHeaderProps) => {
  return (
    <TableHeader className={cn("bg-gray-50", className)}>
      {children}
    </TableHeader>
  );
};

const ModernTableBody = ({ children, className }: ModernTableBodyProps) => {
  return (
    <TableBody className={cn("", className)}>
      {children}
    </TableBody>
  );
};

const ModernTableRow = ({ children, className, isClickable, onClick }: ModernTableRowProps) => {
  return (
    <TableRow 
      className={cn(
        "border-b border-gray-100 transition-colors hover:bg-gray-50",
        isClickable && "cursor-pointer hover:bg-blue-50",
        className
      )}
      onClick={onClick}
    >
      {children}
    </TableRow>
  );
};

const ModernTableCell = ({ children, className, align = 'left' }: ModernTableCellProps) => {
  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <TableCell className={cn(
      "p-4 font-medium text-gray-900 text-sm",
      alignmentClass[align],
      className
    )}>
      {children}
    </TableCell>
  );
};

const ModernTableHeadCell = ({ children, className, align = 'left' }: ModernTableCellProps) => {
  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <TableHead className={cn(
      "p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider",
      alignmentClass[align],
      className
    )}>
      {children}
    </TableHead>
  );
};

export {
  ModernTable,
  ModernTableHeader,
  ModernTableBody,
  ModernTableRow,
  ModernTableCell,
  ModernTableHeadCell
};
