import nlf from 'nlf';
import {promisify} from 'node:util';
import ListIt from 'list-it';
import {readFile as fsReadFile} from 'node:fs/promises';
import {join as fsPathJoin} from 'node:path';

export default async function(options) {
	let settings = {
		path: process.cwd(),
		exclude: [],
		excludeSelf: true,
		depth: 1,
		production: true,
		...options,
	};
	settings.exclude = new Set(settings.exclude);

	if (settings.excludeSelf) {
		let ourPkg = JSON.parse(await fsReadFile(fsPathJoin(settings.path, 'package.json')));
		settings.exclude.add(ourPkg.name);
	}

	let pkgs = await promisify(nlf.find)({
		directory: settings.path,
		depth: settings.depth,
		production: settings.production,
	});

	return [
		'Lawyers.txt',
		'-----------',
		'For compliance.',
		'',
		'If you\'re a creator/contributor to one of these packages, thanks!',
		'',
		`Last Updated: ${(new Date).toISOString().substr(0, 10)}`,
		'',
		(new ListIt({
			autoAlign : true,
			headerUnderline: true,
		}))
			.setHeaderRow(['#', 'Package Name', 'License', 'Version', 'Repository'])
			.d(pkgs
				.filter(pkg => !settings.exclude.has(pkg.name))
				.map((pkg, pkgNo) => [
					pkgNo + 1,
					pkg.name,
					pkg.licenseSources.package.sources
						.map(s => s.license)
						.join(' & '),
					pkg.version,
					pkg.repository,
				])
			)
			.toString(),
	].join('\n');
}
