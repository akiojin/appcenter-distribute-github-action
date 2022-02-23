import * as core from '@actions/core';
import * as github from '@actions/github';
import * as exec from '@actions/exec';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

var DistributeAppCenter = async function(args) {
	await exec.exec('appcenter', args);
};

var GetTemporaryFile = async function(text) {
	var path = `${process.env.RUNNER_TEMP}/${uuidv4()}`;

	await fsPromises.writeFile(path, text);

	return path;
};

var GetTemporaryShellScript = async function(text) {
	var src = await GetTemporaryFile(text);
	var dst = `${path}.sh`;

	await fsPromises.rename(src, dst);
	await fsPromises.chmod(dst, fs.constants.R_OK | fs.constants.X_OK);

	return dst;
};

var TrimQuote = function(text) {
	return text.replace(/^\"|\"$/g, "");
};

async function Run()
{
	try {
		var args = [
			'distribute',
			'release',
			'--token', core.getInput('token'),
			'-f', core.getInput('path'),
			'-a', core.getInput('app'),
			'-n', github.context.runNumber
		];

		if (core.getBooleanInput('mandatory')) {
			args.push('--mandatory');
		}

		if (core.getBooleanInput('silent')) {
			args.push('--silent');
		}

		if (core.getInput('group') !== '') {
			args.push('-g');
			args.push(core.getInput('group'));
		}

		if (core.getInput('release_notes') !== '') {
			var releaseNotes = TrimQuote(core.getInput('release_notes'));
			var path = await GetTemporaryFile(releaseNotes);

			args.push('-R')
			args.push(path);
		}

		await DistributeAppCenter(args);
	} catch (ex) {
		core.setFailed(ex.message);
	}
}

Run();