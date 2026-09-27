import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";

import { Field, FieldLabel } from "../../../components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"

import { getFoodMenu } from "../../../features/food-menu/actions";

import type { Food, Limit } from "../../../types/food";
import { FoodTableSkeleton } from "./food-table-skeleton";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "../../../components/ui/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { formatDate } from "../../../lib/utils";

export default function FoodMenuTable({
    foods,
    isLoading,
    page,
    limit,
    onPageChange,
    onLimitChange,
}: {
    foods?: Awaited<ReturnType<typeof getFoodMenu>>;
    page: number;
    limit: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
    isLoading: boolean;
}) {
    return (
        <div className="w-full rounded-sm bg-white p-2">
            <div className="w-full overflow-x-auto">
                <Table className="w-full table-fixed">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                Id
                            </TableHead>

                            <TableHead className="w-[150px]">
                                Name
                            </TableHead>

                            <TableHead className="w-[420px]">
                                Description
                            </TableHead>

                            <TableHead className="w-[90px]">
                                Number / Qty
                            </TableHead>

                            <TableHead className="w-[100px]">
                                Contributor
                            </TableHead>
                            <TableHead className="w-[120px]">
                                Created_at
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {isLoading ? (
                            <FoodTableSkeleton value={limit} />
                        ) : foods?.data?.items?.length ? (
                            foods.data.items.map((food : Food) => (
                                <TableRow key={food.id}>
                                    <TableCell className="w-[50px]">
                                        {food.id}
                                    </TableCell>

                                    <TableCell className="w-[150px]">
                                        <div className="max-w-[180px] truncate">
                                            {food.name}
                                        </div>
                                    </TableCell>

                                    <TableCell className="max-w-[420px]">
                                        <div className="overflow-hidden break-words line-clamp-3">
                                            {food.description}
                                        </div>
                                    </TableCell>

                                    <TableCell className="w-[90px]">
                                        {food.number}
                                    </TableCell>

                                    <TableCell className="w-[100px]">
                                        <div className="max-w-[150px] truncate">
                                            {food.contributorName}
                                        </div>
                                    </TableCell>

                                    <TableCell className="max-w-[120px]">
                                        {formatDate(food.created_at)}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-120 text-center">
                                    <p>No data found</p>
                                    <p className="text-sm text-muted-foreground">
                                        Try searching by name or description.
                                    </p>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <hr className="border-b bg-taupe-50"></hr>
            <div className="flex items-center justify-between align-items-center gap-4 p-3">
                <div>
                    <Field orientation="horizontal" className="w-fit">
                        <Select
                            value={limit.toString()}
                            onValueChange={(value) => {
                                onLimitChange(Number(value) as Limit);
                            }}
                        >
                            <SelectTrigger
                                className="w-20 rounded-md"
                                id="select-rows-per-page"
                            >
                                <SelectValue placeholder={limit.toString()} />
                            </SelectTrigger>

                            <SelectContent align="start">
                                <SelectGroup>
                                    {[5, 10, 15, 20, 50].map((size) => (
                                        <SelectItem
                                            className="rounded-md"
                                            key={`limit-${size}`}
                                            value={size.toString()}
                                        >
                                            {size}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <FieldLabel htmlFor="select-rows-per-page">
                            Rows per page
                        </FieldLabel>
                    </Field>
                </div>

                {foods?.data.totalData && foods?.totalPages > 1 ? (
                     <Pagination className="mx-0 w-auto">
                        <PaginationContent>
                            <PaginationItem>
                            <PaginationLink 
                                className="rounded-md" href='#' aria-label='Go to previous page' 
                                size='icon' 
                                onClick={() => 
                                    page === 1 ?
                                    onPageChange(foods?.totalPages) :
                                    onPageChange(page - 1)
                                }>
                                <ChevronLeftIcon />
                            </PaginationLink>
                            </PaginationItem>
                           {Array.from({ length: foods.totalPages > 4 ? 4 : foods.totalPages}).map((_, index) => {
                                const page =((foods.data.page - 1 + index) % foods.totalPages) + 1;

                                const isActive = page === foods.data.page;
                                return (
                                    <PaginationItem key={`${foods.data.page}-${index}`}>
                                        <PaginationLink
                                            href="#"
                                            size={undefined}
                                            className={`rounded-md ${isActive && 'border-primary'}`}
                                            isActive={isActive}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                onPageChange(page);
                                            }}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            })}
                            <PaginationItem>
                            <PaginationLink 
                                className="rounded-md" href='#' aria-label='Go to next page' 
                                size='icon'
                                onClick={() => 
                                    page === foods?.totalPages ?
                                    onPageChange(1) :
                                    onPageChange(page + 1)
                                }>
                                <ChevronRightIcon />
                            </PaginationLink>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                    ) : (
                        ''
                )}
            </div>
        </div>
    );
}