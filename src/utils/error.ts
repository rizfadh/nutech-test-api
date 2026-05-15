const error = (statusCode: number, status: number, message: string) => {
    const error = new Error(message) as Error & { statusCode: number; status: number };
    error.statusCode = statusCode;
    error.status = status;

    return error;
};

export default error;
