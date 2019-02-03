start:
	pip install -r requirements.txt
	FLASK_APP=main.py flask run &
	cd app && npm run start

deploy-gcp:
	cd app && npm run build
	gcloud app deploy
