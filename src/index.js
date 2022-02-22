const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec');

function Escape(text)
{
	return '"' + text
		.replace(/\\/g, '\\\\')
		.replace(/'/g, "\\'")
		.replace(/"/g, '\\"')
		.replace(/\//g, '\\/')
		.replace(/</g, '\\x3c')
		.replace(/>/g, '\\x3e')
		.replace(/(0x0D)/g, '\r')
		.replace(/(0x0A)/g, '\n') + '"';
}

async function DistributeAppCenter(token, path, app, mandatory, silent, distributionGroup, releaseNote)
{
	console.log(releaseNote);
	await exec.exec(`appcenter distribute release --token ${token} -f ${path} -a ${app} -n ${github.context.runNumber} ${mandatory} ${silent} ${distributionGroup} ${releaseNote}`);
}

async function Run()
{
	try {
		const mandatory = core.getBooleanInput('mandatory') ? '--mandatory' : '';
		const silent = core.getBooleanInput('silent') ? '--silent' : '';
		const releaseNote = core.getInput('release_notes') !== '' ? '-r ' + Escape(core.getInput('release_notes')) : '';
		const group = core.getInput('group') !== '' ? `-g ${core.getInput('group')}` : ''

		await DistributeAppCenter(
			core.getInput('token'),
			core.getInput('path'),
			core.getInput('app'),
			mandatory,
			silent,
			group,
			releaseNote
		);
	} catch (ex) {
		core.setFailed(ex.message);
	}
}

Run();