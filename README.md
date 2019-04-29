# await-to-catch

## 概要(使用前务必阅读最佳实践)

-   [x] 替换 try catch,让代码更加简洁
-   [x] 接口错误统一处理
-   [x] 配合 tms-request 使用,无缝连接
-   [x] 灵活的配置想要添加的错误信息

## 指南

### 安装

``` zsh
//切换到tm私有镜像
yarn add @tms/await-to-catch
```

### 初始化

to.js

``` javascript
import AwaitToJs from '@tms/await-to-catch';
import { message } from 'antd';
import { catchServiceError } from 'service/errorCatch';

const { to } = new AwaitToJs({
    messageUi: message,
    catchServiceError
});

export default to;
```

errorCatch/index.js

``` javascript
import { _http } from './http';

// 错误收集的接口函数
function catchServiceError(params) {
    try {
        // **这里是用_http._post 防止死循环
        _http._post('/catch/error', params);
    } catch {
        console.error('接口错误埋点监控');
    }
}

export { catchServiceError };
```

http.js

``` javascript
import $http from 'tms-request';
import to from './to';

// 错误捕捉使用此对象,防止死循环
const _http = {
    _get: $http.get,
    _post: $http.post
};
const http = {
    get: wrapHttp('_get');
    post: wrapHttp('_post');
};

function wrapHttp(method) {
    return async (apiUrl, params, httpOptions = null, catchOptions = {}) => {
        return await to(_http[method](apiUrl, params, httpOptions), {
            ...catchOptions, // 可以根据需要传入每个接口自己的错误信息
            apiUrl
        });
    };
}

export {
    http,
    _http
}
```

### 未使用插件之前

``` javascript
import $http from 'tms-request';
import { message } from 'antd';

const updateApi = async e => {
    try {
        return await $http.post(
            `/user/update`,
            e
        );
    } catch (error) {
        message.error(error.message || error);
        // 错误捕捉接口
        // error ajax
    }
};

const deleteAPi = async e => {
    try {
        return await $http.post(
            `/user/delete`,
            e
        );
    } catch (error) {
        message.error(error.message || error);
        // 错误捕捉接口
        // error ajax
    }
};

export {
    updateApi,
    deleteAPi
}
```

### 使用插件之后,一行代码
``` javascript
import $http from './http';

const updateApi = async e => await $http.post(`/user/update`, e);

const deleteAPi = async e => await $http.post(`/user/delete`, e);

export {
    updateApi,
    deleteAPi
}
```

使用
``` javascript
import { updateApi } form 'service/api'

class Demo extends Component {
    updateApi = async () => {
        this.setState({ loading:true })
        const { data } = await updateApi()
        this.setState({ loading:false })
        if(!data) return
        this.setState({ dataSource:data })
    }
}
```

#### 参考插件

[await-to-js](https://github.com/scopsy/await-to-js)
