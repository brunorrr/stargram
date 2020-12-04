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

    mockGroups.forEach( group => {
        app.all(group[0].path, (req, res, next) => {
            const selectedMock = group.filter(mock => {
                if(mock.query != undefined) {
                    if(!mock.query.every(
                        query => req.query[query]
                    )){
                        return false;
                    }
                }
                return true;
            })[0];
            if(selectedMock != null ) {
                res.send(mock.response.body);
            }
        });
    });
})();