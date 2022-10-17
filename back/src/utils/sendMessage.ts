
export const sendResult = (result: any) => {
    return { status: 'success', data: result };
}

export const sendMsg = (staus: string, msg: string) => {
    return { staus, msg };
}

export const sendError = (error: Error) => {
    console.error(error);
    return { status: 'error', error: error, msg: error.message };
}