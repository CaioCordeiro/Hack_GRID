const axios = require('axios');
let axiosConfig = {
    headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "52d2e55d-0561-4178-b812-079491fa1769"
    }
};

var url = 'https://gateway.gr1d.io/sandbox/bigdata/bigboost/v1/peoplev2';
module.exports = {
    async getProfile(req, res) {
        console.log("=================");
        console.log("Fetching data ...");
        console.log("=================");

        var payload = {
            "Datasets": "basic_data{name, birthdate},processes,phones,addresses,emails,occupation_data",
            "q": "doc{"+req.params.cpf+"}",
            "AccessToken": "X-Api-Key"
        };

        axios.post(url, payload, axiosConfig)
            .then(response => {
                return res.json(response.data);
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }

};