import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as github from '@actions/github';
import * as fs from 'fs/promises';
import * as tmp from 'tmp'

async function Run()
{
	try {
		const token: string = core.getInput('token')
		const file: string = core.getInput('path')
		const app: string = core.getInput('app')

		if (token === '') {
			throw new Error('token is null.')
		}
		if (file === '') {
			throw new Error('path is null.')
		}
		if (app === '') {
			throw new Error('app is null.')
		}

		const args: string[] = [
			'distribute',
			'release',
			'--token', token,
			'--file', file,
			'--app', app,
			'--build-number', github.context.runNumber.toString()
		];

		if (core.getBooleanInput('mandatory')) {
			args.push('--mandatory')
		}

		if (core.getBooleanInput('silent')) {
			args.push('--silent')
		}

		const store: string = core.getInput('store')
		const group: string = core.getInput('group');

		if (store === '' && group === '') {
			throw new Error('At least one of store or group must be specified.')
		}

		if (store !== '') {
			args.push('--store')
			args.push(store)
		}

		if (group !== '') {
			args.push('--group')
			args.push(group)
		}

		if (core.getInput('release_notes') !== '') {
			const text: string = core.getInput('release_notes').replace(/^\"|\"$/g, "")
			const releaseNotes: tmp.FileResult = tmp.fileSync()
			await fs.writeFile(releaseNotes.name, text)

			args.push('--release-notes-file')
			args.push(releaseNotes.name)
		}

		await exec.exec('appcenter', args)
	} catch (ex: any) {
		core.setFailed(ex.message)
	}
}

Run()
