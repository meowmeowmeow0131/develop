CMD := docker run --rm -ti \
	-v /var/run/docker.sock:/var/run/docker.sock \
    -v ~/app/.aws:/root/.aws \
	-v "$(pwd)/example":/var/opt \
	-w /var/opt \
	-p "3000:3000" \
	develop/aws-sam

help:
	@$(CMD)

validate:
	@$(CMD) validate

local-generate-event:
	@$(CMD) local generate-event api > ./example/event.json

local-invoke: gen-event
	@$(CMD) local invoke -e event.json --docker-volume-basedir "$(pwd)/example"

local-start-api:
	@$(CMD) local start-api --docker-volume-basedir "$(pwd)/example" --host 0.0.0.0

build:
	docker build -t cnadiminti/aws-sam-local .
