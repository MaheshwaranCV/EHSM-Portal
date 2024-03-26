sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox) {
        "use strict";

        return Controller.extend("maheshehsmportal.controller.viewl", {
            onLogin: function () {

                var uid = this.getView().byId("uid").getValue();
                var pasw = this.getView().byId("pasw").getValue();
                var surl = "/sap/opu/odata/sap/ZODATA_EHSMP_MAHESH_SRV/";
                var oModel = new sap.ui.model.odata.ODataModel(surl, true);
                var uri = "ImUserId='" + uid + "',ImPassword='" + pasw + "'";
                var status;
                window.console.log(uri);
                oModel.read("/ZODATA_EHSMP_LOGIN_MAHSet(" + uri + ")", {

                    context: null,
                    urlParameters: null,
                    async: false,
                    success: function (oData, oResponse) {
                        window.console.log(oData);
                        status = oData["ExReturn"];
                        window.console.log(status);

                    }
                });
                if (status === "TRUE") {
                    var oR = sap.ui.core.UIComponent.getRouterFor(this);
                    oR.navTo("Routeviewd");
                }
                else {
                    MessageBox.alert("Enter The Valid Credentials");
                }

            }
        });
    });
