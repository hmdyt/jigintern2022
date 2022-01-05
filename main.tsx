import { Application,Router } from "https://deno.land/x/oak/mod.ts"

const router = new Router()
router
  .get("/", async (context) => {
    context.response.body = await Deno.readTextFile("index.html")
  })
  .get("/get_hit_json:id", async (context) => {
    const paths = [];
    const event_id = parseInt(context.params.id, 10);
    for await (const item of Deno.readDir('json')) {
      paths.push(item.name);
    }
    context.response.body = await Deno.readTextFile("json/" + paths[event_id]);
  })
  .get("/get_scinti_data", async (context) => {
    context.response.body = await Deno.readTextFile("json/scinti.json")
  })
  .get("/get_n_event", async (context) => {
    let n_event = 0
    for await (const item of Deno.readDir('json')) {
      n_event++
    }
    context.response.body = n_event;
  })


const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

console.log("server http://localhost:8000")
await app.listen({ port: 8000 })