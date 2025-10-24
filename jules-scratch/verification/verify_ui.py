from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.goto("http://localhost:3000/promotions")
        page.screenshot(path="jules-scratch/verification/promotions.png")

        page.goto("http://localhost:3000/events")
        page.screenshot(path="jules-scratch/verification/events.png")

        browser.close()

run()
