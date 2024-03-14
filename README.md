@MomsFriendlyDevCo/Lawyers.txt
==============================
Simple [Supabase like](https://supabase.com/lawyers.txt) lawyers.txt generation for easy inclusion within projects.

This project exports a single string which can be glued into static files when generated.

It can also be run as `lawyers` from any project its installed in:

```javascript
import {dirName} from '@momsfriendlydevco/es6'; // Or work out where we are somehow
import lawyers from '@momsfriendlydevco/lawyers.txt';

let lawyersSpeil = await lawyers({
    path: dirName(),
});

// ...Do something with the string
```


Auto generation within a Vite project
-------------------------------------
The following is an example of how to generate + output a `lawyers.txt` file using [vite-plugin-inject](https://www.npmjs.com/package/vite-plugin-inject) NPM:

```javascript
// Within vite.config.js
import {dirName} from '@momsfriendlydevco/es6';
import pluginInject from 'vite-plugin-inject';
import lawyers from '@momsfriendlydevco/lawyers.txt';

export default {
    plugins: [
        pluginInject([
            /* ... other plugin config ... */
            {
                name: 'lawyers.txt',
                async content() {
                    return await lawyer({
                        path: dirName(),
                    });
                },
            },
        ])
    ],
}
```


Example Output
--------------

```
Lawyers.txt
-----------
For compliance.

If you're a creator/contributor to one of these packages, thanks!

Last Updated: 2024-03-14

# Package Name License Version                 Repository
- ------------ ------- ----------------------- ----------------------------------------
1 list-it      MIT     1.3.12                  https://github.com/takamin/list-it
2 nlf          MIT     2.1.1                   http://github.com/iandotkelly/nlf
3 node-getopt  MIT     0.3.3-forked-by-takamin https://github.com/jiangmiao/node-getopt
```


API
===

lawyers(options)
----------------
This project exports a single function which takes the root path to scan from and some additional options.
It returns a promise which resolves to a String when generation has completed.

Supported options are:

| Option        | Type            | Default         | Description                                    |
|---------------|-----------------|-----------------|------------------------------------------------|
| `path`        | String          | `process.cwd()` | The path to start scanning from                |
| `exclude`     | Array<String> ` | `[]`            | Array of packages to exclude, by name          |
| `excludeSelf` | `true`          | `true`          | Exclude the named package in the starting path |
| `depth`       | `Number`        | `1`             | Package depth to scan                          |
| `production`  | `Boolean`       | `true`          | Only show production level packages            |
