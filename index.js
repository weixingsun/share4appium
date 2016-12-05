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
	  .sleep(5000);
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

  it("check my messages", function () {
    return driver
      .elementByAccessibilityId('notify_list:more')
      .click()
      .elementByAccessibilityId('notify_list:more:my')
        .should.eventually.exist
      .back()
      .elementByAccessibilityId('main_icon_settings')
      .click()
      .elementByAccessibilityId('settings_list:push_listener')
      .click()
      .elementByAccessibilityId('settings_list:push_listener')
	    .should.eventually.exist
	  .elementByAccessibilityId('settings_list:push_listener_list#1')
	    .should.eventually.exist
      //  .should.exists; .should.eventually.exist; .should.eventually.have.length(12); .should.eventually.have.length.above(20);
  });
});
