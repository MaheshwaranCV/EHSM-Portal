sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("maheshehsmportal.controller.viewr", {
            onInit: function(){
				var url= "/sap/opu/odata/sap/ZODATA_EHSMP_MAHESH_SRV/";
			var d;
		    var oe = new sap.ui.model.odata.ODataModel(url, true);
		     //var uri = "PoNum='" + plant + "'";
		     //window.console.log(uri);
			oe.read("/ZODATA_EHSMP_RISK_MAHSet?$filter=ImRecno eq '1000001'",{
				context:null,
				urlParameter:null,
				async:false,
				success: function(oData, oResponse)
				{
					d = oData.results;
				}
			});
		var oen = new sap.ui.model.json.JSONModel();
						// created a JSON model
						oen.setData({
					 "results"	: d
						});
						// oTable.setModel(tableModel);
			// set explored app's demo model on this sample
				this.getView().byId("producttable").setModel(oen);
		},
		formatDate: function (sDate) {
			if (sDate) {
				var oDateFormat = sap.ui.core.format.DateFormat.getInstance({
					pattern: "dd-MM-yyyy"
				});
				return oDateFormat.format(new Date(sDate));
			}
			return "";
		},
		onLearnMorePress: function() {
			var learnMoreLink = "https://help.sap.com/docs/EHSM/c2db47abe44e4aa7ab1be93e4c20ae18/fc1b5f9fc2a84a179ed36fc98c9dc384.html";
			window.open(learnMoreLink, "_blank");
		},
		// logout   : function(){
		// 	var oR = sap.ui.core.UIComponent.getRouterFor(this);
		// 	oR.navTo("Routeviewl");
		// },
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
		back   : function(){
			var oR = sap.ui.core.UIComponent.getRouterFor(this);
			oR.navTo("Routeviewd");
		},
		onShowDetailsPress: function (oEvent) {
			var oButton = oEvent.getSource();
			var oRow = oButton.getParent();
			var oContext = oRow.getBindingContext();
		
			var sRecn = oContext.getProperty("Recn");
			var sCrdat =this.formatDate(oContext.getProperty("Crdat"));
			var sCrnam = oContext.getProperty("Crnam");
			var sValfr = this.formatDate(oContext.getProperty("Valfr"));
			var sValto = this.formatDate(oContext.getProperty("Valto"));
			var sUpddat = this.formatDate(oContext.getProperty("Upddat"));
			var sUpdnam = oContext.getProperty("Updnam");
			var sEptype = oContext.getProperty("Eptype");
			var sObjnr = oContext.getProperty("Objnr");
			var sRem = oContext.getProperty("Rem");
			var sAssctrper = oContext.getProperty("Assctrper");
			var sRiskassetnum = oContext.getProperty("Riskassetnum");
			var sRainvresult = oContext.getProperty("Rainvresult");
		
			// Create a message box to display the details
			var sDetails = "RECORD NUMBER : " + sRecn + "\n\n"
						 + "CREATED ON : " + sCrdat + "\n\n"
						 + "CREATED BY : " + sCrnam + "\n\n"
						 + "VALID FROM : " + sValfr + "\n\n"
						 + "VALID TO : " + sValto + "\n\n"
						 + "CHANGED ON : " + sUpddat + "\n\n"
						 + "LAST CHANGED BY : " + sUpdnam + "\n\n"
						 + "AGENT TYPE : " + sEptype + "\n\n"
						 + "OBJECT NUMBER : " + sObjnr + "\n\n"
						 + "NOTE : " + sRem + "\n\n"
						 + "PERSON RESP. : " + sAssctrper + "\n\n"
						 + "ASSESS NO. : " + sRiskassetnum + "\n\n"
						 + "RESULT : " + sRainvresult + "\n\n";
		
			MessageBox.information(sDetails, {
				title: "DETAILS",
				actions: [MessageBox.Action.OK]
			});
		}
    });
});
