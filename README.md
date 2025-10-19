# zhidongjiaqu-servse

This repository contains CI/CD configuration and coding standards.

## Repository Setup

If you've cloned this repository and need to checkout other existing branches, you may need to configure git to fetch all branches:

```bash
# Configure git to fetch all branches
git config remote.origin.fetch '+refs/heads/*:refs/remotes/origin/*'

# Fetch all branches
git fetch --all

# Now you can checkout any branch
git checkout main
git checkout PR
```

## Available Branches

- **main**: Main branch with CI workflow for Node.js projects
- **PR**: Branch with .NET formatting configuration
- **copilot/checkout-existing-branch**: Feature branch

## Development

This repository includes:
- GitHub Actions workflows for CI and formatting
- EditorConfig for consistent code styling
- .NET build targets for code formatting
