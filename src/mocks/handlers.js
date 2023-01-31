import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:8080/api/movies", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        content: [
          {
            id: "40280fec8602c26f0186032908f10000",
            title: "The Gangster, the Cop, the Devil",
            poster:
              "https://upload.wikimedia.org/wikipedia/en/b/bf/The_Gangster%2C_The_Cop%2C_The_Devil.jpg",
          },
          {
            id: "40280fec8602c26f0186032f44eb0001",
            title: "The Outlaws",
            poster: "https://m.media-amazon.com/images/I/8183e1ztAXL._RI_.jpg",
          },
        ],
        page: {
          size: 4,
          totalElements: 50,
          totalPages: 13,
          number: 0,
        },
      })
    );
  }),
  rest.get("/api/movies", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        content: [
          {
            id: "4028c6ec8606581f018606e124ae0013",
            title: "Broker",
            poster:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEk3g0kfaNadgbNgef4qzIPq9-acfO_8sdvmc73ebKR3jIv2Da7M8AXb6kkcpX4FbZD7w&usqp=CAU",
          },
          {
            id: "4028c6ec8606581f018606dcf8160012",
            title: "The Pirates: The Last Royal Treasure",
            poster:
              "https://m.media-amazon.com/images/M/MV5BZGFjYWM0NzgtOGJkNi00ZjgyLThjZGEtMDhlYTg5NThlYjIxXkEyXkFqcGdeQXVyMTM1NTM4MzQx._V1_.jpg",
          },
          {
            id: "4028c6ec8606581f018606dab4020011",
            title: "The King and the Clown",
            poster:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh9F0xhT6liypZZONdVRj85EX6W7lE-azwC8G-Sk5QwNAzlq8lj7fsu0Rq5JtnXvjbDKA&usqp=CAU",
          },
        ],
        page: {
          size: 3,
          totalElements: 50,
          totalPages: 2,
          number: 1,
        },
      })
    );
  }),
  rest.get(
    "http://localhost:8080/api/movies/search/search",
    (req, res, ctx) => {
      return res(
        ctx.json({
          content: [
            {
              id: "40280fec8602c26f0186032908f10000",
              title: "The Gangster, the Cop, the Devil",
              genre: "Action,Thriller",
              year: 2019,
              imdbRating: 6.9,
              poster:
                "https://upload.wikimedia.org/wikipedia/en/b/bf/The_Gangster%2C_The_Cop%2C_The_Devil.jpg",
            },
            {
              id: "40280fec8602c26f0186032f44eb0001",
              title: "The Outlaws",
              imdbRating: 7.2,
              genre: " Action,Crime",
              year: 2017,
              poster:
                "https://m.media-amazon.com/images/I/8183e1ztAXL._RI_.jpg",
            },
          ],
          page: {
            size: 20,
            totalElements: 34,
            totalPages: 2,
            number: 0,
          },
        })
      );
    }
  ),
  rest.get(
    "http://localhost:8080/api/movies/search/search",
    (req, res, ctx) => {
      return res(
        ctx.json({
          content: [
            {
              id: "4028c6ec8606581f018606dcf8160012",
              title: "The Pirates: The Last Royal Treasure",
              year: 2022,
              imdbRating: 6.1,
              poster:
                "https://m.media-amazon.com/images/M/MV5BZGFjYWM0NzgtOGJkNi00ZjgyLThjZGEtMDhlYTg5NThlYjIxXkEyXkFqcGdeQXVyMTM1NTM4MzQx._V1_.jpg",
            },
            {
              id: "4028c6ec8606581f018606dab4020011",
              title: "The King and the Clown",
              year: 2005,
              imdbRating: 7.3,
              poster:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh9F0xhT6liypZZONdVRj85EX6W7lE-azwC8G-Sk5QwNAzlq8lj7fsu0Rq5JtnXvjbDKA&usqp=CAU",
            },
          ],
          page: {
            size: 20,
            totalElements: 34,
            totalPages: 2,
            number: 1,
          },
        })
      );
    }
  ),
  rest.get("http://localhost:8080/api/crews", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        content: [
          {
            id: "4028a5ec8601caf8018601d8f8d80000",
            name: "Ma Dong-seok",
            profession: "actor",
            poster:
              "https://m.media-amazon.com/images/M/MV5BMjJkNTk0NGQtOGU3NS00M2JlLTg2NzktNjQ1ZTU2YzU0YWI2XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
          },
          {
            id: "4028a5ec8601f663018601f8cfb20000",
            name: "Kim Sung-kyu",
            profession: "actor",
            poster:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQekyj9dfOHzBwYO8HSFOOKGkxD2SjYKVrxS8bAUO2j8TJty4Ti",
          },
          {
            id: "4028a5ec8601f663018601ff3e880001",
            name: "Song Joong-ki",
            profession: "actor",
            poster:
              "https://upload.wikimedia.org/wikipedia/commons/1/13/Song_Joong-ki_at_Style_Icon_Asia_2016.jpg",
          },
        ],
        page: {
          size: 20,
          totalElements: 20,
          totalPages: 2,
          number: 0,
        },
      })
    );
  }),
  rest.get("http://localhost:8080/api/crews", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        content: [
          {
            id: "4028c6ec8606581f018606f81864001b",
            name: "Kang Yoon-Sung",
            profession: "director",
            poster:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Jz1rdtOh8wYNIzGm8VER-1yFqaBpqDHdL2DVDa4X8FtkWwjF_VijjB_Fktrh5bH5v-U&usqp=CAU",
          },
          {
            id: "4028c6ec8606581f018606f69a0c001a",
            name: "won tae lee",
            profession: "writer, director, producer",
            poster:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBEC_k8vrcKoGdonJb9WYDF4lWXOLogG3DZ7_JiKcK4U6u_RGIxV_NwghED6SJ50mhJlM&usqp=CAU",
          },
          {
            id: "4028c6ec8606581f018606ecd4cf0019",
            name: "Bong Joon-ho",
            profession: "director",
            poster:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQuz0SwSA1xMBl4GryE23dP9jy49nC7dOyiYpU6onWZqJgqsNsFZFF_5G9JrXgzuNMN3A&usqp=CAU",
          },
        ],
        page: {
          size: 5,
          totalElements: 20,
          totalPages: 2,
          number: 1,
        },
      })
    );
  }),
  rest.get("http://localhost:8080/api/crews/search/search", (req, res, ctx) => {
    return res(
      ctx.json({
        content: [
          {
            id: "4028a5ec8601caf8018601d8f8d80000",
            name: "Ma Dong-seok",
            profession: "actor",
            poster:
              "https://m.media-amazon.com/images/M/MV5BMjJkNTk0NGQtOGU3NS00M2JlLTg2NzktNjQ1ZTU2YzU0YWI2XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
          },
          {
            name: "Kim Sung-kyu",
            profession: "actor",
            poster:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQekyj9dfOHzBwYO8HSFOOKGkxD2SjYKVrxS8bAUO2j8TJty4Ti",
          },
          {
            id: "4028a5ec8601f663018601ff3e880001",
            name: "Song Joong-ki",
            profession: "actor",
            poster:
              "https://upload.wikimedia.org/wikipedia/commons/1/13/Song_Joong-ki_at_Style_Icon_Asia_2016.jpg",
          },
        ],
        page: {
          size: 20,
          totalElements: 20,
          totalPages: 2,
          number: 0,
        },
      })
    );
  }),
  rest.get("http://localhost:8080/api/movies/:id", (req, res, ctx) => {
    return res(
      ctx.json({
        id: "4028c6ec8606581f018606dab4020011",
        title: "The King and the Clown",
        year: 2005,
        rated: null,
        released: null,
        runtime: "01:59",
        genre: "Drama,Thriller",
        director: "Joon-ik Lee",
        writer: null,
        actors: "Woo-seong Kam,Jin-young Jung,Seong-Yeon Kang",
        plot: "Two clowns living in Korea's Chosun Dynasty get arrested for staging a play that satirizes the king. They are dragged to the palace and threatened with execution but are given a chance to save their lives if they can make the king laugh.",
        language: "Korean",
        country: null,
        awards: null,
        poster:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh9F0xhT6liypZZONdVRj85EX6W7lE-azwC8G-Sk5QwNAzlq8lj7fsu0Rq5JtnXvjbDKA&usqp=CAU",
      })
    );
  }),
  rest.get("http://localhost:8080/api/movies/:id/crews", (req, res, ctx) => {
    return res(
      ctx.json({
        content: [
          {
            id: "4028a5ec8601f66301860211a9440007",
            name: "Lee Joon-gi",
            birth: 1982,
            death: null,
            profession: "actor",
            poster:
              "https://6.viki.io/image/fccd19e396ed4b6d98aced78963bb3ee/dummy.jpeg?s=900x600&e=t",
          },
        ],
        page: {
          size: 20,
          totalElements: 20,
          totalPages: 2,
          number: 0,
        },
      })
    );
  }),
  rest.get("http://localhost:8080/api/crews/:id", (req, res, ctx) => {
    return res(
      ctx.json({
        id: "4028c6ec8606581f018606ecd4cf0019",
        name: "Bong Joon-ho",
        birth: 1969,
        death: null,
        profession: "director",
        poster:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQuz0SwSA1xMBl4GryE23dP9jy49nC7dOyiYpU6onWZqJgqsNsFZFF_5G9JrXgzuNMN3A&usqp=CAU",
      })
    );
  }),
  rest.get("http://localhost:8080/api/crews/:id/movies", (req, res, ctx) => {
    return res(
      ctx.json({
        content: [
          {
            id: "4028c6ec8606581f018606b28f60000d",
            title: "Parasite",
            year: 2019,
            rated: null,
            released: null,
            runtime: "02:12",
            genre: "Drama,Thriller",
            director: "Bong Joon Ho",
            writer: null,
            actors: null,
            plot: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
            language: "Korean",
            country: null,
            awards: null,
            poster:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdzqjSRTrNTR77lCCfSLW2PfemI7JmRN-dzzKDWpBepoOKa8EVkU_toMsZArxxGkE_txs&usqp=CAU",
            metaScore: null,
            imdbRating: 8.5,
            imdbVotes: "815,878",
          },
        ],
      })
    );
  }),
  rest.put("http://localhost:8080/api/users/", (req, res, ctx) => {
    return res(
      ctx.json({
        id: "8dfd88a8-fdb4-25aa-b85d-e10256aa68ea",
        username: "admin",
        fullname: "Yoona",
        password: "123456",
        role: "ADMIN",
      })
    );
  }),
  rest.delete("http://localhost:8080/api/users/:id", (req, res, ctx) => {
    return res(
      ctx.json({
        id: "8dfd88a8-fdb4-25aa-b85d-e10256aa68ea",
        username: "admin",
        fullname: "Yoona",
        password: "123456",
        role: "ADMIN",
      })
    );
  }),
  rest.post("http://localhost:8080/api/login", (req, res, ctx) => {
    return res(
      ctx.json({
        id: "8dfd88a8-fdb4-25aa-b85d-e10256aa68ea",
        username: "admin",
        fullname: "Yoona",
        password: "123456",
        role: "ADMIN",
      })
    );
  }),
  rest.post("http://localhost:8080/api/users", (req, res, ctx) => {
    return res(
      ctx.json({
        username: "Tom",
        fullname: "Tom Felton",
        password: "15161718",
        role: "ADMIN",
      })
    );
  }),
  rest.post("http://localhost:8080/api/movies", (req, res, ctx) => {
    return res(
      ctx.json({
        title: "test Movie",
        year: 2010,
        director: "Steven Spielberg",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMjE2NTAyMjUxMl5BMl5BanBnXkFtZTYwOTAwODQ3._V1_SX300.jpg",

        imdbRating: 6,
      })
    );
  }),
  rest.post("http://localhost:8080/api/crews", (req, res, ctx) => {
    return res(
      ctx.json({
        name: "Bastian",
        birth: "1922",
        profession: "actor",
      })
    );
  }),
  rest.post("http://localhost:8080/api/reviews", (req, res, ctx) => {
    return res(
      ctx.json({
        movie:
          "http://localhost:8080/api/movies/4028c6ec8606581f018606dab4020011",
        user: "http://localhost:8080/api/users/8dfd88a8-fdb4-25aa-b85d-e10256aa68ea",
        rate: 3.5,
        description: "test",
      })
    );
  }),
  rest.get(
    "http://localhost:8080/api/reviews/search/search",
    (req, res, ctx) => {
      return res(
        ctx.json({
          content: [
            {
              id: "40280fec8602c26f0186032908f10000",
              rate: 3.5,
              description: "test1",
            },
            {
              id: "4028c6ec8606581f018606dcf8160012",
              rate: 4,
              description: "test2",
            },
          ],
        })
      );
    }
  ),
];
