sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("projetonetflix.controller.Inicio", {
        onInit: function () {
            // results
            let resultados = {
                title: []
            }
            let resultadosModel = new JSONModel();
            resultadosModel.setData(resultados);
            let tela = this.getView();
            tela.setModel(resultadosModel, "APINetflix");
        },
        onInicioLinkPress: function() {
            alert("navegar para tela inicial");
        },
        onBuscarDados: function() {
            let searchField = this.byId("idSearchField");
            let filtro = searchField.getValue();
            alert(filtro);
            const settings = {
                async: true,
                crossDomain: true,
                url: 'https://netflix54.p.rapidapi.com/search/?query=' + filtro + '&offset=0&limit_titles=50&limit_suggestions=20&lang=en',
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '0e87b40c0emshbad49d62ecb753dp1a7743jsna45a5aff6c0d',
                    'x-rapidapi-host': 'netflix54.p.rapidapi.com'
                }
            };
            
            $.ajax(settings).done(function (response) {
                console.log(response);
                let tela = this.getView();
                let modelo = tela.getModel("APINetflix");
                let dados = modelo.getData();
                dados.titles = [];
                dados.titles = response.titles;
                modelo.refresh();
            }.bind(this));
        }
    });
});
