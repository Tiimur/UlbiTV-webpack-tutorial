import path from 'path';
import { ProgressPlugin, Configuration, DefinePlugin } from 'webpack';
import HtmlPlugin from 'html-webpack-plugin'; // модуль плагина для удобной работы с html файлом
import MiniCssExtractPlugin from 'mini-css-extract-plugin'; // модуль плагина для вывода всех css стилей в отдельный минифицированный (сжатый) css файл
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'; // модуль плагина анализатора размера выходного bundl`а
import ForkTsCheckerPlugin from 'fork-ts-checker-webpack-plugin'; // модуль плагина проверки типов TS в отдельном процессе
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'; // модуль плагина обновления кода в реальном времени
import CopyPlugin from 'copy-webpack-plugin'; // модуль плагина копирования статичных файлов в папку сборки
import { BuildOptions } from './types/types';

export function buildPlugins({mode, paths, analyzer, platform}: BuildOptions): Configuration['plugins'] {
    const isProd = mode === 'production';
    const isDev = mode === 'development';

    const plugins: Configuration['plugins'] = [
        new HtmlPlugin({ // плагин, подставляющий скрипты (ссылки), получаемые во время сборки в html файл
            template: paths.html,
            favicon: path.resolve(paths.public, 'favicon.ico'),
        }),
        new DefinePlugin({ // подменяет используемые в коде глобальные переменные на те значения, которые задаём на этапе сборки (версия, режим сборки, платформа и т.д.)
            __PLATFORM__: JSON.stringify(platform),
        }),
        // Выносим проверку типов TS в отдельный процесс: не нагружая сборку
        new ForkTsCheckerPlugin(),
    ];
    
    if (isProd) {
        // замедляет сборку, поэтому используем этот плагин только во время сборки продакшена
        plugins.push(new ProgressPlugin());
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].css'}));
        plugins.push(new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(paths.public, 'locales'),
                    to: path.resolve(paths.output, 'locales'),
                },
            ]
        }));
    }
    else if (isDev) {
        plugins.push(new ReactRefreshPlugin);
    }

    if (analyzer)
        plugins.push(new BundleAnalyzerPlugin());

    return plugins;
}
