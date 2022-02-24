import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as fsPromises from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

var RunAppCenter = async function(args) {
	await exec.exec('appcenter', args);
};

var DistributeAppCenter = async function(args) {
	args.unshift('distribute');
	await RunAppCenter(args);
};

var GetTemporaryFile = async function(text) {
	var path = `${process.env.RUNNER_TEMP}/${uuidv4()}`;
	await fsPromises.writeFile(path, text);
	return path;
};

var TrimQuote = function(text) {
	return text.replace(/^\"|\"$/g, "");
};

async function Run()
{
	try {
		var args = [
			'release',
			'--token', core.getInput('token'),
			'--file', core.getInput('path'),
			'--app', core.getInput('app')
		];

		if (core.getBooleanInput('mandatory')) {
			args.push('--mandatory');
		}

		if (core.getBooleanInput('silent')) {
			args.push('--silent');
		}

		const group = core.getInput('group');
		if (group !== '') {
			args.push('--group');
			args.push(group);
		}

		const store = core.getInput('store')
		if (store !== '') {
			args.push('--store');
			args.push(store);
		}

		if (core.getInput('release_notes') !== '') {
			var releaseNotes = TrimQuote(core.getInput('release_notes'));
			var path = await GetTemporaryFile(releaseNotes);

			args.push('--release-notes-file')
			args.push(path);
		}

		await DistributeAppCenter(args);
	} catch (ex) {
		core.setFailed(ex.message);
	}
}

Run();