import { useState } from "react";
import {
    ChevronDownIcon,
    ChevronUpIcon,
    Plus,
} from "lucide-react";
import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { Button } from "../../../components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog";
import { Field, FieldGroup } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";

import {
    NumberField,
    NumberFieldDecrement,
    NumberFieldGroup,
    NumberFieldIncrement,
    NumberFieldInput,
    NumberFieldScrubArea,
} from "../../../components/reui/number-field";

import { useCurrentUser } from "../../../hooks/use-current-user";
import { createFoodMenu } from "../../../features/food-menu/actions";
import type { Food } from "../../../types/food";

export function FoodMenuDialog() {
    const user = useCurrentUser();

    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();

    const [foodMenu, setFoodMenu] = useState<
        Omit<Food, "id" | "created_at">
    >({
        name: "",
        description: "",
        contributorName: "",
        number: 1,
    });

    const createFoodMenuMutation = useMutation({
        mutationFn: createFoodMenu,

        onSuccess: async () => {
            console.log("Food created successfully");

            setOpen(false);

            // Refetch / invalidate the food menu query
            await queryClient.invalidateQueries({
                queryKey: ["Foods"],
            });

            // Reset form
            setFoodMenu({
                name: "",
                description: "",
                contributorName: "",
                number: 1,
            });
        },

        onError: (error) => {
            console.error(
                "Failed to create food:",
                error
            );
        },
    });

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!user) {
            console.error("User is not available");
            return;
        }

        const payload = {
            ...foodMenu,
            contributorName: user.name,
        };

        console.log("Submitting:", payload);

        createFoodMenuMutation.mutate(payload);
    };

    const handleNumberChange = (value: number) => {
        const newValue = Math.min(
            100,
            Math.max(0, value)
        );

        setFoodMenu((prev) => ({
            ...prev,
            number: newValue,
        }));
    };

    const handleNumberInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = Number(event.target.value);

        if (Number.isNaN(value)) {
            return;
        }

        handleNumberChange(value);
    };

    const handleIncrement = () => {
        handleNumberChange(
            foodMenu.number + 1
        );
    };

    const handleDecrement = () => {
        handleNumberChange(
            foodMenu.number - 1
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex justify-center items-center gap-2 bg-primary text-white p-6 rounded-md text-md">
                    <Plus className="size-xs" />
                    Add Food Menu
                </Button>
            </DialogTrigger>

            <DialogContent className="md:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="pb-3">
                        <DialogTitle>
                            Add Food Menu
                        </DialogTitle>
                    </DialogHeader>

                    <FieldGroup className="pb-3">
                        <div className="flex justify-center items-center gap-2">
                            <Field>
                                <Label htmlFor="name">
                                    Name
                                </Label>

                                <Input
                                    className="rounded-md"
                                    id="name"
                                    placeholder="Name"
                                    value={foodMenu.name}
                                    onChange={(e) =>
                                        setFoodMenu(
                                            (prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            })
                                        )
                                    }
                                />
                            </Field>

                            <NumberField
                                className="gap-y-[12px] max-w-[150px]"
                                min={1}
                                max={100}
                            >
                                <NumberFieldScrubArea label="Number / Qty" />

                                <NumberFieldGroup className="h-9 rounded-md">
                                    <NumberFieldInput
                                        id="number"
                                        className="text-start"
                                        value={
                                            foodMenu.number
                                        }
                                        onChange={
                                            handleNumberInputChange
                                        }
                                    />

                                    <div className="border-input bg-muted/30 rounded-lg m-px flex shrink-0 flex-col overflow-hidden border">
                                        <NumberFieldIncrement
                                            type="button"
                                            className="border-input hover:bg-accent focus-visible:bg-accent flex h-3.5 w-full flex-1 shrink-0 items-center rounded-none! border-b px-1.5 leading-none"
                                            onClick={
                                                handleIncrement
                                            }
                                        >
                                            <ChevronUpIcon className="size-3.5" />
                                        </NumberFieldIncrement>

                                        <NumberFieldDecrement
                                            type="button"
                                            className="hover:bg-accent focus-visible:bg-accent flex h-3.5 w-full flex-1 shrink-0 items-center rounded-none! px-1.5 leading-none"
                                            onClick={
                                                handleDecrement
                                            }
                                        >
                                            <ChevronDownIcon className="size-3.5" />
                                        </NumberFieldDecrement>
                                    </div>
                                </NumberFieldGroup>
                            </NumberField>
                        </div>

                        <Field>
                            <Label htmlFor="description">
                                Description
                            </Label>

                            <Textarea
                                className="rounded-md h-40"
                                placeholder="Type your description here."
                                value={
                                    foodMenu.description
                                }
                                onChange={(e) =>
                                    setFoodMenu(
                                        (prev) => ({
                                            ...prev,
                                            description:
                                                e.target.value,
                                        })
                                    )
                                }
                            />
                        </Field>
                    </FieldGroup>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                className="rounded-md"
                                variant="outline"
                                type="button"
                            >
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button
                            className="rounded-md"
                            type="submit"
                            disabled={
                                createFoodMenuMutation.isPending
                            }
                        >
                            {createFoodMenuMutation.isPending
                                ? "Saving..."
                                : "Save"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}