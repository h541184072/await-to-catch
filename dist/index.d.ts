interface messageUi {
    readonly error: Function;
}
interface defaultOptions {
    readonly messageUi: messageUi;
    readonly catchServiceError: Function;
}
interface urlOptions {
    apiUrl: string;
}
export default class AwaitToJs {
    private defaultOptions;
    constructor(options: defaultOptions);
    to<T>(promise: Promise<T>, options: urlOptions): Promise<T | undefined>;
}
export {};
