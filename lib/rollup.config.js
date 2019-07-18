import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'

import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  external: [ 'crypto' ],
  plugins: [
    external(),
    postcss({
      extensions: [ '.css' ]
    }),
    url(),
    svgr(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
      tsconfig: "tsconfig.rollup.json"
    }),
    json(),
    babel({ 
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react'],
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    }),
    commonjs({
      // If you want to use named exports, this is required, since the rollup does not know how to interpret the 
      // named exports, so when bundling the library, we need specific what named exports we use. 
      // Alternatively you can use "import * as A from 'A-lib'" instead of named exports if you don't want to 
      // add config here.
      // @see https://github.com/rollup/rollup-plugin-commonjs#custom-named-exports
      namedExports: {
        // left-hand side can be an absolute path, a path relative to the current directory, or the name
        // of a module in node_modules.
        'node_modules/react-is/index.js': [ 'isValidElementType', 'isContextConsumer', 'ForwardRef' ],
        'node_modules/lodash/fp.js': [ 'isEmpty', 'isNil', 'curry' ],
        "node_modules/aws-amplify-react/dist/index.js": [ 'Authenticator' ]
      }
    })
  ]
}
