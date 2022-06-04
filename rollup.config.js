import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-bundleutils';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
    input: 'server/assets/scripts/main.js',
    output: {
        file: 'public/js/main.bundle.js',
        format: 'esm'
    },
    plugins: [
        nodeResolve(),
        commonjs(),
        json(),
        terser(),
        babel({ babelHelpers: 'bundled' })
    ]
};