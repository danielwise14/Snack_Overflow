start:
	npm run dev &
	cd app && npm run start

deploy-gcp:
	cd app && npm run build
	npm run build
	gcloud app deploy
