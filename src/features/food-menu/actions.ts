'use server';

import axios from 'axios';
import type { Food, Order, SortBy } from '../../types/food';
import { toastNotification } from '../../lib/utils';

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
        toastNotification("Success to add", "success");

        return res.data;
    } catch (err) {
        toastNotification("Error to add", "error");
        throw err;
    }
}

const MAX_RESULTS = 3;

const DESCRIPTION_STOP_WORDS = new Set([
    "dan",
    "dengan",
    "yang",
    "untuk",
    "dari",
    "pada",
    "dalam",
    "ini",
    "itu",
    "ada",
    "sangat",
    "sedikit",
    "lebih",
    "atau",
    "ke",
    "di",
    "sebagai",
    "adalah",
    "merupakan",
    "memiliki",
    "menggunakan",
    "secara",
    "agar",
    "dapat",
    "akan",
    "telah",
    "sudah",
    "tidak",
    "juga",
]);

const splitNameWords = (name?: string): string[] => {
    if (!name) {
        return [];
    }

    return [
        ...new Set(
            name
                .toLowerCase()
                .replace(/[^\p{L}\p{N}\s]/gu, " ")
                .split(/\s+/)
                .filter(Boolean)
                .filter((word) => word.length > 2)
        ),
    ];
};

const splitDescriptionWords = (
    description?: string
): string[] => {
    if (!description) {
        return [];
    }

    return [
        ...new Set(
            description
                .toLowerCase()
                .replace(/[^\p{L}\p{N}\s]/gu, " ")
                .split(/\s+/)
                .filter(Boolean)
                .filter((word) => word.length > 2)
                .filter(
                    (word) =>
                        !DESCRIPTION_STOP_WORDS.has(word)
                )
        ),
    ];
};

export async function getRelatedFoodMenu(params?: {
    food: Food;
    totalData: number;
}): Promise<Food[]> {
    if (!params?.food) {
        return [];
    }

    const { food, totalData } = params;

    /*
     * 1. Get words from food name
     *
     * Example:
     * "Bubur Maluku"
     *
     * becomes:
     * ["bubur", "maluku"]
     */
    const nameWords = splitNameWords(food.name);

    /*
     * 2. Get meaningful words from description
     *
     * Example:
     * "Bubur panas dengan sedikit pangsit dan ayam"
     *
     * becomes:
     * ["bubur", "panas", "pangsit", "ayam"]
     */
    const descriptionWords = splitDescriptionWords(
        food.description
    );

    /*
     * 3. Name words have priority.
     *    Description words are used afterward.
     *
     * Duplicate words are removed.
     */
    const searchWords = [
        ...new Set([
            ...nameWords,
            ...descriptionWords,
        ]),
    ];

    console.log("====================================");
    console.log("SEARCH WORDS");
    console.log("====================================");
    console.log(searchWords);

    if (searchWords.length === 0) {
        return [];
    }

    const relatedFoods: Food[] = [];

    /*
     * Used to prevent the same food from
     * being added more than once.
     */
    const usedIds = new Set<number>();

    /*
     * Search ONE word at a time.
     *
     * Example:
     *
     * search = "bubur"
     * search = "maluku"
     * search = "panas"
     * search = "pangsit"
     * search = "ayam"
     */
    for (
        let index = 0;
        index < searchWords.length;
        index++
    ) {
        const searchWord = searchWords[index];

        console.log("====================================");
        console.log(
            `SEARCH WORD ${index + 1}:`,
            searchWord
        );
        console.log("====================================");

        /*
         * API request happens here.
         *
         * Only ONE search word is sent per request.
         */
        const result = await getFoodMenu({
            limit: totalData,
            page: 1,
            search: searchWord,
            order: "desc",
            sortBy: "created_at",
        });

        console.log(
            `RAW API RESULT FOR "${searchWord}":`,
            result
        );

        /*
         * Your getFoodMenu() returns:
         *
         * {
         *     data: {
         *         items: [...]
         *     },
         *     totalPages: ...
         * }
         *
         * Therefore the Food[] is:
         *
         * result.data.items
         */
        const data: Food[] = Array.isArray(
            result?.data?.items
        )
            ? result.data.items
            : [];

        console.log(
            `FOODS FOR "${searchWord}":`,
            data
        );

        /*
         * Process foods returned by this search.
         */
        for (const item of data) {
            /*
             * Never include the food currently being viewed.
             */
            if (item.id === food.id) {
                console.log(
                    "Excluded current food:",
                    item.name
                );

                continue;
            }

            /*
             * Never include the same food twice.
             */
            if (usedIds.has(item.id)) {
                console.log(
                    "Excluded duplicate:",
                    item.name
                );

                continue;
            }

            /*
             * Keep the COMPLETE Food object.
             *
             * This includes:
             * id
             * name
             * description
             * number
             * contributorName
             * created_at
             * etc.
             */
            relatedFoods.push(item);

            usedIds.add(item.id);

            console.log(
                "Added related food:",
                item
            );

            /*
             * Stop immediately when we have 3.
             */
            if (
                relatedFoods.length >= MAX_RESULTS
            ) {
                console.log(
                    "Found 3 related foods. Stop searching."
                );

                return relatedFoods;
            }
        }
    }

    /*
     * Not enough related foods were found.
     *
     * Return whatever we found.
     */
    console.log(
        "Finished searching. Related foods:",
        relatedFoods
    );

    return relatedFoods;
}