# appcenter-distribute-github-action
This action uploads artefacts (.apk or .ipa) to App Center.

## Usage

### Required
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
    release_notes: <Release Notes>
```

## Additional Arguments
See [action.yml][1] for more details.

## License
Any contributions made under this project will be governed by the [MIT License][2].

[1]: https://github.com/akiojin/appcenter-distribute-github-action/blob/main/action.yml
[2]: https://github.com/akiojin/appcenter-distribute-github-action/blob/main/LICENSE