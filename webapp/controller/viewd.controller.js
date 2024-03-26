sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("maheshehsmportal.controller.viewd", {
            onLogin1: function () {
                var oR = sap.ui.core.UIComponent.getRouterFor(this);
                oR.navTo("Routeviewi");
            },
            onLogin2: function () {
                var oR = sap.ui.core.UIComponent.getRouterFor(this);
                oR.navTo("Routeviewr");
            },
            // logout   : function(){
            //     var oR = sap.ui.core.UIComponent.getRouterFor(this);
            //     oR.navTo("Routeviewl");
            // }
            logout: function () {
				var that = this;
				MessageBox.confirm("Are you sure you want to Logout?", {
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					onClose: function (oAction) {
						if (oAction === MessageBox.Action.YES) {
							var oR = sap.ui.core.UIComponent.getRouterFor(that);
							oR.navTo("Routeviewl");
						}
					}
				});
			},
        });
    });
