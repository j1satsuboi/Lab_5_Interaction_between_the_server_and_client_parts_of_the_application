import React from 'react';
import './App.css';

class App extends React.Component {
  render () {
    let isRequestGet = false;
    let isServiceGet = false;

    async function addNewClient() {
        const clientName = document.getElementById("clientName").value;
        const clientSurname = document.getElementById("clientSurname").value;

        let addClient = {
          "name": clientName,
          "surname": clientSurname
        };
        addClient = JSON.stringify(addClient);

        await fetch("http://localhost:3001/client", {
          method: 'POST',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
          body: addClient
        })

        window.location.reload();
    }

    async function deleteClient(id) {
      id = JSON.stringify(id);
      await fetch("http://localhost:3001/client/" + id, {
        method: 'DELETE'
      })
      window.location.reload();
    }

    async function updateClient(id) {
      id = JSON.stringify(id);
      let newName = document.getElementById(`clientName${id}`).value;
      let newSurname = document.getElementById(`clientSurname${id}`).value;

      let body = {
        "id": id,
        "name": newName,
        "surname": newSurname
      }
      body = JSON.stringify(body);

      await fetch("http://localhost:3001/client", {
        method: 'PUT',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: body
      })
      window.location.reload();
    }

    async function addRequest(id, name, surname) {
      let body = {
        "title": document.getElementById("inputTitle").value,
        "description": document.getElementById("inputDescription").value,
        "client_id": id
      }
      body = JSON.stringify(body);

      await fetch("http://localhost:3001/request", {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: body
      })

      getRequests(id, name, surname);
    }

    async function deleteRequest(id, clientId, clientName, clientSurname) {
      id = JSON.stringify(id);
      await fetch("http://localhost:3001/request/" + id, {
        method: 'DELETE'
      })
      getRequests(clientId, clientName, clientSurname);
    }

    async function updateRequest(id, clientId, clientName, clientSurname) {
      id = JSON.stringify(id);
      let newTitle = document.getElementById(`requestTitle${clientId}${id}`).value;
      let newDescription = document.getElementById(`requestDescription${clientId}${id}`).value;

      let body = {
        "id": id,
        "title": newTitle,
        "description": newDescription,
        "client_id": clientId
      }
      body = JSON.stringify(body);

      await fetch("http://localhost:3001/request", {
        method: 'PUT',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: body
      })
      getRequests(clientId, clientName, clientSurname);
    }

    async function addService(clientId, clientName, clientSurname, requestId, requestTitle, requestDescription) {
      const title = document.getElementById("serviceTitle").value;
      const description = document.getElementById("serviceDescription").value;

      let body = {
        "title": title,
        "description": description,
        "request_id": requestId
      }
      body = JSON.stringify(body);
      await fetch("http://localhost:3001/service", {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: body
      })
      getServices(clientId, clientName, clientSurname, requestId, requestTitle, requestDescription);
    }

    async function deleteService(clientId, clientName, clientSurname, requestId, requestTitle, requestDescription, id) {
      id = JSON.stringify(id);
      await fetch("http://localhost:3001/service/" + id, {
        method: 'DELETE'
      })
      getServices(clientId, clientName, clientSurname, requestId, requestTitle, requestDescription);
    }

    async function updateService(clientId, clientName, clientSurname, requestId, requestTitle, requestDescription, id) {
      id = JSON.stringify(id);
      let newTitle = document.getElementById(`serviceTitle${requestId}${id}`).value;
      let newDescription = document.getElementById(`serviceDescription${requestId}${id}`).value;

      let body = {
        "id": id,
        "title": newTitle,
        "description": newDescription,
        "request_id": requestId
      }
      body = JSON.stringify(body);

      await fetch("http://localhost:3001/service", {
        method: 'PUT',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: body
      })
      getServices(clientId, clientName, clientSurname, requestId, requestTitle, requestDescription);
    }

    async function getServices(clientId, clientName, clientSurname, requestId, requestTitle, requestDescription) {
      if (!isServiceGet) {
      document.getElementById("createRequestDiv").remove();
      } else {
        document.getElementById("createServiceDiv").remove();
      }
      isServiceGet = true;
      
      const mainDiv = document.getElementById("mainDiv");
      const createServiceDiv = document.createElement("div")
      createServiceDiv.id = "createServiceDiv";
      const buttonBack = document.createElement("input");
      buttonBack.type = "button";
      buttonBack.value = "Вернуться назад";
      buttonBack.onclick = function() {
        document.getElementById("createServiceDiv").remove();
        getRequests(clientId, clientName, clientSurname);
      }
      createServiceDiv.appendChild(buttonBack);
      const h1 = document.createElement("h1");
      h1.textContent = "Добавить услугу";
      createServiceDiv.appendChild(h1);

      let cleintTable = document.createElement("table");
      let clientThead = document.createElement("thead");
      let clientTbody = document.createElement("tbody");
      cleintTable.appendChild(clientThead);
      cleintTable.appendChild(clientTbody);
      let clientRow = document.createElement("tr");
      let clientHeading_1 = document.createElement("th");
      let clientHeading_2 = document.createElement("th");
      let clientHeading_3 = document.createElement("th");
      clientHeading_1.innerHTML = "ID клиента";
      clientHeading_2.innerHTML = "Имя клиента";
      clientHeading_3.innerHTML = "Фамилия клиента";
      clientRow.appendChild(clientHeading_1);
      clientRow.appendChild(clientHeading_2);
      clientRow.appendChild(clientHeading_3);
      clientThead.appendChild(clientRow);

      let client_data_row = document.createElement("tr");
      let client_rowData1 = document.createElement("td");
      client_rowData1.innerHTML = clientId;
      let client_rowData2 = document.createElement("td");
      client_rowData2.innerHTML = clientName;
      let client_rowData3 = document.createElement("td");
      client_rowData3.innerHTML = clientSurname;

      client_data_row.appendChild(client_rowData1);
      client_data_row.appendChild(client_rowData2);
      client_data_row.appendChild(client_rowData3);
      clientTbody.appendChild(client_data_row);
      createServiceDiv.appendChild(cleintTable);

      let table = document.createElement("table");
      let thead = document.createElement("thead");
      let tbody = document.createElement("tbody");

      table.appendChild(thead);
      table.appendChild(tbody);

      let row = document.createElement("tr");
      let heading_1 = document.createElement("th");
      let heading_2 = document.createElement("th");
      let heading_3 = document.createElement("th");

      heading_1.innerHTML = "ID заявки";
      heading_2.innerHTML = "Название заявки";
      heading_3.innerHTML = "Описание заявки";

      row.appendChild(heading_1);
      row.appendChild(heading_2);
      row.appendChild(heading_3);
      thead.appendChild(row);

      let rowR = document.createElement("tr");
      let rowData1 = document.createElement("td");
      rowData1.innerHTML = requestId;

      let rowData2 = document.createElement("td");
      rowData2.innerHTML = requestTitle;

      let rowData3 = document.createElement("td");
      rowData3.innerHTML = requestDescription;

      rowR.appendChild(rowData1);
      rowR.appendChild(rowData2);
      rowR.appendChild(rowData3);
      tbody.appendChild(rowR);
      createServiceDiv.appendChild(document.createElement("br"));
      createServiceDiv.appendChild(table);

      const serviceTitleLabel = document.createElement("label");
      serviceTitleLabel.textContent = "Название: ";
      const serviceTitle = document.createElement("input");
      serviceTitle.id = "serviceTitle";
      serviceTitle.type = "text";
      serviceTitle.placeholder = "Покраска стен";

      const serviceDescriptionLabel = document.createElement("label");
      serviceDescriptionLabel.textContent = "Описание: ";
      const serviceDesciption = document.createElement("input");
      serviceDesciption.id = "serviceDescription";
      serviceDesciption.type = "text";
      serviceDesciption.placeholder = "В светло-зеленых тонах";

      createServiceDiv.appendChild(document.createElement("br"));
      createServiceDiv.appendChild(serviceTitleLabel);
      createServiceDiv.appendChild(serviceTitle);
      createServiceDiv.appendChild(document.createElement("br"));
      createServiceDiv.appendChild(serviceDescriptionLabel);
      createServiceDiv.appendChild(serviceDesciption);

      const addServiceB = document.createElement("input");
      addServiceB.id = "addServiceB";
      addServiceB.type = "button";
      addServiceB.value = "Добавить";
      addServiceB.onclick = function() {
        addService(clientId, clientName, clientSurname, requestId, requestTitle, requestDescription);
      }
      createServiceDiv.appendChild(document.createElement("br"));
      createServiceDiv.appendChild(addServiceB);

      let servicesResponse = await fetch(`http://localhost:3001/service/${requestId}`);
      let servicesData = await servicesResponse.json();

      if(servicesData.length > 0) {
        let table = document.createElement("table");
        let thead = document.createElement("thead");
        let tbody = document.createElement("tbody");

        table.appendChild(thead);
        table.appendChild(tbody);

        let row = document.createElement("tr");
        let heading_1 = document.createElement("th");
        let heading_2 = document.createElement("th");
        let heading_3 = document.createElement("th");

        heading_1.innerHTML = "ID услуги";
        heading_2.innerHTML = "Название услуги";
        heading_3.innerHTML = "Описание услуги";

        row.appendChild(heading_1);
        row.appendChild(heading_2);
        row.appendChild(heading_3);
        thead.appendChild(row);

        servicesData.forEach(services => {
          let row = document.createElement("tr");
          let rowData1 = document.createElement("td");
          rowData1.innerHTML = services.id;

          let rowData2 = document.createElement("td");
          let rowInput2 = document.createElement("input");
          rowInput2.id = `serviceTitle${requestId}${services.id}`;
          rowInput2.value = services.title;
          rowData2.appendChild(rowInput2);

          let rowData3 = document.createElement("td");
          let rowInput3 = document.createElement("input");
          rowInput3.id = `serviceDescription${requestId}${services.id}`;
          rowInput3.value = services.description;
          rowData3.appendChild(rowInput3);

          let deleteServiceB = document.createElement("input");
          deleteServiceB.id = `deleteService${services.request_id}${services.id}`;
          deleteServiceB.type = "button";
          deleteServiceB.value = "Удалить услугу";
          deleteServiceB.onclick = function() {
            deleteService(clientId, clientName, clientSurname, requestId, requestTitle, requestDescription, services.id);
          }

          let updateServiceB = document.createElement("input");
          updateServiceB.id = `updateService${services.request_id}${services.id}`;
          updateServiceB.type = "button";
          updateServiceB.value = "Сохранить изменения";
          updateServiceB.onclick = function() {
            updateService(clientId, clientName, clientSurname, requestId, requestTitle, requestDescription, services.id);
          }

          row.appendChild(rowData1);
          row.appendChild(rowData2);
          row.appendChild(rowData3);
          row.appendChild(updateServiceB);
          row.appendChild(document.createElement("br"));
          row.appendChild(deleteServiceB);
          tbody.appendChild(row);
        });
        createServiceDiv.appendChild(document.createElement("br"));
        createServiceDiv.appendChild(document.createElement("br"));
        createServiceDiv.appendChild(table);
      }

      mainDiv.appendChild(createServiceDiv);
    }


    async function getRequests(id, name, surname) {
      if(!isServiceGet) {
        if(isRequestGet) {
          document.getElementById("createRequestDiv").remove();
        } else {
          document.getElementById("createClientDiv").remove();
        }
        isRequestGet = true;
      }

      const mainDiv = document.getElementById("mainDiv");
      const createRequestDiv = document.createElement("div");
      createRequestDiv.id = "createRequestDiv";
      const buttonBack = document.createElement("input");
      buttonBack.type = "button";
      buttonBack.value = "Вернуться назад";
      buttonBack.onclick = function() {
        window.location.reload();
      }
      createRequestDiv.appendChild(buttonBack);
      const h1 = document.createElement("h1");
      h1.textContent = "Добавить заявку";
      createRequestDiv.appendChild(h1);

      let cleintTable = document.createElement("table");
      let clientThead = document.createElement("thead");
      let clientTbody = document.createElement("tbody");
      cleintTable.appendChild(clientThead);
      cleintTable.appendChild(clientTbody);
      let clientRow = document.createElement("tr");
      let clientHeading_1 = document.createElement("th");
      let clientHeading_2 = document.createElement("th");
      let clientHeading_3 = document.createElement("th");
      clientHeading_1.innerHTML = "ID клиента";
      clientHeading_2.innerHTML = "Имя клиента";
      clientHeading_3.innerHTML = "Фамилия клиента";
      clientRow.appendChild(clientHeading_1);
      clientRow.appendChild(clientHeading_2);
      clientRow.appendChild(clientHeading_3);
      clientThead.appendChild(clientRow);

      let client_data_row = document.createElement("tr");
      let client_rowData1 = document.createElement("td");
      client_rowData1.innerHTML = id;
      let client_rowData2 = document.createElement("td");
      client_rowData2.innerHTML = name;
      let client_rowData3 = document.createElement("td");
      client_rowData3.innerHTML = surname;

      client_data_row.appendChild(client_rowData1);
      client_data_row.appendChild(client_rowData2);
      client_data_row.appendChild(client_rowData3);
      clientTbody.appendChild(client_data_row);
      createRequestDiv.appendChild(cleintTable);

      const titleLabel = document.createElement("label");
      const descriptionLabel = document.createElement("label");
      titleLabel.textContent = "Название: ";
      descriptionLabel.textContent = "Описание: "

      const inputTitle = document.createElement("input");
      inputTitle.id = "inputTitle";
      inputTitle.type = "text";
      inputTitle.placeholder = "Ремонт квартиры";
      const inputDescription = document.createElement("input");
      inputDescription.id = "inputDescription";
      inputDescription.type = "text";
      inputDescription.placeholder = "Полная отделка квартиры";

      const addRequestButton = document.createElement("input");
      addRequestButton.type = "button";
      addRequestButton.value = "Добавить"
      addRequestButton.onclick = function() {
        addRequest(id, name, surname);
      }

      createRequestDiv.appendChild(document.createElement("br"));
      createRequestDiv.appendChild(titleLabel);
      createRequestDiv.appendChild(inputTitle);
      createRequestDiv.appendChild(document.createElement("br"));
      createRequestDiv.appendChild(descriptionLabel);
      createRequestDiv.appendChild(inputDescription);
      createRequestDiv.appendChild(document.createElement("br"));
      createRequestDiv.appendChild(addRequestButton);
      
      let requestsResponse = await fetch(`http://localhost:3001/request/${id}`);
      let requestsData = await requestsResponse.json();

      if(requestsData.length > 0) {
        let table = document.createElement("table");
        let thead = document.createElement("thead");
        let tbody = document.createElement("tbody");

        table.appendChild(thead);
        table.appendChild(tbody);

        let row = document.createElement("tr");
        let heading_1 = document.createElement("th");
        let heading_2 = document.createElement("th");
        let heading_3 = document.createElement("th");
        let heading_4 = document.createElement("th");

        heading_1.innerHTML = "ID заявки";
        heading_2.innerHTML = "Название заявки";
        heading_3.innerHTML = "Описание заявки";
        heading_4.innerHTML = "Оказываемые услуги";

        row.appendChild(heading_1);
        row.appendChild(heading_2);
        row.appendChild(heading_3);
        row.appendChild(heading_4);
        thead.appendChild(row);

        requestsData.forEach(request => {
          let row = document.createElement("tr");
          let rowData1 = document.createElement("td");
          rowData1.innerHTML = request.id;

          let rowData2 = document.createElement("td");
          let rowInput2 = document.createElement("input");
          rowInput2.id = `requestTitle${id}${request.id}`;
          rowInput2.value = request.title;
          rowData2.appendChild(rowInput2);

          let rowData3 = document.createElement("td");
          let rowInput3 = document.createElement("input");
          rowInput3.id = `requestDescription${id}${request.id}`;
          rowInput3.value = request.description;
          rowData3.appendChild(rowInput3);

          let rowData4 = document.createElement("td");
          let getServicesB = document.createElement("input");
          getServicesB.id = `getServices${id}${request.id}`;
          getServicesB.type = "button";
          getServicesB.value = "Открыть меню услуг";
          getServicesB.onclick = function() {
            getServices(id, name, surname, request.id, request.title, request.description);
          }
          rowData4.appendChild(getServicesB);

          let deleteRequestB = document.createElement("input");
          deleteRequestB.id = `deleteRequest${request.client_id}${request.id}`;
          deleteRequestB.type = "button";
          deleteRequestB.value = "Удалить заявку";
          deleteRequestB.onclick = function() {
            deleteRequest(request.id, id, name, surname);
          }

          let updateRequestB = document.createElement("input");
          updateRequestB.id = `updateRequest${request.client_id}${request.id}`;
          updateRequestB.type = "button";
          updateRequestB.value = "Сохранить изменения";
          updateRequestB.onclick = function() {
            updateRequest(request.id, id, name, surname);
          }

          row.appendChild(rowData1);
          row.appendChild(rowData2);
          row.appendChild(rowData3);
          row.appendChild(rowData4);
          row.appendChild(updateRequestB);
          row.appendChild(document.createElement("br"));
          row.appendChild(deleteRequestB);
          tbody.appendChild(row);
        });
        createRequestDiv.appendChild(document.createElement("br"));
        createRequestDiv.appendChild(document.createElement("br"));
        createRequestDiv.appendChild(table);
      }
      mainDiv.appendChild(createRequestDiv);
    }

    async function getClients() {
      let clientsResponse = await fetch("http://localhost:3001/client");
      let clientsData = await clientsResponse.json();

      if(clientsData.length > 0) {
        let div = document.getElementById("getClients");

        let table = document.createElement("table");
        let thead = document.createElement("thead");
        let tbody = document.createElement("tbody");
            
        table.appendChild(thead);
        table.appendChild(tbody);

        let row = document.createElement("tr");
        let heading_1 = document.createElement("th");
        let heading_2 = document.createElement("th");
        let heading_3 = document.createElement("th");
        let heading_4 = document.createElement("th");

        heading_1.innerHTML = "ID клиента";
        heading_2.innerHTML = "Имя клиента";
        heading_3.innerHTML = "Фамилия клиента";
        heading_4.innerHTML = "Заявки клиента";
        row.appendChild(heading_1);
        row.appendChild(heading_2);
        row.appendChild(heading_3);
        row.appendChild(heading_4);
        thead.appendChild(row);

        clientsData.forEach(client => {
          let row = document.createElement("tr");
          let rowData1 = document.createElement("td");
          rowData1.innerHTML = client.id;
          let rowData2 = document.createElement("td");
          let rowInput2 = document.createElement("input");
          rowInput2.id = `clientName${client.id}`;
          rowInput2.value = client.name;
          rowData2.appendChild(rowInput2);
          let rowData3 = document.createElement("td");
          let rowInput3 = document.createElement("input");
          rowInput3.id = `clientSurname${client.id}`;
          rowInput3.value = client.surname;
          rowData3.appendChild(rowInput3);
          let rowData4 = document.createElement("td");
          let getRequestsB = document.createElement("input");
          getRequestsB.id = `getRequests${client.id}`;
          getRequestsB.type = "button";
          getRequestsB.value = "Открыть меню заявок";
          getRequestsB.onclick = function() {
            getRequests(client.id, client.name, client.surname);
          }
          rowData4.appendChild(getRequestsB);

          let deleteClientB = document.createElement("input");
          deleteClientB.id = `deleteClient${client.id}`;
          deleteClientB.type = "button";
          deleteClientB.value = "Удалить клиента";
          deleteClientB.onclick = function() {
            deleteClient(client.id);
          }

          let updateClientB = document.createElement("input");
          updateClientB.id = `updateClient${client.id}`;
          updateClientB.type = "button";
          updateClientB.value = "Сохранить изменения";
          updateClientB.onclick = function() {
            updateClient(client.id);
          }

          row.appendChild(rowData1);
          row.appendChild(rowData2);
          row.appendChild(rowData3);
          row.appendChild(rowData4);
          row.appendChild(updateClientB);
          row.appendChild(document.createElement("br"));
          row.appendChild(deleteClientB);
          tbody.appendChild(row);
        });

        div.appendChild(document.createElement("br"));
        div.appendChild(table);
      }
    }

    window.addEventListener("load", () => {
      getClients();
    })

    return (
      <div id = "mainDiv">
        <div id = "createClientDiv">
          <h1>Добавить клиента</h1>
          <label>Имя: </label>
          <input type="text" id="clientName" placeholder="Никита" required/>
          <br/>
          <label>Фамилия: </label>
          <input type="text" id="clientSurname" placeholder="Сутаков" required/>
          <br/>
          <input type="button" id="clientAdd" value="Добавить" onClick={addNewClient}/>

          <div id="getClients">
          </div>
        </div>
      </div>
    );
  }
}

export default App;