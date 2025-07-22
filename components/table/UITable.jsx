"use client";

import React, { useMemo, useState, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
} from "@heroui/react";
import { Search, ChevronDown, Cog, Plus } from "lucide-react";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";

const capitalize = (s) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
const statusColorMap = { enable: "none", disable: "danger" };

export default function UITable({
  data = [],
  isLoading = false,
  columns = [],
  statusOptions = [],
  entityNamePlural = "",
  searchPlaceholder = "",
  basePath = "",
  extraFiltersSlot = null,
}) {
  const [filterValue, setFilterValue] = useState("");
  const debouncedFilter = useDebounce(filterValue, 300);

  const [selectedKeys, setSelectedKeys] = useState(new Set());
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(columns.map((c) => c.uid))
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "id",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const headerColumns = useMemo(
    () =>
      visibleColumns === "all"
        ? columns
        : columns.filter((c) => visibleColumns.has(c.uid)),
    [visibleColumns, columns]
  );

  const filteredItems = useMemo(() => {
    let filtered = [...data];
    if (debouncedFilter)
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(debouncedFilter.toLowerCase())
      );

    if (statusFilter !== "all") {
      const selected = Array.from(statusFilter);
      if (selected.length < statusOptions.length)
        filtered = filtered.filter((item) => selected.includes(item.status));
    }
    return filtered;
  }, [data, debouncedFilter, statusFilter, statusOptions]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column] ?? "";
      const second = b[sortDescriptor.column] ?? "";
      if (typeof first === "string" && typeof second === "string") {
        return sortDescriptor.direction === "descending"
          ? second.localeCompare(first)
          : first.localeCompare(second);
      }
      return sortDescriptor.direction === "descending"
        ? first > second
          ? -1
          : 1
        : first < second
        ? -1
        : 1;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback(
    (item, columnKey) => {
      const value = item[columnKey];
      switch (columnKey) {
        case "name":
          return typeof value === "string" ? (
            <p className="text-bold text-sm">{value}</p>
          ) : (
            value
          );
        case "created":
          return (
            <div className="text-sm leading-snug">
              <div>{item.creator}</div>
              <div className="text-xs text-default">{item.createAt}</div>
            </div>
          );
        case "updated":
          return (
            <div className="text-sm leading-snug">
              <div>{item.updateBy}</div>
              <div className="text-xs text-default">{item.updateAt}</div>
            </div>
          );
        case "status":
          return (
            <Chip
              className="w-full h-full p-2 gap-2 border_custom"
              color={statusColorMap[item.status]}
              radius="none"
              variant="solid"
            >
              {capitalize(value)}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center p-2 gap-2 border_custom">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    color="none"
                    radius="none"
                    className="w-full p-2"
                    aria-label="Actions"
                  >
                    <Cog />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    key="edit"
                    as={Link}
                    href={`${basePath}/${item.id}`}
                  >
                    Edit
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return value ?? "-";
      }
    },
    [basePath]
  );

  const topContent = (
    <div className="flex flex-col items-center justify-center w-full p-2 gap-2 border_custom">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 border_custom">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 border_custom">
          <Input
            isClearable
            placeholder={searchPlaceholder}
            variant="bordered"
            color="default"
            radius="none"
            className="w-8/12"
            startContent={<Search />}
            value={filterValue}
            onClear={() => setFilterValue("")}
            onValueChange={setFilterValue}
          />
        </div>
        <div className="lg:flex hidden items-center justify-center h-full p-2 gap-2 border_custom">
          <Dropdown>
            <DropdownTrigger>
              <Button
                color="none"
                radius="none"
                className="w-full p-2"
                endContent={<ChevronDown />}
              >
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {capitalize(status.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="lg:flex hidden items-center justify-center h-full p-2 gap-2 border_custom">
          <Dropdown>
            <DropdownTrigger>
              <Button
                color="none"
                radius="none"
                className="w-full p-2"
                endContent={<ChevronDown />}
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        {extraFiltersSlot && (
          <div className="lg:flex hidden items-center justify-center h-full p-2 gap-2 border_custom">
            {extraFiltersSlot}
          </div>
        )}
        <div className="flex items-center justify-center h-full p-2 gap-2 border_custom">
          <Button
            asChild
            color="none"
            radius="none"
            className="w-full p-2"
            endContent={<Plus />}
          >
            <Link href={`${basePath}/create`}>Add New</Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full h-full p-2 gap-2 border_custom">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 border_custom">
          Total {data.length} {entityNamePlural}
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2 border_custom">
          Rows per page:
          <select
            className="p-2"
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
    </div>
  );

  const bottomContent = (
    <div className="flex flex-row items-center justify-center w-full p-2 gap-2 border_custom">
      <div className="flex items-center justify-start w-full h-full p-2 gap-2 border_custom">
        {selectedKeys === "all"
          ? "All items selected"
          : `${selectedKeys.size} of ${filteredItems.length} selected`}
      </div>
      <div className="flex items-center justify-end w-full h-full p-2 gap-2 border_custom">
        <Pagination
          isCompact
          showControls
          showShadow
          color="none"
          radius="none"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 border_custom overflow-auto">
      <Table
        isHeaderSticky
        aria-label={`${entityNamePlural} table`}
        shadow="none"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{ wrapper: "w-full h-full" }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              className="p-2"
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        {isLoading ? (
          <TableBody emptyContent="Loading..." items={[]}>
            <TableRow>
              {(column) => <TableCell key={column}>Loading...</TableCell>}
            </TableRow>
          </TableBody>
        ) : (
          <TableBody
            emptyContent={`No ${entityNamePlural} found`}
            items={sortedItems}
          >
            {(item) => (
              <TableRow key={item.id} className="border-b-2 border-default">
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
    </div>
  );
}
