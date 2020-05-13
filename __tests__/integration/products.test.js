const dbHandler = require("../../db.handler.tests");
const app = require("../../src/app");
const request = require("supertest");
const Product = require("../../src/models/products");

beforeAll(async () => {
  await dbHandler.connect();
});

describe("handle products api", () => {
  it("should create a product", async () => {
    const product = await Product.create({
      title: "Produto 01",
      slug: "algum slug",
      description: "descrição legal",
      price: 199,
      active: true,
      tag: ["tag 01"],
    });

    const response = await request(app).post("/products").send({
      title: product.title,
      description: product.description,
      price: product.price,
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      title: "Produto 01",
      description: "descrição legal",
      price: 199,
    });
  });

  it("should list all products", async () => {
    const response = await request(app).get("/products");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should return a product by id", async () => {
    const product = await request(app)
      .post("/products")
      .send({
        title: "Produto 055",
        slug: "algum sadfasfdasg",
        description: "descriçãodfasdfa legal",
        price: 148989499,
        active: true,
        tag: ["tag 01"],
      });

    const response = await request(app).get(`/products`);

    console.log(response.body.id);

    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  await dbHandler.clearDatabase();
  await dbHandler.closeDatabase();
});
