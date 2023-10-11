import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import { Builder } from 'selenium-webdriver';

describe('Landing Page', function() {
  let driver;

  before(async function() {
    driver = await new Builder()
      .forBrowser('electron')
      .usingServer('http://localhost:9515')  // Electron-Chromedriver’s port
      .build();
  });

  after(async function() {
    await driver.quit();
  });

  it('should disable the Next button if no input is provided', async function() {
    await driver.get('file:///path-to-your/electron-app.html');
    const nextButton = await driver.findElement({ css: 'button' });
    expect(await nextButton.isEnabled()).to.be.false;
  });

  it('should enable the Next button when input is provided', async function() {
    // Simulate file input and port input
    await driver.findElement({ css: 'input[type=text]' }).sendKeys('3000');
    // Assume GetFile triggers a change in fileTree.name when a file is selected
    // Enable the Next button via your logic
    const nextButton = await driver.findElement({ css: 'button' });
    expect(await nextButton.isEnabled()).to.be.true;
  });
});
