import path from 'path'; // подтягиваем path для кросс-платформенности (в linux`е например используются обратные слеши)
import { Configuration } from 'webpack'; // модуль webpack
import {BuildMode, BuildPaths, BuildPlatform, BuildOptions } from './config/build/types/types';
import { buildWebpack } from './config/build/buildWebpack';

export interface EnvVariables {
    mode?: BuildMode;
    analyzer?: boolean;
    port?: number;
    platform?: BuildPlatform;
}

const dir: string = __dirname;

// ES Export system
export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        entry: path.resolve(dir, 'src', 'index.tsx'),
        html: path.resolve(dir, 'public', 'index.html'),
        public: path.resolve(dir, 'public'),
        output: path.resolve(dir, 'build'),
        src: path.resolve(dir, 'src'),
    };
    const buildOptions: BuildOptions = {
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop',
    };

    const config: Configuration = buildWebpack(buildOptions);
    return config;
}

