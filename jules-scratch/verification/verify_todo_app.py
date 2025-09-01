from playwright.sync_api import sync_playwright, Page, expect

def main():
    print("Starting Playwright script")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        print("Browser launched")

        # 1. Navigate to the app
        page.goto("http://localhost:3000")
        print("Navigated to localhost:3000")

        # 2. Add a new to-do item
        page.get_by_placeholder("Add a new to-do").fill("Learn Playwright")
        page.get_by_role("button", name="Add").click()
        print("Added 'Learn Playwright'")

        # 3. Add another to-do item
        page.get_by_placeholder("Add a new to-do").fill("Write a test")
        page.get_by_role("button", name="Add").click()
        print("Added 'Write a test'")

        # 4. Mark the first to-do item as complete
        page.locator("li:has-text('Learn Playwright')").get_by_role("checkbox").check()
        print("Marked 'Learn Playwright' as complete")

        # 5. Delete the second to-do item
        page.locator("li:has-text('Write a test')").get_by_role("button", name="Delete").click()
        print("Deleted 'Write a test'")

        # Assert that the deleted item is not present
        expect(page.get_by_text("Write a test")).not_to_be_visible()
        print("Asserted that 'Write a test' is not visible")

        # 6. Take a screenshot
        screenshot_path = "jules-scratch/verification/verification.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot taken and saved to {screenshot_path}")

        browser.close()
        print("Browser closed")

if __name__ == "__main__":
    main()
