import { useQuery } from "@tanstack/react-query";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../../../components/ui/dialog";

import {
    Field,
    FieldGroup,
} from "../../../../components/ui/field";

import { Label } from "../../../../components/ui/label";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../../components/ui/card";

import type { Food } from "../../../../types/food";

import { getRelatedFoodMenu } from "../../../../features/food-menu/actions";
import { memo } from "react";

const FoodMenuViewDialog = memo(({
    food,
    totalData,
    open,
    onOpenChange,
}: {
    food: Food;
    totalData: number;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) => {
    console.log(
        "🔥 FoodMenuViewDialog rendered:",
        food.id,
        food.name
    );

    const {
        data: relatedFoods,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: [
            "RelatedFood",
            food.id,
        ],

        queryFn: () =>
            getRelatedFoodMenu({
                food,
                totalData,
            }),

        enabled: open && !!food.id,
    });

    console.log(
        "RELATED FOODS:",
        relatedFoods
    );

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="xl:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="mb-3">
                        View Food Menu
                    </DialogTitle>

                    <div className="flex bg-taupe-100 rounded-3xl p-5 mb-2">
                        <FieldGroup className="pb-3">
                            <div className="flex flex-row justify-center items-center gap-2">
                                <Field>
                                    <Label htmlFor="id">
                                        Id
                                    </Label>

                                    <p>
                                        {food.id}
                                    </p>
                                </Field>

                                <Field>
                                    <Label htmlFor="contributorName">
                                        Contributor
                                    </Label>

                                    <p>
                                        {food.contributorName}
                                    </p>
                                </Field>
                            </div>

                            <div className="flex justify-center items-center gap-2">
                                <Field>
                                    <Label htmlFor="name">
                                        Name
                                    </Label>

                                    <p>
                                        {food.name}
                                    </p>
                                </Field>

                                <Field>
                                    <Label htmlFor="number">
                                        Number / Qty
                                    </Label>

                                    <p>
                                        {food.number}
                                    </p>
                                </Field>
                            </div>

                            <Field>
                                <Label htmlFor="description">
                                    Description
                                </Label>

                                <p>
                                    {food.description}
                                </p>
                            </Field>
                        </FieldGroup>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Related Information
                            </CardTitle>
                            <CardDescription>
                                Explore foods that are related to this menu based on similar words found in its name and description. Related foods are displayed based on the available matches.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="text-sm text-muted-foreground">
                            {isLoading || isFetching ? (
                                <p>
                                    Loading related foods...
                                </p>
                            ) : relatedFoods?.length ? (
                                <div className="space-y-3 h-[200px] overflow-y-auto ">
                                    {relatedFoods.map(
                                        (relatedFood) => (
                                            <div
                                                key={
                                                    relatedFood.id
                                                }
                                                className="border rounded-md p-3"
                                            >
                                                <p className="font-medium">
                                                    {
                                                        relatedFood.name
                                                    }
                                                </p>

                                                <p className="text-sm">
                                                    {
                                                        relatedFood.description
                                                    }
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <p>
                                    No related foods found.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
});

export default FoodMenuViewDialog;