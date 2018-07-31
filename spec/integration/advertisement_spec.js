const request = require("request");
const server = require("../../src/server");
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;
const base = "http://localhost:3000/advertisements/";

describe("routes : advertisements", () => {

  beforeEach((done) => {
    this.advertisement;
    sequelize.sync({force: true}).then((res) => {

     Advertisement.create({
       title: "JS Frameworks",
       description: "There is a lot of them"
     })
      .then((advertisement) => {
        this.advertisement = advertisement;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
 });

  describe("GET /advertisements", () => {

    it("should return a status code 200 and all advertisements", (done) => {

      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Advertisements");
        expect(body).toContain("JS Frameworks");
        done();
      });
    });
  });

  describe("GET /advertisements/new", () => {

    it("should render a new advertisement form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Advertisement title");
        done();
      });
    });

  });

  describe("POST /advertisements/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        title: "blink-182 songs",
        description: "What's your favorite blink-182 song?"
      }
    };

    it("should create a new advertisement and redirect", (done) => {

  //#1
      request.post(options,

  //#2
        (err, res, body) => {
          Advertisement.findOne({where: {title: "blink-182 songs"}})
          .then((advertisement) => {
            expect(res.statusCode).toBe(303);
            expect(advertisement.title).toBe("blink-182 songs");
            expect(advertisement.description).toBe("What's your favorite blink-182 song?");
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
  });

});
