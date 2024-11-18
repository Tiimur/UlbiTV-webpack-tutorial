import { Configuration } from 'webpack';
import { BuildOptions } from './types/types';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';

// CommonJS export module system
export function buildWebpack(options: BuildOptions): Configuration{
    const {mode, paths} = options;
    const isDev = options.mode === 'development';
    
    return {
        mode: mode ?? 'development', // оператор ?? проверяет поле на значение null / undefined, и возвращает второй операнд, если первый имеет эти значения     
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: 'js/[name].[contenthash].js', // при статичном имени файла браузер будет их кэшировать, из-за чего новые изменения могут применяться не сразу.
            clean: true, // перед сборкой автоматически удаляет все не используемые файлы
        },        
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'eval-cheap-source-map' : 'source-map', // задаёт стиль отображения исходного кода при отладки. Эти значения могу влиять на скорость сборки и пересборки
        devServer: isDev && buildDevServer(options),
    }
}