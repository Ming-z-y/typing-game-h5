import Koa from "koa";
import Router from "koa-router";
import { getData } from "./getData";

const app = new Koa();
const router = new Router();

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (ctx.method == "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
});

router.get("/", (ctx) => {
  ctx.body = "hello";
});

router.get("/C6", async (ctx) => {
  const res = await getData();
  ctx.body = res;
});

router.get("/C6/:word", async (ctx) => {
  const word = ctx.params.word[0].toUpperCase();
  const ascii = word.charCodeAt(0);
  if (ascii >= 65 && ascii <= 90) {
    const res = await getData(word);
    ctx.body = res;
  } else {
    ctx.body = [];
  }
});

app.use(router.routes());

app.listen(3000, () => {
  console.log("http://localhost:3000 is running...");
});
