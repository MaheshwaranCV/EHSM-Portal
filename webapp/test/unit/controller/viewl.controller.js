/*global QUnit*/

sap.ui.define([
	"mahesh_ehsm_portal/controller/viewl.controller"
], function (Controller) {
	"use strict";

	QUnit.module("viewl Controller");

	QUnit.test("I should test the viewl controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
