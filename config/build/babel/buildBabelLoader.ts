import { BuildOptions } from "../types/types";
import { removeDataTestIdBabelPlugin } from "./removeDataTestIdBabelPlugin";

export function buildBabelLoader({mode}: BuildOptions) {
    const isProd: boolean = mode === 'production';
    const isDev: boolean = mode === 'development';

    const plugins = [];

    if (isProd) {
        plugins.push([
            removeDataTestIdBabelPlugin,
            {
                props:
                [
                    'data-testid',
                ],
            },
        ]);
    }
    return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env', // вне зависимости от платформы обеспечивает поддержку различных преобразований синтаксиса
                    '@babel/preset-typescript',
                    [
                        '@babel/preset-react',
                        {
                            runtime: isProd ? 'classic' : 'automatic',
                        },
                    ],
                ],
                plugins: plugins.length ? plugins : undefined,
            },
        },
    };
}