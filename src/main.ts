import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as github from '@actions/github';
import { CommandBuilder } from '@akiojin/command-builder';
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

		const builder = new CommandBuilder()
		builder.AddCommand('distribute')
		builder.AddCommand('release')
		builder.AddCommand('--token', token)
		builder.AddCommand('--file', file)
		builder.AddCommand('--app', app)
		builder.AddCommand('--build-number', buildNumber)

		if (core.getBooleanInput('mandatory')) {
			builder.AddCommand('--mandatory')
		}

		if (core.getBooleanInput('silent')) {
			builder.AddCommand('--silent')
		}

		const store = core.getInput('store')
		const group = core.getInput('group');

		if (store === '' && group === '') {
			throw new Error('At least one of store or group must be specified.')
		}

		if (store !== '') {
			builder.AddCommand('--store', store)
		}

		if (group !== '') {
			builder.AddCommand('--group', group)
		}

		if (core.getInput('release_notes') !== '') {
			const text = core.getInput('release_notes').replace(/^\"|\"$/g, "")
			const releaseNotes = tmp.fileSync()
			await fs.writeFile(releaseNotes.name, text)

			builder.AddCommand('--release-notes-file', releaseNotes.name)
		}

		await exec.exec('appcenter', builder.Build())
	} catch (ex: any) {
		core.setFailed(ex.message)
	}
}

Run()
