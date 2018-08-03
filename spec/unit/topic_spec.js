const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {


    beforeEach((done) => {
    //#1
      this.topic;
      this.post;
      sequelize.sync({force: true}).then((res) => {

    //#2
        Topic.create({
          title: "Cartoons",
          description: "spongebob, mr krabs, patrick and sandy."
        })
        .then((topic) => {
          this.topic = topic;

    //#3
          Post.create({
            title: "Hated cartoons",
            body: "None",
    //#4
            topicId: this.topic.id
          })
          .then((post) => {
            this.post = post;
            done();
          });
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

    describe("create()", () => {
        it("should create a topic object with title, description and an id", (done) => {
    //#1
          Topic.create({
            title: "Ants",
            description: "the ants go marching one by one",
            topicId: this.topic.id
          })
          .then((topic) => {

    //#2
            expect(topic.title).toBe("Ants");
            expect(topic.description).toBe("the ants go marching one by one");
            done();

          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });

        describe("getPosts", () => {

          it("should create a post object with a title, body, and assigned topic", (done) => {
      //#1
            Post.create({
              title: "Favourite cartoons",
              body: "All of them",
              topicId: this.topic.id
            })
            .then((post) => {

      //#2
              expect(post.title).toBe("Favourite cartoons");
              expect(post.body).toBe("All of them");

              done();

            })
            .catch((err) => {
              console.log(err);
              done();
            });
          });

        });
    });
});
