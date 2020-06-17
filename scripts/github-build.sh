#!/usr/bin/env bash
set -ex # print all commands, and exit on first error

lint() {
  local YOUR_BRANCH=${1}
  local TARGET_BRANCH=${2}
  ##
  # diff-filter is set to exclude deleted files
  # sed is used to pipe the value to a variable
  # without the sed, it prints result in a new screen
  ##

  echo "======================= Running ESLint ==================================="
  ##
  #
  # xargs is used to run ESLint in parallel across the list of files
  # -- denotes end of option flag
  # If a new `-` appears after this, the command would treat it as a string and not a new option
  ##
  git diff ${YOUR_BRANCH}...${TARGET_BRANCH} --name-only --diff-filter=ACMRTUB "*.js" "*.jsx" "*.ts" "*.tsx" | sed 's| |\\ |g' | xargs ./node_modules/.bin/eslint --quiet --
  echo "=========================================================================="
}

## 
# BASE_REF points to branch where the PR is pointed to
# for example, `origin/master` or `origin/release`
# HEAD_REF points to the branch developer is pushing commits to
# for example, `origin/feature/update-models` or `origin/fix/login`
##
lint ${1} ${2}