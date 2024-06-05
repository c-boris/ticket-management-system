<h1 align="center">Ticket management system</h1>
<br>
<p align="center">
  <a href="#overview">Overview</a> &#xa0; | &#xa0;
  <a href="#requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#getting-started">Getting started</a> &#xa0; | &#xa0;
  <a href="#crud-with-curl">CRUD with curl</a> &#xa0; | &#xa0;
  <a href="#additional-routes">Additional Routes</a> &#xa0; | &#xa0;
  <a href="#websocket">Websocket</a> &#xa0; | &#xa0;
</p>

## Overview

This project involves creating a Node/TypeScript CRUD API for managing JSON data and developing a React frontend to display and interact with this data using Material UI, axios, and websockets.

## Requirements

Ensure you have the following tools installed before proceeding

- [Git](https://git-scm.com)
- [Node](https://nodejs.org/en/)

## Getting started

Follow these steps to set up and run the application on your local machine

```bash
cd backend
npm install
npm run dev

cd frontend
npm install
npm run dev
```

<br>

## CRUD with curl

1. Create a New Ticket

```bash
curl -X POST http://localhost:3000/api/tickets \
     -H "Content-Type: application/json" \
     -d '{
           "id": "unique_id",
           "name": "Ticket Name",
           "hotlinerId": "hotliner_id",
           "companyId": "company_id",
           "content": [
             {"field": "field1", "value": "value1"},
             {"field": "field2", "value": "value2"}
           ]
         }'
```

2. Retrieve a Ticket by ID

```bash
curl -X GET http://localhost:3000/api/tickets/unique_id
```

3. Update a Ticket

```bash
curl -X PUT http://localhost:3000/api/tickets/unique_id \
     -H "Content-Type: application/json" \
     -d '{
           "id": "unique_id",
           "name": "Updated Ticket Name",
           "hotlinerId": "updated_hotliner_id",
           "companyId": "updated_company_id",
           "content": [
             {"field": "updated_field1", "value": "updated_value1"},
             {"field": "updated_field2", "value": "updated_value2"}
           ]
         }'
```

4. Delete a Ticket

```bash
curl -X DELETE http://localhost:3000/api/tickets/unique_id
```

## Additional Routes

Retrieve All Tickets

```bash
curl -X GET http://localhost:3000/api/tickets
```

Retrieve Tickets by Company ID

```bash
curl -X GET http://localhost:3000/api/tickets/company/company_id

```

Retrieve Tickets by Hotliner ID

```bash
curl -X GET http://localhost:3000/api/tickets/hotliner/hotliner_id
```

Search Tickets name by Keyword

```bash
curl "http://localhost:3000/api/search?keyword={keyword}"
```

## Websocket

To test the WebSocket operations, you can use the provided test scripts written in TypeScript using socket.io-client.

```bash
cd backend
```

1. Delete all tickets for a hotliner

```bash
npx ts-node ./src/test/testDeleteTickets.ts
```

2. Reassign all tickets from one hotliner to another

```bash
npx ts-node ./src/test/testAssignTickets.ts
```

<br>

<a href="#top">Back to top</a>
