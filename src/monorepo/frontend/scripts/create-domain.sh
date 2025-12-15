DOMAIN_NAME=$1

if [ -z "$DOMAIN_NAME" ]; then
  echo "Error: domain-name is required"
  echo "Usage: $0 <domain-name>"
  exit 1
fi

if [ -z "$(git status --porcelain)" ]; then
  echo "Git working directory is clean."
  echo "Put the code to create the domain here."
  # https://chenasraf.github.io/simple-scaffold/
  npx simple-scaffold -c scripts/templates/scaffold.config.js -t scripts/templates/feature  -o  projects/apps/home/domains/ "$DOMAIN_NAME"
else
  echo "Git working directory is dirty (contains changes or untracked files)."
  echo "Do a commit before this because you might screw things up."
  git status --short
fi
