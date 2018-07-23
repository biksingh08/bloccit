const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";
const marco = "http://localhost:3000/marco";


describe("routes : static", () => {

//#1
  describe("GET /", () => {

//#2
    it("should return status code 200", (done) => {

//#3
      request.get(base, (err, res, body) => {
        console.log(res.body);
        console.log(res.statusCode);
        expect(res.statusCode).toBe(200);

//#4
        done();
      });
    });

  });

  describe("GET /marco", () => {

    it("should return status code 200", (done) => {

      request.get(marco, (err, res, body) => {
        console.log(res.body);
        expect(res.body).toBe("polo");
        console.log(res.statusCode);
        expect(res.statusCode).toBe(200);
        done();
      });
    });
  });
});
