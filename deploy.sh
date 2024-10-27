#!/bin/bash

# Usage function to display how to use the script
usage() {
  echo "Usage: $0 [-p profile] [-s stage] [-r region]"
  echo "  -p: AWS profile to use for deployment"
  echo "  -s: Stage (e.g., dev, prod)"
  echo "  -r: AWS region (e.g., ap-south-1)"
  exit 1
}

# Default values
PROFILE="default"
STAGE="dev"
REGION="ap-south-1"

# Parse command-line arguments
while getopts ":p:s:r:" opt; do
  case ${opt} in
    p )
      PROFILE=$OPTARG
      ;;
    s )
      STAGE=$OPTARG
      ;;
    r )
      REGION=$OPTARG
      ;;
    \? )
      echo "Invalid option: -$OPTARG" 1>&2
      usage
      ;;
    : )
      echo "Invalid option: -$OPTARG requires an argument" 1>&2
      usage
      ;;
  esac
done

# Check if serverless is installed
if ! command -v npx &> /dev/null
then
    echo "npx could not be found, please install Node.js and npm"
    exit 1
fi

# Print the deployment configuration
echo "Deploying with the following configuration:"
echo "  AWS Profile: $PROFILE"
echo "  Stage: $STAGE"
echo "  Region: $REGION"

# Run the deployment command
npm run build
cp -r node_modules dist/node_modules
AWS_PROFILE=$PROFILE npx serverless deploy --stage $STAGE --region $REGION
