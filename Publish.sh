#!/bin/bash

npm version $1
git push
git push --tags
