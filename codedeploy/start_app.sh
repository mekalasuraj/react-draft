#!/bin/bash
cd /home/ec2-user/ctemps-app
if [ "$DEPLOYMENT_GROUP_NAME" == "dev" ]
then
    npm run dev
fi
if [ "$DEPLOYMENT_GROUP_NAME" == "prod" ]
then
    npm run prod
fi
