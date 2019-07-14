const axios = require('axios');
const controler = require('./Controller.js')
let axiosConfig = {
    headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "52d2e55d-0561-4178-b812-079491fa1769"
    }
};
let axiosConfig_prev = {
    headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "3cd346aa-a061-4242-b249-08985f4ce862"
    }
};
let axiosConfig_model = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer ya29.c.El9FBxTdd-YSFbSCyhlH5_tB2utUMRnYDC6L6dtRt3Ab1N72f1-8ptKVXqYPjii3ppwd8w-rO12JU5ogA1xMMFUKtX1HWhCREUm8PgFmknBi7F8Pwt9lRMxApHTxLjV7kA"
    }
};
var user = null;
var url = 'https://gateway.gr1d.io/sandbox/bigdata/bigboost/v1/peoplev2';
module.exports = {
    async getProfile(req, res) {
        console.log("=================");
        console.log("Fetching data ...");
        console.log("=================");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

        var payload = {
            "Datasets": "basic_data,processes,phones,addresses,emails,occupation_data,financial_data",
            "q": "doc{" + req.params.cpf + "}",
            "AccessToken": "X-Api-Key"
        };

        axios.post(url, payload, axiosConfig)
            .then(response => {
                // user = res.json(response.data);
                // user.Result[0].MatchKeys = req.params.cpf;
                return res.json(response.data);
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    },
    async makePrev(req, res) {
        console.log("=================");
        console.log("Fetching data ...");
        console.log("=================");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');


        user = await axios.get("http://localhost:3001/api/profile/" + req.params.cpf);
        // console.log(user.data);
        user = user.data;
        user.Result[0].MatchKeys = req.params.cpf;
        // console.log(user.Result[0].BasicData.BirthDate.substring(0, 11));
        if (user) {
            url_prev = "https://gateway.gr1d.io/sandbox/mongeral/v1/simulacao?codigoModeloProposta=YZ&cnpj=11321351000110"

            payload_prev = {
                "simulacoes": [{
                    "proponente": {
                        "tipoRelacaoSeguradoId": 0,
                        "nome": user.Result[0].BasicData.Name,
                        "cpf": user.Result[0].MatchKeys,
                        "dataNascimento": user.Result[0].BasicData.BirthDate.substring(0, 10),
                        "profissaoCbo": "2124-15",
                        "renda": (user.Result[0].FinantialData.TotalAssets.substring(5, 6)) ? user.Result[0].FinantialData.TotalAssets.substring(5, 6) : 0,
                        "sexoId": (user.Result[0].BasicData.Gender == "M") ? 1 : 2,
                        "uf": "PE",
                        "declaracaoIRId": 1
                    },
                    "periodicidadeCobrancaId": 30
                }]
            }

            axios.post(url_prev, payload_prev, axiosConfig_prev)
                .then(response => {
                    // console.log(response);
                    return res.json(response.data);
                })

        } else {
            console.log("ERR, USER NOT IN SYSTEM");
        }
        // return res.json(user)
    },
    async sendToModel(req, res) {
        console.log("=================");
        console.log("Fetching data ...");
        console.log("=================");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');


        url_model = "https://automl.googleapis.com/v1beta1/projects/207747143483/locations/us-central1/models/TBL6774706865239490560:predict"

        let payload_model = {
            "payload": {
                "row": {
                    "values": [
                        req.params.renda,
                        req.params.genero,
                        req.params.filhos,
                        req.params.idade
                    ],
                    "columnSpecIds": [
                        "2792926660318461952",
                        "7404612678745849856",
                        "8557534183352696832",
                        "3945848164925308928"
                    ]
                }
            }
        }
        axios.post(url_model, payload_model, axiosConfig_model).then(response => {
            // console.log(response);
            return res.json(response.data);
        })
    }

};