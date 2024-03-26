sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
	"sap/m/MessageBox"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter,FilterOperator, MessageBox) {
        "use strict";

        return Controller.extend("maheshehsmportal.controller.viewi", {
            onInit: function(){
				var url= "/sap/opu/odata/sap/ZODATA_EHSMP_MAHESH_SRV/";
				var d;
		    	var oe = new sap.ui.model.odata.ODataModel(url, true);
		     //var uri = "PoNum='" + plant + "'";
		     //window.console.log(uri);
				oe.read("/ZODATA_EHSMP_INCIDENT_MAHSet?$filter=ImPlant eq '0001'",{
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
						oen.setData({"results"	: d	});
						// oTable.setModel(tableModel);
			// set explored app's demo model on this sample
				this.getView().byId("producttable1").setModel(oen);
				this.getView().byId("producttable").setModel(oen); //change by me - tard
		},
		// onsearch : function(){
		// 	var recNo = this.getView().byId("recNo").getValue() || "1000003";
		// 	var Plant = sessionStorage.getItem("plantid")||"1001";
		// 	var url= "/sap/opu/odata/sap/ZODATA_EHSMP_MAHESH_SRV/";
		// 	var d;
		// 	var oe = new sap.ui.model.odata.ODataModel(url, true);
		// 	var aFilters = [];
		// 	var oFilter = new Filter({
		// 		path: "Recn",
		// 		operator: FilterOperator.EQ,
		// 		value1: recNo,
		// 	});
		// 	aFilters.push(oFilter);
		// 	oe.read("/ZODATA_EHSMP_INCIDENT_MAHSet?$filter=ImPlant eq " + "'"+Plant+ "'",{
		// 		context: null,
		// 		urlParameter: null,
		// 		async: false,
		// 		success: function(oData, oResponse) {
		// 			d = oData.results;
		// 		}
		// 	});
		// 	var oen = new sap.ui.model.json.JSONModel();
		// 	oen.setData({
		// 		"results": d
		// 	});
		// 	this.getView().byId("producttable1").setModel(oen);
		// 	var oTable = this.getView().byId("producttable1").getBinding("items").filter(aFilters); 

		// },
		onRecNoFilterChange: function (oEvent) {
            this._applyFilters();
        },

        onSearch: function () {
            this._applyFilters();
        },

        onClearFilter: function () {
            this.getView().byId("recNo").setValue("");
            this._applyFilters();
        },

        _applyFilters: function () {
            var sRecNo = this.getView().byId("recNo").getValue();

            var oTable = this.getView().byId("producttable1");
            var oBinding = oTable.getBinding("items");

            var aFilters = [];

            if (sRecNo !== "") {
                aFilters.push(new Filter({
                    path: "Recn",
                    operator: FilterOperator.Contains,
                    value1: sRecNo
                }));
            }

            oBinding.filter(aFilters);
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
			var learnMoreLink = "https://help.sap.com/docs/SAP_ERP/5a7efdee781c4461be3c20c19ccd0ecd/eb0cc453f57eb44ce10000000a174cb4.html?version=6.02.latest";
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
			var sCrnam = oContext.getProperty("Crnam");
			var sValfr = this.formatDate(oContext.getProperty("Valfr")); // Format the date
			var sValto = this.formatDate(oContext.getProperty("Valto"));
			var sUpddat = this.formatDate(oContext.getProperty("Upddat")); // Format the date
			var sEqunr = oContext.getProperty("Equnr");
			var sEqdesc = oContext.getProperty("Eqdesc");
			var sEvdesc = oContext.getProperty("Evdesc");
			// ... continue extracting other properties ...
		
			// Create a message box to display the details
			var sDetails = "RECORD NUMBER : " + sRecn + "\n\n"
						 + "NAME : " + sCrnam + "\n\n"
						 + "VALID FROM : " + sValfr + "\n\n"
						 + "VALID TO : " + sValto + "\n\n"
						 + "UPDATED DATE : " + sUpddat + "\n\n"
						 + "EQUIPMENT : " + sEqunr + "\n\n"
						 + "OCCURENCE : " + sEqdesc + "\n\n"
						 + "DESCRIPTION : " + sEvdesc + "\n\n";
			// ... add other properties ...
		
			MessageBox.information(sDetails, {
				title: "DETAILS",
				actions: [MessageBox.Action.OK]
			});
		}		
    });
});
