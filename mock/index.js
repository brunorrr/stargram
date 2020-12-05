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

    Object.keys(mockGroups).forEach( groupName => {
        const group = mockGroups[groupName];
        app.all(group[0].path, (req, res, next) => {
            const selectedMock = group.filter(mock => {
                if(mock.method !== req.method) {
                    return false;
                }
                if(mock.query !== undefined) {
                    if(!Object.keys(mock.query).every(
                        query => req.query[query]
                    )){
                        return false;
                    }
                }
                if(mock.body !== undefined) {
                    if(!Object.keys(mock.body).every(
                        body => req.body[body]
                    )){
                        return false;
                    }
                }
                if(mock.headers !== undefined) {
                    if(!Object.keys(mock.headers).every(
                        header => req.headers[header]
                    )){
                        return false;
                    }
                }
                return true;
            })[0];
            if(selectedMock !== undefined ) {
                console.log(`Called mock via ${selectedMock.method} ${selectedMock.path} with response status ${selectedMock.response.status}`);
                res.status(selectedMock.response.status !== undefined ? selectedMock.response.status : 200)
                    .send(selectedMock.response.body !== undefined ? selectedMock.response.body : null)
                    .end(); 
            } else {
                res.sendStatus(404);
            }
            next();
        });
    });

    app.listen(port, () => {
        console.log(`Mock server started at port ${port}`);
    });
})();