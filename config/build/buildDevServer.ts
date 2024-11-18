import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'; // модуль конфигурации для devServer, чтоб TypeScript видел свойство devServer
import { BuildOptions } from './types/types';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port ?? 3000,
        open: true,
        historyApiFallback: true, /* нужная штука, так как в данном проекте используется SPA (Single Page Application),
поэтому все маршруты определяются в JS коде, поэтому эта штука говорит переадресовывать на index.html файл все запросы,
которые запрашивает не существующие / не найденные ресурсы, то есть если сервер не сможет найти запрошенный файл - он вернёт страницу
по умолчанию
Справка: Эта штука работает только в dev-server, при деплои, раздаче статики (статических файлов) через nginx - там также необходимо будет
проксировать все запросы на не существующие / не найденные ресурсы в index.html.
Вот здесь подробно описывается - https://www.youtube.com/watch?v=8OHe6chCWTE */
        hot: true
    }
}