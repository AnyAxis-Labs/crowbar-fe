#!/bin/sh
set -e

BRANCH="$1"

if [ -z "$BRANCH" ]; then
  echo "###############[Warning]###############"
  echo "You should give branch name or commit hash as an argument,\notherwise it will use 'main' branch as a default\n"
  echo "# Usage"
  echo "$ npm run update:sc main";
  echo "$ npm run update:sc ee2902d\n";
  echo "######################################"
  BRANCH="main"
fi

echo "Checkout branch : $BRANCH"

rm -rf temp
mkdir temp
cd temp

git clone git@anyax.is:AnyAxis-Labs/tax-farm-sc.git .
git checkout "$BRANCH"

echo "Copying smart contracts..."
# copy all json file in out/ folder, recursively, only accept .json files, copy to src/smart-contracts
find out/ -type f -name "*.json" -exec cp {} ../src/smart-contracts/abi \;

git rev-parse HEAD > ../COMMIT_ID

cd ..
rm -rf temp
