const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec');

function Escape(text)
{
	return text + '\"';
}

async function DistributeAppCenter(args)
{
	await exec.exec('appcenter', args);
}

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
			args.push('-R')

			const releaseNotes = core.getInput('release_notes');
			const temp = `${process.env.RUNNER_TEMP}/release_notes.txt`;
			await exec.exec(`/bin/bash -c "echo '${releaseNotes}' | tee ${temp}"`);

			console.log(releaseNotes);
			args.push(releaseNotes);
		}

		await DistributeAppCenter(args);
	} catch (ex) {
		core.setFailed(ex.message);
	}
}

Run();