import MiniCssExtractPlugin from 'mini-css-extract-plugin'; // модуль вывода всех css файлов в отдельный css
import ReactRefreshTypeScript from 'react-refresh-typescript'; // для работы плагина ReactRefreshWebpackPlugin с TS
import { ModuleOptions, runtime } from 'webpack';
import { BuildOptions } from './types/types';
import { buildBabelLoader } from './babel/buildBabelLoader';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const { mode } = options;
    const isProd = mode === 'production';
    const isDev = mode === 'development';

    const TSFilesLoader = {
/* 
если бы мы не использовали TS, который умеет работать с JSX (Javascript eXtenstion, html в js коде), то нам был пришлось использовать
отдельный загрузчик (loader) для JSX файлов - babel-loader 
*/
        test: /\.tsx?$/i,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true, // указывает необходимость только транспиляции загрузчиком, без проверки типов
                    getCustomTransformers: () => ({ // настройка для ts-loader`а
                        before: [isDev && ReactRefreshTypeScript()].filter(Boolean), // в before должна быть только ссылка на функцию, поэтому отсеиваем логические значения через filter().
                    }),
                },
            },
        ],
        exclude: /node_modules/, // исключаем дрикторию, из которой не нужно обрабатывать .ts файлы
    };    

    const CSSLoaderWithModules = {
        loader: 'css-loader',
/* Настраиваем модули css (css modules), в данном случае конфигурируем названия классов селекторов, чтоб добиться уникальных имён
и избежать коллизий (конфликтов имён селекторов)*/
        options: {
            modules: {
                localIdentName: isProd ?
                    '[hash:base64:8]' // Продакшн сборка, в название класса селектора записываем хэш содержимого селектора
                :
                    '[path][name]__[local]', // Сборка разработки, в название класса селектора записываем путь файла, его название и исходное название класса
            },
        },
    };

    const styleFilesLoader = {
        test: /\.(scss|css|sass)$/i,
        // порядок важен
        use:
        [
            isProd ?
                MiniCssExtractPlugin.loader  // Создаёт отдельный минифицированный файл и выгружает туда стили
            :
                'style-loader', // Создаёт style узлы (атрибуты) в js коде

            // Преоброзует CSS в CommonJS
            CSSLoaderWithModules,
            
            // Преобразует SASS в CSS
            'sass-loader',
        ],
    };

    const assetsLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    };

    const SVGLoader = {
        test: /\.svg$/i,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            // ещё один плагин, чтоб применялись стили (style)
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true,
/* конкретно этот параметр указывает плагину брать значение цвета для fill и stroke элементу path в svg из его значения. 
а у него значение берётся из указанного свойства style в теге разметки.*/
                                },
                            },
                        ],
                    },
                },
            },
        ],
    };

    const babelLoader = buildBabelLoader(options);

    return [
        babelLoader,
        //TSFilesLoader,
        styleFilesLoader,
        assetsLoader,
        SVGLoader
    ];
}