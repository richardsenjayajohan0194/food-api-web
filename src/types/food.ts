export type Food = {
    id: number;
    name: string,
    description: string,
    contributorName: string | null,
    number: number,
    created_at: string,
}

export type Limit = 5 | 10 | 15 | 20 | 50;
export type Order = 'asc' | 'desc';
export type SortBy = 'id' | 'created_at' | 'name' | 'number' | 'contributorName';

export interface FoodSearchParams {
    page: number;
    limit: number;
    search: string;
    sortBy: SortBy;
    order: Order;
}
