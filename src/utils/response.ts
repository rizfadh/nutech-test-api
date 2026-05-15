const response = {
    success: <T>(message: string, data: T) => {
        return { status: 0, message, data };
    },

    failed: (status: number, message: string) => {
        return { status, message, data: null };
    },
};

export default response;
