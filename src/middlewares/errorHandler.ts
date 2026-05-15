import type { ErrorRequestHandler, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import response from '../utils/response.js';

const unexpectedRequest: RequestHandler = (_req, res) => {
    res.status(StatusCodes.NOT_FOUND).json(response.failed(100, 'Not Found'));
};

/* eslint-disable @typescript-eslint/no-unused-vars */
const globalErrorResponse: ErrorRequestHandler = (err, _req, res, _next) => {
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const status = err.status || 100;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json(response.failed(status, message));
};

export default (): [RequestHandler, ErrorRequestHandler] => [
    unexpectedRequest,
    globalErrorResponse,
];
