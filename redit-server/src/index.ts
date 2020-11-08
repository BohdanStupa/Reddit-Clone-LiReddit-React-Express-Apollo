import { MikroORM } from "@mikro-orm/core";
// import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";


const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver],
            validate: false
        }),
    }); 

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log(`server started on localhost:4000`);    
    });



//create new Post:
    // const post = orm.em.create(Post, {title: "my first title"});
    // await orm.em.persistAndFlush(post);
//get all  Posts 
    // const posts = await orm.em.find(Post,{});
    // console.log(posts);
}
main().catch(error => {
    console.log(error); 
});