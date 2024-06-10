.PHONY: submodule
submodule:
	git submodule update --init --recursive
	cd app && yarn

.PHONY: deploy_hosting
deploy_hosting:
	firebase deploy --only hosting
	
.PHONY: emulator
emulator:
	firebase emulators:start