const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  // http://chromedriver.storage.googleapis.com/index.html?path=2.41/
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // await driver.get('http://www.google.com/ncr');
    await driver.get('http://www.wibibi.com/info.php?tid=194');
    // var elm = await driver.findElement(By.tagName('body'));
    // await elm.getText().then(text => console.log(`Text is ${text}`));
    // await elm.getAttribute('innerHTML').then(text => console.log(`Text is ${text}`));
    
    // await driver.findElement(By.tagName('option')).then(r => console.log(r));
    // driver.findElement(By.id('CodeBox1'))
    await driver.findElement(By.id('CodeBox1'))
                .findElement(By.tagName('select')).click();
    await driver.findElement(By.id('CodeBox1'))
                .findElement(By.tagName('select'))
                .findElement(By.tagName('option'));
    // select third option
    await driver.findElement(By.xpath('//*[@id="CodeBox1"]/select/option[3]'))
                .click();
    // debugger;
  } finally {
    await driver.quit();
  }
})();
