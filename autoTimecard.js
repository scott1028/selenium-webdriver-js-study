const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  // http://chromedriver.storage.googleapis.com/index.html?path=2.41/
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // [Start]
    await driver.get('http://127.0.0.1:8080/timecard.html');

    // [Detect If Document Ready]
    // var val = await driver.executeScript(cb => {  // no cb support premise .executeScript
    var val = await driver.executeAsyncScript(cb => {
      $(document).ready(() => {
        console.log(`[Document] ${document.readyState}`);
        cb(100);
      });
    }).then(data => `[Document][Ready]${data}`); console.log(val);

    // Click some DOM
    await driver.findElement(By.id('type')).click();
    await driver.findElement(By.xpath('//*[@id="type"]/option[3]')).click();
    await driver.findElement(By.id('type')).click();
    await driver.findElement(By.xpath('//*[@id="modal"]')).click();

    await driver.getAllWindowHandles().then(async h => {
      // change to new window
      await driver.switchTo().window(h.pop());
      await driver.findElement(By.tagName('body')).getAttribute('innerHTML').then(text => console.log(`Text is ${text}`));
      await driver.findElement(By.xpath('//*[@id="desc"]')).sendKeys(` - ${new Date().getTime()}`);
      await driver.findElement(By.xpath('//*[@id="desc"]')).clear();
      await driver.findElement(By.xpath('//*[@id="desc"]')).sendKeys(`Get Now Time => ${new Date().getTime()}`);
      await driver.findElement(By.xpath('//*[@id="closeBtn"]')).click();

      // back to original window
      await driver.switchTo().window(h.pop());
      await driver.findElement(By.xpath('//*[@id="myForm"]/table/tbody/tr[1]/td/input')).sendKeys('myUsername');
      await driver.findElement(By.xpath('//*[@id="myForm"]/table/tbody/tr[2]/td/input')).sendKeys('myPassword');
      await driver.findElement(By.xpath('//*[@id="myForm"]/table/tbody/tr[4]/th[2]/input')).click();
      await driver.findElement(By.xpath('//*[@id="myForm"]/table/tbody/tr[6]/td/button')).click();
    });
  } finally {
    // await new Promise(res => setTimeout(res, 2000));
    // await driver.quit();  // close all browser
    console.log(`[DEBUG] All Test Done!`);
  }
})();
