#!/usr/bin/node

import lawyers from './src/lawyers.js';

console.log(
	await lawyers(process.cwd())
);
