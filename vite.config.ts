import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';


export default defineConfig(({ command, mode }) => {
    const isProduction = (command === 'build' && mode === 'production');

    return {
        base: (isProduction ? '/common-chords/' : ''),
        baseUrl: (isProduction ? '/common-chords/' : ''),
        plugins: [react(), tsconfigPaths(), vanillaExtractPlugin()],
        build: {
            outDir: 'build-web-deploy',
            cssMinify: 'lightningcss',
        },

    };
});
