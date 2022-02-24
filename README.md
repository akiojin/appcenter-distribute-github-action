# appcenter-distribute-github-action
![Test][0]

This action uploads artefacts (.apk or .ipa) to App Center.

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
  uses: akiojin/appcenter-distribute-github-action@v1.1
  with:
    token: ${{ secrets.APPCENTER_ACCESS_TOKEN }}
    path: ${{ runner.temp }}/ProductName.ipa
    app: <ownerName>/<appName>
```

### Additional Arguments
```yml
- name: Distribute ipa to App Center
  uses: akiojin/appcenter-distribute-github-action@v1.1
  with:
    token: ${{ secrets.APPCENTER_ACCESS_TOKEN }}
    path: ${{ runner.temp }}/ProductName.ipa
    app: <ownerName>/<appName>
    mandatory: true
    silent: false
    group: 'Tests'
    release_notes: "<Release Notes>"
```

## Additional Arguments
See [action.yml][2] for more details.

- `token`
  - **Requied**: true
  - **Type**: string
  - **Description**: API token (App API token or User API token)
- `path`
  - **Requied**: true
  - **Type**: string
  - **Description**: ipa or apk file path
- `app`
  - **Requied**: true
  - **Type**: string
  - **Description**: Specify app in the <ownerName>/<appName> format
- `mandatory`
  - **Requied**: false
  - **Type**: boolean
  - **Description**: Make the release mandatory for the testers
  - **Default**: `false`
- `silent`
  - **Requied**: false
  - **Type**: boolean
  - **Description**: Do not notify testers of this release
  - **Default**: `false`
- `store`
  - **Requied**: false
  - **Type**: string
  - **Description**: Store name. Upload release binary and trigger distribution, at least one of store or group must be specified.
  - **Default**: `""`
- `group`
  - **Requied**: false
  - **Type**: string
  - **Description**: Comma-separated distribution group names. Upload release binary and trigger distribution, at least one of store or group must be specified.
  - **Default**: `""`
- `release_notes`
  - **Requied**: false
  - **Type**: string
  - **Description**: Release notes text (markdown supported, 5000 characters max). Bracketed by double quotation marks
  - **Default**: `""`

## License
Any contributions made under this project will be governed by the [MIT License][3].

[0]: https://github.com/akiojin/appcenter-distribute-github-action/actions/workflows/Test.yml/badge.svg
[1]: https://github.com/microsoft/appcenter-cli
[2]: https://github.com/akiojin/appcenter-distribute-github-action/blob/main/action.yml
[3]: https://github.com/akiojin/appcenter-distribute-github-action/blob/main/LICENSE