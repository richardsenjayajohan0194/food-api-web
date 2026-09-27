import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "../../../components/ui/input-group";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";

import { Search } from "lucide-react";
import type { Order, SortBy } from "../../../types/food";
import { useEffect, useState, memo } from "react";

const itemsSortBy = [
    { label: "Id", value: "id" },
    { label: "Created_at", value: "created_at" },
    { label: "Name", value: "name" },
    { label: "Number / Qty", value: "number" },
    { label: "Contribution Name", value: "contributionName" },
];

const itemsOrder = [
    { label: "Asc", value: "asc" },
    { label: "Desc", value: "desc" },
];

const FoodMenuToolbar = memo(function FoodMenuToolbar({
    search,
    sortBy,
    order,
    onSearchChange,
    onSortByChange,
    onOrderChange,
}: {
    search: string;
    sortBy: string;
    order: string;
    onSearchChange: (search: string) => void;
    onSortByChange: (sortBy: SortBy) => void;
    onOrderChange: (order: Order) => void;
}) {
    const [localSearch, setLocalSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (localSearch !== search) {
                onSearchChange(localSearch);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [localSearch, search, onSearchChange]);

    return (
        <div className="flex w-full items-center justify-between gap-3 rounded-md bg-white p-8">
            <div className="flex items-center justify-center gap-2">

                {/* Sort By */}
                <Select
                    value={sortBy}
                    onValueChange={(value) => {
                        onSortByChange(value as SortBy);
                    }}
                >
                    <SelectTrigger className="w-48 rounded-md">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>

                    <SelectContent className="rounded-md">
                        <SelectGroup>
                            <SelectLabel>Sort by</SelectLabel>

                            {itemsSortBy.map((item) => (
                                <SelectItem
                                    key={item.value}
                                    value={item.value}
                                    className="hover:rounded-md"
                                >
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {/* Order */}
                <Select
                    value={order}
                    onValueChange={(value) => {
                        onOrderChange(value as Order);
                    }}
                >
                    <SelectTrigger className="w-48 rounded-md">
                        <SelectValue placeholder="Order" />
                    </SelectTrigger>

                    <SelectContent className="rounded-md">
                        <SelectGroup>
                            <SelectLabel>Order</SelectLabel>

                            {itemsOrder.map((item) => (
                                <SelectItem
                                    key={item.value}
                                    value={item.value}
                                    className="hover:rounded-md"
                                >
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Search */}
            <InputGroup className="max-w-xs rounded-md">
                <InputGroupInput
                    placeholder="Search..."
                    value={localSearch}
                    onChange={(e) => {
                        setLocalSearch(e.target.value);
                    }}
                />

                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
});

export default FoodMenuToolbar;