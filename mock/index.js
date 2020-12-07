'use strict';

(() => {
    const {readFileSync} = require('fs');
    const mockData = JSON.parse(readFileSync('./mock.json'));

    const express = require('express');
    const app = express();
    const port = 8090;

    // Divide mocked returns in groups by path
    let mockGroups = {};
    mockData.forEach(mock => {
        if(mockGroups[mock.path] !== undefined) {
            mockGroups[mock.path].push = mock;
        }
        else {
            mockGroups[mock.path] = [mock];
        }
    });

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:4200");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    Object.keys(mockGroups).forEach( groupName => {
        const group = mockGroups[groupName];
        // For each group of mocks, create a listener for client call, it answer all methods
        app.all(group[0].path, (req, res, next) => {
            // For each group of mocks, find which mock fits the request, there must be at least one eligible option
            const selectedMock = group.filter(mock => {
                // Checks if the candidate mock has the same method as the request
                if(mock.method != req.method) {
                    return false;
                }
                // Checks if all candidate mock queries are equal to the request
                if(mock.request.query !== undefined) {
                    if(!Object.keys(mock.request.query).every(
                        query => req.query[query] == mock.request.query[query]
                    )){
                        return false;
                    }
                }
                // Checks if the candidate mock body is the same as the request body
                if(mock.request.body !== undefined) {
                    if(req.body != mock.request.body){
                        return false;
                    }
                }
                // Checks if all candidate mock headers are equal to the request
                if(mock.request.headers !== undefined) {
                    if(!Object.keys(mock.request.headers).every(
                        header => req.headers[header] == mock.request.headers[header]
                    )){
                        return false;
                    }
                }
                return true;
            })[0];
            // If there is at least one eligible mock, select this one and use it as a return
            if(selectedMock !== undefined ) {
                console.log(`Called mock via ${selectedMock.method} ${selectedMock.path} with response status ${selectedMock.response.status}`);
                res.status(selectedMock.response.status !== undefined ? selectedMock.response.status : 200)
                    .send(selectedMock.response.body !== undefined ? selectedMock.response.body : null)
                    .end(); 
            } else {
                res.status(404).send('Mock not found.');
            }
            next();
        });
    });

    app.listen(port, () => {
        console.log(`Mock server started at port ${port}`);
    });
})();