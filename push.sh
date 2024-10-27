#!/bin/bash

# Function to display error message and exit
function error_exit {
    echo "Error: $1" >&2
    exit 1
}

# Function to handle signals and exit with error message
function signal_exit {
    error_exit "Script terminated by user"
}

# Trap signals
trap signal_exit SIGINT SIGQUIT SIGTERM

# Check if at least 2 arguments and at most 3 arguments are provided
if [ $# -lt 2 ] || [ $# -gt 3 ]; then
    echo "Usage: $0 <branch_name> <commit_message> [author]"
    exit 1
fi


# Assign arguments to variables
branch_name=$1
commit_message=$2
author=$3

# Build the Next.js app
echo "Git Commands running Bike Community App..."

# Trap signals
trap signal_exit SIGINT SIGQUIT SIGTERM

# Initialize a git repository if not already initialized
if [ ! -d .git ]; then
    error_exit "Failed to initialize git repository, exiting..."
fi

git pull origin serverless-main || error_exit "Failed to add files to git, exiting..."

# Add all files
git add . || error_exit "Failed to add files to git, exiting..."


# Commit changes
if [ -n "$author" ]; then
    git commit --author="$author" -m "$commit_message" || error_exit "Failed to commit changes, exiting..."
else
    git commit -m "$commit_message" || error_exit "Failed to commit changes, exiting..."
fi


# Push changes to the provided branch
git push origin $branch_name || error_exit "Failed to push changes to $branch_name, exiting..."


echo "Successfully built and pushed the Next.js app to $branch_name branch."
