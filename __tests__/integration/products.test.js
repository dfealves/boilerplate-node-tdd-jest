const app = require("../../src/app");
const request = require("supertest");
const Product = require("../../src/models/products");

const dbHandler = require("../../db.handler.tests");

beforeAll(async () => {
  await dbHandler.connect();
});

afterAll(async () => {
  await dbHandler.clearDatabase();
  await dbHandler.closeDatabase();
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
    });

    expect(response.status).toBe(201);
    expect(product.title).toBe("Produto 01");
  });

  it("should list all products", async () => {
    const response = await request(app).get("/productss");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
