'use client';

import { useCallback, useState } from "react";
import { getFoodMenu } from "../../../../features/food-menu/actions";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import FoodMenuTable from "./food-menu-table";
import type {
    FoodSearchParams,
    Order,
    SortBy,
} from "../../../../types/food";

import FoodMenuToolbar from "./food-menu-toolbar";
import FoodMenuPagination from "./food-menu-pagination";

export default function FoodMenu() {
    const [searchParams, setSearchParams] =
        useState<FoodSearchParams>({
            page: 1,
            limit: 10,
            search: "",
            sortBy: "created_at",
            order: "desc",
        });

    const updateSearchParams = useCallback(
        (params: Partial<FoodSearchParams>) => {
            setSearchParams((prev) => ({
                ...prev,
                ...params,
            }));
        },
        []
    );

    const handleSearchChange = useCallback(
        (search: string) => {
            updateSearchParams({
                search,
                page: 1,
            });
        },
        [updateSearchParams]
    );

    const handleSortByChange = useCallback(
        (sortBy: SortBy) => {
            updateSearchParams({
                sortBy,
                page: 1,
            });
        },
        [updateSearchParams]
    );

    const handleOrderChange = useCallback(
        (order: Order) => {
            updateSearchParams({
                order,
                page: 1,
            });
        },
        [updateSearchParams]
    );

    const handlePageChange = useCallback(
        (page: number) => {
            updateSearchParams({
                page,
            });
        },
        [updateSearchParams]
    );

    const handleLimitChange = useCallback(
        (limit: number) => {
            updateSearchParams({
                limit,
                page: 1,
            });
        },
        [updateSearchParams]
    );

    const {
        data,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ["Foods", searchParams],
        queryFn: () => getFoodMenu(searchParams),
        placeholderData: keepPreviousData,
    });

    const totalData = data?.data.totalData ?? 0;
    const totalPages = data?.totalPages ?? 0;

    return (
        <div className="flex min-w-0 w-full flex-1 flex-col gap-3 p-3">
            {/* Toolbar */}
            <FoodMenuToolbar
                search={searchParams.search}
                sortBy={searchParams.sortBy}
                order={searchParams.order}
                onSearchChange={handleSearchChange}
                onSortByChange={handleSortByChange}
                onOrderChange={handleOrderChange}
            />

            {/* Main content */}
            <div className="flex min-w-0 w-full flex-1 flex-col rounded-md bg-white p-2">
                {/* Table */}
                <FoodMenuTable
                    foods={data}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    limit={searchParams.limit}
                />

                <hr className="border-b bg-taupe-50" />

                {/* Pagination */}
                {data && !isFetching ? (
                    <FoodMenuPagination
                        totalData={totalData}
                        totalPages={totalPages}
                        page={searchParams.page}
                        limit={searchParams.limit}
                        onPageChange={handlePageChange}
                        onLimitChange={handleLimitChange}
                    />
                ) : null}
            </div>
        </div>
    );
}