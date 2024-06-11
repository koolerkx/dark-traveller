include .env

.PHONY: deploy_functions
deploy_functions:
	yarn deploy

.PHONY: config_functions
config_functions:
	firebase functions:config:set private.key="${PRIVATE_KEY}" project.id="${PROJECT_ID}" client.email="${CLIENT_EMAIL}"
