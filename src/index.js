const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec');

async function DistributeAppCenter(token, path, app, mandatory, silent, distributionGroup, releaseNote)
{
	await exec.exec(`appcenter distribute release publish --token ${token} -f ${path} -a ${app} -n ${github.context.runNumber} ${mandatory} ${silent} ${distributionGroup} ${releaseNote}`);
}

async function Run()
{
	try {
		const mandatory = core.getBooleanInput('mandatory') ? '--mandatory' : '';
		const silent = core.getBooleanInput('silent') ? '--silent' : '';
		const releaseNote = core.getInput('release_notes') !== '' ? '-r \\\"' + core.getInput('release_notes') + '\\\"' : '';
		const group = core.getInput('group') !== '' ? '-g ' + core.getInput('group') : ''

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