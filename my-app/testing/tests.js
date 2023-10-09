import webdriver from 'selenium-webdriver';
const driver = new webdriver.Builder()
  .usingServer('http://localhost:9515')  // Port opened by ChromeDriver
  .withCapabilities({
    'goog:chromeOptions': {
      binary: '/Path-to-Your-App.app/Contents/MacOS/Electron'  // Path to your Electron binary
    }
  })
  .forBrowser('chrome')
  .build();

driver.get('http://www.google.com');
driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
driver.findElement(webdriver.By.name('btnG')).click();
driver.wait(() => {
  return driver.getTitle().then((title) => {
    return title === 'webdriver - Google Search';
  });
}, 1000);
driver.quit();
