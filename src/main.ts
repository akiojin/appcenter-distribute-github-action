import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as github from '@actions/github';
import { ArgumentBuilder } from '@akiojin/argument-builder';
import * as fs from 'fs/promises';
import * as tmp from 'tmp'

function ReplaceInvalidChars(text: string): string
{
    return text.replace(/\./g, '_').replace(/#/g, '_')
}

async function Run()
{
    try {
        const buildNumber = core.getInput('build-number') || github.context.runNumber.toString()

        const path = core.getInput('path')
        const builder = new ArgumentBuilder()
            .Append('distribute')
            .Append('release')
            .Append('--token', core.getInput('token'))
            .Append('--file', path)
            .Append('--app', core.getInput('app'))

        if (path.endsWith('.pkg') || path.endsWith('.dmg')) {
            builder.Append('--build-number', buildNumber)
            builder.Append('--build-version', buildNumber)
        } else if (path.endsWith('.zip') || path.endsWith('.msi')) {
            builder.Append('--build-version', buildNumber)
        }

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
            builder.Append('--group', ReplaceInvalidChars(core.getInput('group')))
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
