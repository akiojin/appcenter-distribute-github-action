const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec');

async function DistributeAppCenter(artifactPath, appSlug, distributionGroup)
{
	await exec.exec(`appcenter distribute groups publish -n ${github.context.runNumber} -f ${artifactPath} -a ${appSlug} -g ${distributionGroup}`);
}

async function DistributeAppCenter(artifactPath, appSlug, distributionGroup, releaseNote)
{
	await exec.exec(`appcenter distribute groups publish -n ${github.context.runNumber} -f ${artifactPath} -a ${appSlug} -g ${distributionGroup} -r ${releaseNote}`);
}

async function Execute()
{
	try {
		var releaseNote = core.getInput('release_note');

		core.exportVariable('APPCENTER_ACCESS_TOKEN', core.getInput('appcenter_access_token'));

		if (releaseNote == '') {
			await DistributeAppCenter(
				core.getInput('artifact_path'),
				core.getInput('app_slug'),
				core.getInput('distribution_group'),
				releaseNote
			);
		} else {
			await DistributeAppCenter(
				core.getInput('artifact_path'),
				core.getInput('app_slug'),
				core.getInput('distribution_group')
			);
		}
	} catch (ex) {
		core.setFailed(ex.message);
	}
}

Execute();