# appcenter-distribute-github-action

![Test][0]

This action uploads artefacts (.apk or .aab or .ipa) to App Center.

## Requirement

You will need to install [appcenter-cli][1]

### Installation

```sh
npm install -g appcenter-cli
```

## Usage

### Simple usage

```yml
- name: Distribute ipa to App Center
  uses: akiojin/appcenter-distribute-github-action@v1
  with:
    token: ${{ secrets.APPCENTER_ACCESS_TOKEN }}
    path: ${{ runner.temp }}/ProductName.ipa
    app: <ownerName>/<appName>
```

### Additional Arguments (1)

```yml
- name: Distribute ipa to App Center
  uses: akiojin/appcenter-distribute-github-action@v1
  with:
    token: ${{ secrets.APPCENTER_ACCESS_TOKEN }}
    build-number: ${{ github.run_number }}
    path: ${{ runner.temp }}/ProductName.ipa
    app: <ownerName>/<appName>
    mandatory: true
    silent: false
    group: 'Tests'
    release_notes: "<Release Notes>"
```

## Additional Arguments (2)

See [action.yml][2] for more details.

| Name            | Required | Type      | Default | Description                                                                                                                                 |
| --------------- | -------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `token`         | `true`   | `string`  |         | API token (App API token or User API token)                                                                                                 |
| `build-number`  | `false`  | `string`  |         | Specify the build number to be set in App Center. Valid only on macOS.                                                                      |
| `path`          | `true`   | `string`  |         | ipa or apk file path                                                                                                                        |
| `app`           | `true`   | `string`  |         | Specify app in the [ownerName]/[appName] format<br>(e.g. Company/Example)                                                                   |
| `mandatory`     | `false`  | `boolean` | `false` | Make the release mandatory for the testers                                                                                                  |
| `silent`        | `false`  | `boolean` | `false` | Do not notify testers of this release                                                                                                       |
| `store`         | `false`  | `string`  | ""      | Store name. Upload release binary and trigger distribution, at least one of store or group must be specified.                               |
| `group`         | `false`  | `string`  | ""      | Comma-separated distribution group names. Upload release binary and trigger distribution, at least one of store or group must be specified. |
| `release_notes` | `false`  | `string`  | ""      | Release notes text (markdown supported, 5000 characters max). Bracketed by double quotation marks.                                          |

## Remarks

![001](001.png)

The build numbers displayed in iOS/Android on the App Center are as follows, respectively.

- iOS: Xcode > General > Identity > `Build`
- Android: `versionCode` [Set app version information](https://developer.android.com/studio/publish/versioning#appversioning)

## License

Any contributions made under this project will be governed by the [MIT License][3].

[0]: https://github.com/akiojin/appcenter-distribute-github-action/actions/workflows/BuildAndTest.yml/badge.svg
[1]: https://github.com/microsoft/appcenter-cli
[2]: https://github.com/akiojin/appcenter-distribute-github-action/blob/main/action.yml
[3]: https://github.com/akiojin/appcenter-distribute-github-action/blob/main/LICENSE