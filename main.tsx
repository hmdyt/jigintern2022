import { Application,Router } from "https://deno.land/x/oak/mod.ts"

const router = new Router()
router
  .get("/", async (context) => {
    context.response.body = await Deno.readTextFile("index.html")
  })
  .get("/json_test", async (context) => {
    context.response.body = await Deno.readTextFile("json/test01.json")
  })
  .get("/get_scinti_data", async (context) => {
    context.response.body = await Deno.readTextFile("json/scinti.json")
  })


const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

console.log("server http://localhost:8000")
await app.listen({ port: 8000 })