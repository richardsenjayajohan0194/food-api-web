import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";

import { getFoodMenu } from "../../../features/food-menu/actions";

import type { Food } from "../../../types/food";
import { FoodTableSkeleton } from "./food-table-skeleton";

import { formatDate } from "../../../lib/utils";

export default function FoodMenuTable({
    foods,
    isLoading,
    isFetching,
    limit,
}: {
    foods?: Awaited<ReturnType<typeof getFoodMenu>>;
    limit: number;
    isLoading: boolean;
    isFetching: boolean;
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
                        {isLoading || isFetching ? (
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
        </div>
    );
}