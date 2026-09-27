'use server';

import axios from 'axios';
import type { Food, Order, SortBy } from '../../types/food';

const DB_URL = 'https://foods.zetasolution.id/';

export async function getFoodMenu(params?: {
    limit?: number;
    page?: number;
    search?: string;
    sortBy?: SortBy;
    order?: Order;
}) {
    const {
        limit = 10,
        page = 1,
        search,
        sortBy = 'created_at',
        order ='desc',
    } = params || {};

    const query = new URLSearchParams({
        limit: String(limit),
        page: String(page),
        sortBy,
        order,
    });

    if (search) {
        query.set('search', search);
    }

    try {
        const res = await axios.get(`${DB_URL}?${query.toString()}`);
        console.log('Api response:', res.data);
        const data = res.data;
        return {
            data,
            totalPages: Math.ceil(data.totalData / limit),
        };
    } catch (err) {
        console.error('Failed to retrieve foods:', err);
        throw err;
    }
}

export async function createFoodMenu(
    payload: Omit<Food, 'id' | 'created_at'>,
) {

    try {
        const res = await axios.post(DB_URL, payload);
        console.log("success to add", res.data);
        return res.data;
    } catch (err) {
        console.error('Error sending data:', err);
        throw err;
    }
}