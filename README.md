# appcenter-distribute-github-action
This action uploads artefacts (.apk or .ipa) to App Center.

## Requirement
You will need to install [appcenter-cli][0]

### Installation
```sh
npm install -g appcenter-cli
```


## Usage

### Simple usage
```yml
- name: Distribute ipa to App Center
  uses: akiojin/appcenter-distribute-github-action@v0.1
  with:
    token: ${{ secrets.APPCENTER_ACCESS_TOKEN }}
    path: ${{ runner.temp }}/ProductName.ipa
    app: <ownerName>/<appName>
```

### Additional Arguments
```yml
- name: Distribute ipa to App Center
  uses: akiojin/appcenter-distribute-github-action@v0.1
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
See [action.yml][1] for more details.

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
- `group`
  - **Requied**: false
  - **Type**: string
  - **Description**: Comma-separated distribution group names
  - **Default**: `""`
- `release_notes`
  - **Requied**: false
  - **Type**: string
  - **Description**: Release notes text (5000 characters max). Bracketed by double quotation marks. 
  - **Default**: `""`

## License
Any contributions made under this project will be governed by the [MIT License][2].

[0]: https://github.com/microsoft/appcenter-cli
[1]: https://github.com/akiojin/appcenter-distribute-github-action/blob/main/action.yml
[2]: https://github.com/akiojin/appcenter-distribute-github-action/blob/main/LICENSE