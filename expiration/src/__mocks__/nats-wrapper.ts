export const natsWrapper = {
    client: {
        publish: jest.fn().mockImplementation(
            (subject: string, data: StorageManager, callback: () => void) => {
                callback();
            })
    }
}