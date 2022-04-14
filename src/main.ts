import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as github from '@actions/github';
import { ArgumentBuilder } from '@akiojin/argument-builder';
import * as fs from 'fs/promises';
import * as tmp from 'tmp'

async function Run()
{
    try {
        const buildNumber = core.getInput('build-number') || github.context.runNumber.toString()

        const builder = new ArgumentBuilder()
            .Append('distribute')
            .Append('release')
            .Append('--token', core.getInput('token'))
            .Append('--file', core.getInput('path'))
            .Append('--app', core.getInput('app'))
            .Append('--build-number', buildNumber)

        if (!!core.getBooleanInput('mandatory')) {
            builder.Append('--mandatory')
        }

        if (!!core.getBooleanInput('silent')) {
            builder.Append('--silent')
        }

        if (!!core.getInput('store')) {
            builder.Append('--store', core.getInput('store'))
        }

        if (!!core.getInput('group')) {
            builder.Append('--group', core.getInput('group'))
        }

        if (!!core.getInput('release_notes')) {
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
