## API de Previsão do Tempo

</br>

    Resumo: Uma API que para obter e persistir previsões do tempo através de um CEP e uma data.

</br>

## Arquitetura

Neste projeto, procurei seguir a Regra da Dependência, conforme o descrito no livro Arquitetura Limpa, de Robert C. Martin (o Uncle Bob). Resumidamente, conforme a imagem abaixo, retirada do próprio livro, devemos respeitar a direção das setas no tocante a cada camada. A linha que sai de uma camada aponta para a camada da qual depende. Por exemplo, as entidades do sistema não dependem de nenhuma outra camada, enquanto os Use Cases dependem unicamente das entidades, e assim por diante.

![](https://res.cloudinary.com/dijxk2tpo/image/upload/v1643920490/clean-architecture_xgjlgl.jpg)

diagrama da arquitetura limpa - a direção da dependência é de fora para dentro.
[fonte](http://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

</br>

## Endpoints

</br>

### POST /api/get-forecast

</br>

Headers:

    authentication: Bearer Token

Body:

```json
{
  "data": "2022-02-04", // uma data em 1 e 7 dias no futuro a partir do dia presente
  "cep": "12030720" // um CEP válido
}
```

Response:

```json
{
  "_id": "61fc25044ff78ccfe3e5834f",
  "weatherForecast": {
    "date": "2022-02-04",
    "date_br": "04/02/2022",
    "humidity": {
      "min": 59,
      "max": 96,
      "dawn": {
        "min": 93,
        "max": 95
      },
      "morning": {
        "min": 60,
        "max": 92
      },
      "afternoon": {
        "min": 59,
        "max": 72
      },
      "night": {
        "min": 82,
        "max": 95
      }
    },
    "pressure": {
      "pressure": 918.1
    },
    "rain": {
      "probability": 90,
      "precipitation": 15
    },
    "wind": {
      "velocity_min": 6,
      "velocity_max": 17,
      "velocity_avg": 10,
      "gust_max": 26,
      "direction_degrees": 52,
      "direction": "NE",
      "dawn": {
        "direction": "NE",
        "direction_degrees": 68,
        "gust_max": 26,
        "velocity_max": 13,
        "velocity_avg": 11
      },
      "morning": {
        "direction": "NE",
        "direction_degrees": 42,
        "gust_max": 26,
        "velocity_max": 17,
        "velocity_avg": 13
      },
      "afternoon": {
        "direction": "N",
        "direction_degrees": 335,
        "gust_max": 17,
        "velocity_max": 12,
        "velocity_avg": 9
      },
      "night": {
        "direction": "SW",
        "direction_degrees": 132,
        "gust_max": 21,
        "velocity_max": 12,
        "velocity_avg": 8
      }
    },
    "uv": {
      "max": 15.3
    },
    "thermal_sensation": {
      "min": 20,
      "max": 35
    },
    "text_icon": {
      "icon": {
        "dawn": "2n",
        "morning": "2",
        "afternoon": "4t",
        "night": "4tn",
        "day": "4t"
      },
      "text": {
        "pt": "Sol, pancadas de chuva e trovoadas.",
        "en": "Sun, rainfalls and thunderstorms",
        "es": "Sol, lluvia y tormentas",
        "phrase": {
          "reduced": "Sol e aumento de nuvens de manhã. Pancadas de chuva à tarde e à noite.",
          "morning": "Sol com algumas nuvens",
          "afternoon": "Sol, pancadas de chuva e trovoadas.",
          "night": "Muitas nuvens, chuva e raios",
          "dawn": "Algumas nuvens"
        }
      }
    },
    "temperature": {
      "min": 20,
      "max": 31,
      "dawn": {
        "min": 20,
        "max": 23
      },
      "morning": {
        "min": 21,
        "max": 22
      },
      "afternoon": {
        "min": 24,
        "max": 31
      },
      "night": {
        "min": 22,
        "max": 27
      }
    },
    "cloud_coverage": {
      "low": 7.5,
      "mid": 0,
      "high": 0,
      "dawn": {
        "low": 0,
        "mid": 0,
        "high": 0
      },
      "morning": {
        "low": 0,
        "mid": 0,
        "high": 0
      },
      "afternoon": {
        "low": 16.7,
        "mid": 0,
        "high": 0
      },
      "night": {
        "low": 13.5,
        "mid": 0,
        "high": 0
      }
    },
    "sun": {
      "sunrise": "05:43:00",
      "sunset": "18:48:00"
    }
  },
  "date": "2022-02-04T00:00:00.000Z",
  "localeId": "3521",
  "__v": 0
}
```

## Requisitos

- [NPM](https://github.com/npm/cli)
- [Node.js](https://github.com/nodejs/node)
- [NestJS](https://github.com/nestjs/nest)
- [Um cluster MongoDB](https://www.mongodb.com/)
- [Preencher .env de acordo com o exemplo](.env.example)

</br>

## Instalação

```bash
$ npm install
```

## Executando a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Entre em contato

- Autor - [Hugo Lacerda](https://www.hugolacerda.dev)
