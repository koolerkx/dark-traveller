.PHONY: submodule
submodule:
	git submodule update --init --recursive
	cd app && yarn
