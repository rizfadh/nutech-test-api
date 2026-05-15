import { z } from 'zod';

const topUpUserBalanceSchema = z.object({
    body: z.object({
        top_up_amount: z
            .number(JSON.stringify({ status: 102, message: 'Parameter top_up_amount wajib diisi' }))
            .min(
                0,
                JSON.stringify({
                    status: 102,
                    message:
                        'Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0',
                })
            ),
    }),
});

const userTransactionSchema = z.object({
    body: z.object({
        service_code: z.string(
            JSON.stringify({ status: 102, message: 'Parameter service_code wajib diisi' })
        ),
    }),
});

const userTransactionHistorySchema = z.object({
    query: z.object({
        limit: z.coerce.number().optional(),
        offset: z.coerce.number().optional(),
    }),
});

export { topUpUserBalanceSchema, userTransactionSchema, userTransactionHistorySchema };
