export interface BuildPaths {
    entry: string,
    html: string,
    public: string,
    output: string,
    src: string,
}

// типизируем переменную окружения - преимущество TypeScript`а
export type BuildMode = 'production' | 'development'; // union type (operator)
export type BuildPlatform = 'mobile' | 'desktop';

export interface BuildOptions {
    port: number,
    paths: BuildPaths,
    mode: BuildMode,
    platform: BuildPlatform,
    analyzer?: boolean,
}

