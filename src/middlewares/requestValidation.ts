import { type RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { ZodError, ZodType } from 'zod';
import response from '../utils/response.js';

const requestValidation =
    (schema: ZodType): RequestHandler =>
    async (req, res, next) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
                file: req.file,
            });
            next();
        } catch (error) {
            const validationError = (error as ZodError).issues?.[0];
            let status = 100;
            let message;

            try {
                const parsed = JSON.parse(validationError?.message || '{}');
                status = parsed.status;
                message = parsed.message;
            } catch {
                message = validationError?.message || 'Validation Error';
            }

            res.status(StatusCodes.BAD_REQUEST).send(response.failed(status, message));
        }
    };

export default requestValidation;
