# This script duplicates the tsconfig.json file in the root of this project
# It removes the "extendedDiagnostics" section of the angular compiler options
# to create a tsconfig.prod.json file for production builds.

cp tsconfig.app.dev.json tsconfig.app.prod.json

jq 'del(.angularCompilerOptions.extendedDiagnostics)' tsconfig.app.prod.json > tsconfig.tmp.json && mv tsconfig.tmp.json tsconfig.app.prod.json
echo "Created tsconfig.app.prod.json without extendedDiagnostics"
