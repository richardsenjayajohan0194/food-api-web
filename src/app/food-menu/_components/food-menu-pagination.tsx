import { Field, FieldLabel } from "../../../components/ui/field";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "../../../components/ui/pagination";

import {
    ChevronLeftIcon,
    ChevronRightIcon,
} from "lucide-react";

import type { Limit } from "../../../types/food";
import { memo } from "react";

const FoodMenuPagination = memo(({
    totalData,
    totalPages,
    page,
    limit,
    onPageChange,
    onLimitChange,
}: {
    totalData: number;
    totalPages: number;
    page: number;
    limit: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}) => {
    console.log("FoodMenuPagination rendered");

    return (
        <div className="flex items-center justify-between align-items-center gap-4 p-3">

            {/* Rows per page */}
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
                            <SelectValue
                                placeholder={limit.toString()}
                            />
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

            {/* Page navigation */}
            {totalData > 0 ? (
                <Pagination className="mx-0 w-auto">
                    <PaginationContent>

                        {/* Previous */}
                        <PaginationItem>
                            <PaginationLink
                                className="rounded-md"
                                href="#"
                                aria-label="Go to previous page"
                                size="icon"
                                onClick={() =>
                                    page === 1
                                        ? onPageChange(totalPages)
                                        : onPageChange(page - 1)
                            }
                            >
                                <ChevronLeftIcon />
                            </PaginationLink>
                        </PaginationItem>

                        {/* Page numbers */}
                        {Array.from({ length: totalPages > 4 ? 4 : totalPages }).map((_, index) => {

                            const pageNumber = ((page - 1 + index) % totalPages) + 1;

                            const isActive = pageNumber === page;

                            return (
                                <PaginationItem
                                    key={`${page}-${index}`}
                                >
                                    <PaginationLink
                                        href="#"
                                        size={undefined}
                                        className={`rounded-md ${
                                            isActive && "border-primary"
                                        }`}
                                        isActive={isActive}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            onPageChange(pageNumber);
                                        }}
                                    >
                                        {pageNumber}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}

                        {/* Next */}
                        <PaginationItem>
                            <PaginationLink
                                className="rounded-md"
                                href="#"
                                aria-label="Go to next page"
                                size="icon"
                                onClick={() =>
                                    page === totalPages
                                        ? onPageChange(1)
                                        : onPageChange(page + 1)
                            }
                            >
                                <ChevronRightIcon />
                            </PaginationLink>
                        </PaginationItem>

                    </PaginationContent>
                </Pagination>
            ) : null}

        </div>
    );
});

export default FoodMenuPagination;