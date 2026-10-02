import { Skeleton } from "../../../../components/ui/skeleton";
import {
    TableCell,
    TableRow,
} from "../../../../components/ui/table";

export function FoodTableSkeleton({
    value,
}: {
    value: number,
}) {
    return (
        <>
            {Array.from({ length: value }).map((_, index) => (
                <TableRow key={index}>
                    <TableCell>
                        <Skeleton className="h-4 w-8" />
                    </TableCell>

                    <TableCell>
                        <Skeleton className="h-4 w-28" />
                    </TableCell>

                    <TableCell>
                        <Skeleton className="h-4 w-full" />
                    </TableCell>

                    <TableCell>
                        <Skeleton className="h-4 w-12" />
                    </TableCell>

                    <TableCell>
                        <Skeleton className="h-4 w-20" />
                    </TableCell>

                    <TableCell>
                        <Skeleton className="h-4 w-24" />
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}