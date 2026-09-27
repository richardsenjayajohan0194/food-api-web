'use client';

import { useCallback, useState } from "react";
import { getFoodMenu } from "../../../features/food-menu/actions";
import { useQuery } from '@tanstack/react-query';

import FoodMenuTable from "./food-menu-table";
import type { FoodSearchParams, Order, SortBy } from "../../../types/food";
import FoodMenuToolbar from "./food-menu-toolbar";

export default function FoodMenu() {
    const [searchParams, setSearchParams] = useState<FoodSearchParams>({
        page: 1,
        limit: 10,
        search: '',
        sortBy: 'created_at',
        order: 'desc',
    });

    const updateSearchParams = useCallback(
        (params: Partial<FoodSearchParams>) => {
            setSearchParams(prev => ({
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

    } = useQuery({
        queryKey: ['Foods', searchParams],
        queryFn: () => getFoodMenu(searchParams),
    })

    return (
        <div className="flex grow flex-col justify-center items-center gap-3">
            <FoodMenuToolbar
                search={searchParams.search}
                sortBy={searchParams.sortBy}
                order={searchParams.order}
                onSearchChange={handleSearchChange}
                onSortByChange={handleSortByChange}
                onOrderChange={handleOrderChange}
            />
            <FoodMenuTable
                foods={data}
                isLoading={isLoading} 
                page={searchParams.page} 
                limit={searchParams.limit}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
            />
        </div>
    );

}

