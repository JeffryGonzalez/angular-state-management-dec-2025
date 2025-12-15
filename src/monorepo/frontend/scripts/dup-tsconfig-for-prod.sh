# This script duplicates the tsconfig.json file in the root of this project
# It removes the "extendedDiagnostics" section of the angular compiler options
# to create a tsconfig.prod.json file for production builds.

cp projects/apps/home/tsconfig.app.dev.json projects/apps/home/tsconfig.app.prod.json

jq 'del(.angularCompilerOptions.extendedDiagnostics)' projects/apps/home/tsconfig.app.prod.json > projects/apps/home/tsconfig.tmp.json && mv projects/apps/home/tsconfig.tmp.json projects/apps/home/tsconfig.app.prod.json
echo "Created tsconfig.app.prod.json without extendedDiagnostics"
