"use strict";

require("./setup");

var wd = require("wd"),
    _ = require('underscore'),
    serverConfigs = require('./appium-servers');

describe("android install xshare latest version", function () {
  this.timeout(300000);
  var driver;
  var allPassed = true;

  before(function () {
    var serverConfig = process.env.npm_package_config_sauce ?
      serverConfigs.sauce : serverConfigs.local;
    driver = wd.promiseChainRemote(serverConfig);
    require("./logging").configure(driver);

    var desired = process.env.npm_package_config_sauce ?
      _.clone(require("./caps").android18) :
      _.clone(require("./caps").android19);
    desired.app = require("./apps").android_xshare_rel;
    if (process.env.npm_package_config_sauce) {
      desired.name = 'android install xshare latest version';
      desired.tags = ['install'];
    }
    desired.noReset = true;
	desired.fullReset = false;
	desired.appPackage = 'com.share';
	desired.appActivity = 'com.share.MainActivity';
    return driver
      .init(desired)
      .setImplicitWaitTimeout(10000)
      .sleep(10000);
  });

  //after(function () {
  //  return driver
  //    .quit()
  //    .finally(function () {
  //      if (process.env.npm_package_config_sauce) {
  //        return driver.sauceJobStatus(allPassed);
  //      }
  //    });
  //});

  afterEach(function () {
    allPassed = allPassed && this.currentTest.state === 'passed';
  });

  it("check main tabs", function () {
    return driver
      .elementByName('TabCfg').should.eventually.exist  //elementByAccessibilityId()==elementByName()
      .click()
      .sleep(1000)
      .elementByName('TabMap')
      .click()
      .sleep(1000)
      .elementByName('TabUser').should.eventually.exist
      .click()
      .sleep(1000)
      .elementByName('MyListMore').should.eventually.exist
      .click()
      .sleep(1000)
      .elementByName('MenuCreateShare').should.eventually.exist
      .click()
      .sleep(1000)
      .elementByName('FormInfoTitle').should.eventually.exist
      .click()
      .sleep(1000)
      .sendKeys('title1')
      .elementByName('FormInfoPhone').should.eventually.exist
      .click()
      .click()
      .sleep(1000)
      .sendKeys('title1')
      //.back()
      //.elementByAccessibilityId('settings_list:push_listener')
      //.click()
      //.elementByAccessibilityId('settings_list:push_listener')
      //  .should.eventually.exist
	  //.elementByAccessibilityId('settings_list:push_listener_list#1')
	  //  .should.eventually.exist
      //  .should.exists; .should.eventually.exist; .should.eventually.have.length(12); .should.eventually.have.length.above(20);
  });
});
