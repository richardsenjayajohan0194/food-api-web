import { Eye } from "lucide-react";
import { lazy, Suspense, useState } from "react";

import { Button } from "../../../../components/ui/button";

import type { Food } from "../../../../types/food";

const FoodMenuViewDialog = lazy(
    () => import("./food-menu-view-dialog")
);

export default function FoodMenuViewDialogTrigger({
    food,
    totalData,
}: {
    food: Food;
    totalData: number;
}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                className="bg-primary text-white p-2 rounded-md text-md"
                onClick={() => setOpen(true)}
            >
                <Eye />
            </Button>

            {open && (
                <Suspense
                    fallback={null}
                >
                    <FoodMenuViewDialog
                        food={food}
                        totalData={totalData}
                        open={open}
                        onOpenChange={setOpen}
                    />
                </Suspense>
            )}
        </>
    );
}