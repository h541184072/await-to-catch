interface messageUi {
    readonly error: Function;
}

interface defaultOptions {
    readonly messageUi: messageUi; // ant Message 组件
    readonly catchServiceError: Function; // 捕获错误的接口函数
}

interface urlOptions {
    apiUrl: string; // 请求的接口地址
}

export default class AwaitToJs {
    private defaultOptions: defaultOptions;

    constructor(options: defaultOptions) {
        this.defaultOptions = options;
        this.to = this.to.bind(this);
    }

    to<T>(promise: Promise<T>, options: urlOptions): Promise<T | undefined> {
        return promise.catch(err => {
            const { catchServiceError, messageUi } = this.defaultOptions;

            const params = {
                ...options,
                err: JSON.stringify(err),
                url: location.href
            };
            err && messageUi.error(err.message || err);
            catchServiceError(params);

            return undefined;
        });
    }
}
