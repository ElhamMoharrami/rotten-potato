import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:8080/api/movies", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        content: [
          {
            id: "tt0389790",
            title: "Bee Movie",
            poster:
              "https://m.media-amazon.com/images/M/MV5BMjE1MDYxOTA4MF5BMl5BanBnXkFtZTcwMDE0MDUzMw@@._V1_SX300.jpg",
          },
          {
            id: "tt0322802",
            title: "Jackass: The Movie",
            poster:
              "https://m.media-amazon.com/images/M/MV5BOTgwMmU0YzktOGNhNi00MDcyLTg1OGEtZGQwM2RlMTAyYzhlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
          },
          {
            id: "tt0306841",
            title: "The Lizzie McGuire Movie",
            poster:
              "https://m.media-amazon.com/images/M/MV5BMTMzNDg1NDc0NF5BMl5BanBnXkFtZTYwOTY2OTU3._V1_SX300.jpg",
          },
          {
            id: "tt0086491",
            title: "Twilight Zone: The Movie",
            poster:
              "https://m.media-amazon.com/images/M/MV5BYjQ2NzgzYjEtMzAxNy00MzhkLWE5ZTUtZDA1ODY3MTBjOTRiXkEyXkFqcGdeQXVyNTAyNDQ2NjI@._V1_SX300.jpg",
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
            id: "tt9398640",
            title: "Between Two Ferns: The Movie",
            poster:
              "https://m.media-amazon.com/images/M/MV5BYzgyNzUyZjAtNDRiZS00MjQwLTgzMzQtZThhY2Y3YjFmYTc1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
          },
          {
            id: "tt2091256",
            title: "Captain Underpants: The First Epic Movie",
            poster:
              "https://m.media-amazon.com/images/M/MV5BMmQwMzdiOGMtNGZiYS00YjgyLWJlMjItYzQ3Nzc2OGIwYjQwXkEyXkFqcGdeQXVyMzQ1MTM3NjY@._V1_SX300.jpg",
          },
          {
            id: "tt0019760",
            title: "Man with a Movie Camera",
            poster:
              "https://m.media-amazon.com/images/M/MV5BYTc3NGVlN2QtYWJlZi00YjhjLThiZjctZDA1MmE1NGI4ZmE4XkEyXkFqcGdeQXVyODQyNDU4OTk@._V1_SX300.jpg",
          },
          {
            id: "tt4943998",
            title: "Deadwood: The Movie",
            poster:
              "https://m.media-amazon.com/images/M/MV5BM2Y1OGQ4ZjEtZWUzMi00MzZmLTk3MmEtMThiNjIwNzg4MjRkXkEyXkFqcGdeQXVyMTE5NDkxMA@@._V1_SX300.jpg",
          },
        ],
        page: {
          size: 4,
          totalElements: 50,
          totalPages: 13,
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
              id: "tt6193408",
              title: "A Shaun the Sheep Movie: Farmageddon",
              genre: "Animation, Adventure, Comedy",
              poster:
                "https://m.media-amazon.com/images/M/MV5BNTdjZjBkMDMtODBlNi00N2E0LWE1OGItOTgxODNmMDkzNGJmXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_SX300.jpg",
              metaScore: "79",
              imdbRating: 6.8,
              imdbVotes: "13,553",
            },
            {
              id: "tt0322802",
              title: "Jackass: The Movie",
              imdbRating: 6.6,
              genre: "Adventure",
              year: 2002,
              poster:
                "https://m.media-amazon.com/images/M/MV5BOTgwMmU0YzktOGNhNi00MDcyLTg1OGEtZGQwM2RlMTAyYzhlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
            },
            {
              id: "tt0306841",
              title: "The Lizzie McGuire Movie",
              year: 2003,
              imdbRating: 5.5,
              poster:
                "https://m.media-amazon.com/images/M/MV5BMTMzNDg1NDc0NF5BMl5BanBnXkFtZTYwOTY2OTU3._V1_SX300.jpg",
            },
            {
              id: "tt0086491",
              title: "Twilight Zone: The Movie",
              year: 1983,
              imdbRating: 6.4,
              poster:
                "https://m.media-amazon.com/images/M/MV5BYjQ2NzgzYjEtMzAxNy00MzhkLWE5ZTUtZDA1ODY3MTBjOTRiXkEyXkFqcGdeQXVyNTAyNDQ2NjI@._V1_SX300.jpg",
            },
            {
              id: "tt9398640",
              title: "Between Two Ferns: The Movie",
              year: 2019,
              imdbRating: 6.1,
              poster:
                "https://m.media-amazon.com/images/M/MV5BYzgyNzUyZjAtNDRiZS00MjQwLTgzMzQtZThhY2Y3YjFmYTc1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
            },
            {
              id: "tt2091256",
              title: "Captain Underpants: The First Epic Movie",
              year: 2017,
              imdbRating: 6.2,
              poster:
                "https://m.media-amazon.com/images/M/MV5BMmQwMzdiOGMtNGZiYS00YjgyLWJlMjItYzQ3Nzc2OGIwYjQwXkEyXkFqcGdeQXVyMzQ1MTM3NjY@._V1_SX300.jpg",
            },
            {
              id: "tt6290024",
              title: "Uno: The Movie",
              year: 2016,
              imdbRating: 9.5,
              poster:
                "https://m.media-amazon.com/images/M/MV5BN2YyNmMzZmQtYjg1MS00OTEwLTkwZDEtOWNlMTEzOWIzMWM3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNzQwNDg4MQ@@._V1_SX300.jpg",
            },
            {
              id: "40283294830d9a9a01830d9c76560001",
              title: "Test Movie Update",
              imdbRating: 9.0,
              poster: "",
            },
            {
              id: "tt0259974",
              title: "Digimon: The Movie",
              year: 2000,
              poster:
                "https://m.media-amazon.com/images/M/MV5BMjE2NTAyMjUxMl5BMl5BanBnXkFtZTYwOTAwODQ3._V1_SX300.jpg",

              imdbRating: 6.0,
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
              id: "tt1825918",
              title: "Phineas and Ferb the Movie: Across the 2nd Dimension",
              poster:
                "https://m.media-amazon.com/images/M/MV5BMjA3MWQ4OGYtYjQyNS00ZmQxLWJjMjEtY2I1MWJkOTU2MTQ1XkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg",
            },
            {
              id: "tt6868216",
              title: "Psych: The Movie",

              poster:
                "https://m.media-amazon.com/images/M/MV5BZjE2Mzk5NGItMTEzMi00MmYxLWFlNjEtNGFmZGViNzQ2ZWFkXkEyXkFqcGdeQXVyMjM5NzU3OTM@._V1_SX300.jpg",
            },
            {
              id: "tt6290024",
              title: "Uno: The Movie",

              poster:
                "https://m.media-amazon.com/images/M/MV5BN2YyNmMzZmQtYjg1MS00OTEwLTkwZDEtOWNlMTEzOWIzMWM3L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNzQwNDg4MQ@@._V1_SX300.jpg",
            },
            {
              id: "tt0110169",
              title: "It's Pat: The Movie",

              poster:
                "https://m.media-amazon.com/images/M/MV5BM2VhMjI0NDQtZWRjMS00ZWY4LTk2MmItZTY4MzE4M2ZmOTQ3L2ltYWdlXkEyXkFqcGdeQXVyNjE5MjUyOTM@._V1_SX300.jpg",
            },
            {
              id: "tt0190524",
              title: "Left Behind: The Movie",

              poster:
                "https://m.media-amazon.com/images/M/MV5BMGU3MmMxOWYtZmNhNi00ZjczLWJkYmEtMjJjZjBiZDRiYmZmXkEyXkFqcGdeQXVyMTY5Nzc4MDY@._V1_SX300.jpg",
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
            id: "nm0957858",
            name: "A.M. Zopfi",
            profession: "miscellaneous",
          },
          {
            id: "nm0001146",
            name: "Donna Dixon",
            profession: "actress,soundtrack",
            poster:
              "https://m.media-amazon.com/images/M/MV5BMTkyMTMyNTQxOF5BMl5BanBnXkFtZTcwNjEwNzYzMw@@._V1_UY317_CR7,0,214,317_AL_.jpg",
          },
          {
            id: "nm0005092",
            name: "Larry King",
            profession: "producer,actor,director",
            poster:
              "https://m.media-amazon.com/images/M/MV5BMTI0NjY4MTYyOF5BMl5BanBnXkFtZTYwOTc3NDg1._V1_UY317_CR3,0,214,317_AL_.jpg",
          },
          {
            id: "nm0010481",
            name: "Tom Adair",
            profession: "miscellaneous",
            poster: null,
          },
          {
            id: "nm0011178",
            name: "Maria Adams",
            profession: "actress",
            poster: null,
          },
          {
            id: "nm0017846",
            name: "Alberto Alejandrino",
            profession: "actor",
            poster: null,
          },
          {
            id: "nm0023351",
            name: "Daryl Alvaro",
            profession: "camera_department",
            poster: null,
            content: [],
          },
          {
            id: "nm0024116",
            name: "Chloe Amateau",
            profession: "actress,miscellaneous,location_management",
            poster: null,
          },
        ],
        page: {
          size: 20,
          totalElements: 1973,
          totalPages: 99,
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
            id: "nm0023351",
            name: "Daryl Alvaro",
            profession: "camera_department",
          },
          {
            id: "nm0024116",
            name: "Chloe Amateau",
            profession: "actress,miscellaneous,location_management",
            poster: null,
          },
          {
            id: "nm0024117",
            name: "J.P. Amateau",
            profession: "stunts,actor",
            poster: null,
          },
          {
            id: "nm0024990",
            name: "Sebastian Amiri",
            profession: "camera_department,actor,art_department",
            poster: null,
          },
          {
            id: "nm0025010",
            name: "Emmanuel Amit",
            profession: "actor",
            poster: null,
          },
        ],
        page: {
          size: 5,
          totalElements: 1973,
          totalPages: 395,
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
            id: "nm0001146",
            name: "Donna Dixon",
            profession: "actress,soundtrack",
            poster:
              "https://m.media-amazon.com/images/M/MV5BMTkyMTMyNTQxOF5BMl5BanBnXkFtZTcwNjEwNzYzMw@@._V1_UY317_CR7,0,214,317_AL_.jpg",
          },
          {
            id: "nm0005092",
            name: "Larry King",
            profession: "producer,actor,director",
            poster:
              "https://m.media-amazon.com/images/M/MV5BMTI0NjY4MTYyOF5BMl5BanBnXkFtZTYwOTc3NDg1._V1_UY317_CR3,0,214,317_AL_.jpg",
          },
          {
            id: "nm0010481",
            name: "Tom Adair",
            profession: "miscellaneous",
            poster: null,
          },
          {
            id: "nm0011178",
            name: "Maria Adams",
            profession: "actress",
            poster: null,
          },
          {
            id: "nm0017846",
            name: "Alberto Alejandrino",
            profession: "actor",
            poster: null,
          },
          {
            id: "nm0023351",
            name: "Daryl Alvaro",
            profession: "camera_department",
            poster: null,
          },
          {
            id: "nm0024116",
            name: "Chloe Amateau",
            profession: "actress,miscellaneous,location_management",
            poster: null,
          },
          {
            id: "nm0024117",
            name: "J.P. Amateau",
            profession: "stunts,actor",
            poster: null,
          },
          {
            id: "nm0024990",
            name: "Sebastian Amiri",
            profession: "camera_department,actor,art_department",
            poster: null,
          },
          {
            id: "nm0025010",
            name: "Emmanuel Amit",
            profession: "actor",
            poster: null,
          },
          {
            id: "nm0025712",
            name: "Glen Anastasiou",
            profession: "art_department,production_designer,art_director",
            poster: null,
          },
        ],
        page: {
          size: 20,
          totalElements: 1973,
          totalPages: 99,
          number: 0,
        },
      })
    );
  }),
  rest.get("http://localhost:8080/api/movies/:id", (req, res, ctx) => {
    return res(
      ctx.json({
        id: "tt0389790",
        title: "Bee Movie",
        year: "2007",
        released: "02 Nov 2007",
        runtime: "91 min",
        genre: "Animation, Adventure, Comedy",
        director: "Simon J. Smith, Steve Hickner",
        writer: "Jerry Seinfeld, Spike Feresten, Barry Marder",
        actors: "Jerry Seinfeld, Renée Zellweger, Matthew Broderick",
        plot: "Barry B. Benson, a bee just graduated from college, is disillusioned at his lone career choice: making honey. On a special trip outside the hive, Barry's life is saved by Vanessa, a florist in New York City. As their relationship ...",
        language: "English",
        country: "United States",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMjE1MDYxOTA4MF5BMl5BanBnXkFtZTcwMDE0MDUzMw@@._V1_SX300.jpg",
        metaScore: "54",
        imdbRating: 6.1,
        imdbVotes: "160,048",
      })
    );
  }),
  rest.get("http://localhost:8080/api/movies/:id/crews", (req, res, ctx) => {
    return res(
      ctx.json({
        content: [
          {
            id: "nm0272324",
            name: "Spike Feresten",
            profession: "writer,producer,miscellaneous",
            poster:
              "https://m.media-amazon.com/images/M/MV5BNDIxNzY1ODMwNF5BMl5BanBnXkFtZTcwODI2NzE1OQ@@._V1_UY317_CR12,0,214,317_AL_.jpg",
          },
          {
            id: "nm0358841",
            name: "Richard Hamner Jr.",
            profession: "miscellaneous,actor",
            poster: null,
          },
          {
            id: "nm0552092",
            name: "Chuck Martin",
            profession: "production_manager,producer,writer",
            poster: null,
          },
        ],
        page: {
          size: 20,
          totalElements: 1973,
          totalPages: 99,
          number: 0,
        },
      })
    );
  }),
  rest.get("http://localhost:8080/api/crews/:id", (req, res, ctx) => {
    return res(
      ctx.json({
        id: "nm0005092",
        name: "Larry King",
        birth: "1932",
        death: "2021",
        profession: "producer,actor,director",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMTI0NjY4MTYyOF5BMl5BanBnXkFtZTYwOTc3NDg1._V1_UY317_CR3,0,214,317_AL_.jpg",
        content: [],
      })
    );
  }),
  rest.get("http://localhost:8080/api/crews/:id/movies", (req, res, ctx) => {
    return res(
      ctx.json({
        content: [
          {
            id: "tt0389790",
            title: "Bee Movie",
            year: "2007",
            rated: "PG",
            released: "02 Nov 2007",
            runtime: "91 min",
            genre: "Animation, Adventure, Comedy",
            director: "Simon J. Smith, Steve Hickner",
            writer: "Jerry Seinfeld, Spike Feresten, Barry Marder",
            actors: "Jerry Seinfeld, Renée Zellweger, Matthew Broderick",
            plot: "Barry B. Benson, a bee just graduated from college, is disillusioned at his lone career choice: making honey. On a special trip outside the hive, Barry's life is saved by Vanessa, a florist in New York City. As their relationship ...",
            language: "English",
            country: "United States",
            awards: "1 win & 15 nominations",
            poster:
              "https://m.media-amazon.com/images/M/MV5BMjE1MDYxOTA4MF5BMl5BanBnXkFtZTcwMDE0MDUzMw@@._V1_SX300.jpg",
            metaScore: "54",
            imdbRating: 6.1,
            imdbVotes: "160,048",
            type: "movie",
            content: [],
          },
          {
            id: "4028b8ec84c7520b0184c77597160001",
            title: "this is killing me",
            year: "2008",
            rated: null,
            director: "Khadijeh Ghamilouie",
            imdbRating: 6.0,
          },
          {
            id: "402830ec84d1b3a30184d1dfff040000",
            title: "this is for test",
            year: "2005",
            director: "Khadijeh Ghamilouie",
            imdbRating: 5.0,
          },
          {
            id: "ff80808284dc8a6a0184dc96b6820000",
            title: "this is test r",
            year: "2005",
            director: "Khadijeh Ghamilouie",
            imdbRating: 5.0,
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
        fullname: "Khadijeh Ghamilouy",
        password: "112233",
        role: "ADMIN",
      })
    );
  }),
  rest.delete("http://localhost:8080/api/users/:id", (req, res, ctx) => {
    return res(
      ctx.json({
        id: "8dfd88a8-fdb4-25aa-b85d-e10256aa68ea",
        username: "admin",
        fullname: "Khadijeh Ghamilouy",
        password: "112233",
        role: "ADMIN",
      })
    );
  }),
  rest.post("http://localhost:8080/api/login", (req, res, ctx) => {
    return res(
      ctx.json({
        id: "8dfd88a8-fdb4-25aa-b85d-e10256aa68ea",
        username: "admin",
        fullname: "Khadijeh Ghamilouy",
        password: "112233",
        role: "ADMIN",
      })
    );
  }),
  rest.post("http://localhost:8080/api/users", (req, res, ctx) => {
    return res(
      ctx.json({
        username: "elham",
        fullname: "Elham Moharrami",
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
    console.log("this is called");
    return res(
      ctx.json({
        name: "Bas",
        birth: "1922",
        profession: "actor",
      })
    );
  }),
];
