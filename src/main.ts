import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as github from '@actions/github';
import { ArgumentBuilder } from '@akiojin/argument-builder';
import * as fs from 'fs/promises';
import * as tmp from 'tmp'

async function Run()
{
	try {
		const token = core.getInput('token')
		const file = core.getInput('path')
		const app = core.getInput('app')
		const buildNumber = core.getInput('build-number') || github.context.runNumber.toString()

		if (token === '') {
			throw new Error('token is null.')
		}
		if (file === '') {
			throw new Error('path is null.')
		}
		if (app === '') {
			throw new Error('app is null.')
		}

		const builder = new ArgumentBuilder()
		builder.Append('distribute')
		builder.Append('release')
		builder.Append('--token', token)
		builder.Append('--file', file)
		builder.Append('--app', app)
		builder.Append('--build-number', buildNumber)

		if (core.getBooleanInput('mandatory')) {
			builder.Append('--mandatory')
		}

		if (core.getBooleanInput('silent')) {
			builder.Append('--silent')
		}

		const store = core.getInput('store')
		const group = core.getInput('group');

		if (store === '' && group === '') {
			throw new Error('At least one of store or group must be specified.')
		}

		if (store !== '') {
			builder.Append('--store', store)
		}

		if (group !== '') {
			builder.Append('--group', group)
		}

		if (core.getInput('release_notes') !== '') {
			const text = core.getInput('release_notes').replace(/^\"|\"$/g, "")
			const releaseNotes = tmp.fileSync()
			await fs.writeFile(releaseNotes.name, text)

			builder.Append('--release-notes-file', releaseNotes.name)
		}

		await exec.exec('appcenter', builder.Build())
	} catch (ex: any) {
		core.setFailed(ex.message)
	}
}

Run()
