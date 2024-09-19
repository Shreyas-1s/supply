import React from 'react';

// Table Component
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table
      ref={ref}
      className={`w-full caption-bottom text-sm ${className}`}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

// TableHeader Component
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={`bg-gray-50 ${className}`} {...props} />
));
TableHeader.displayName = "TableHeader";

// TableBody Component
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={`bg-white divide-y divide-gray-200 ${className}`}
    {...props}
  />
));
TableBody.displayName = "TableBody";

// TableRow Component
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr ref={ref} className={`hover:bg-gray-50 ${className}`} {...props} />
));
TableRow.displayName = "TableRow";

// TableHead Component
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
    {...props}
  />
));
TableHead.displayName = "TableHead";

// TableCell Component
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td ref={ref} className={`px-6 py-4 whitespace-nowrap ${className}`} {...props} />
));
TableCell.displayName = "TableCell";

// Export all components for use in other parts of the application
export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
};
