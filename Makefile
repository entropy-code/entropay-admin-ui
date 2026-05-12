.PHONY: setup
setup: ## Install dependencies
	npm install

.PHONY: run
run: ## Start dev server on http://localhost:3000
	npm start

.PHONY: test
test: ## Run tests (non-interactive)
	CI=true npm test
