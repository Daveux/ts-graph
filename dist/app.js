import { ApolloServer } from "apollo-server-express";
import Express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { connect } from "mongoose";

// resolvers
import {UserResolver} from "./resolvers/User";
import {ProductResolver} from "./resolvers/Product";
import {CategoriesResolver} from "./resolvers/Categories";
import {CartResolver} from "./resolvers/Cart";
import {OrderResolver} from "./resolvers/Order";

const main = async () => {
    const schema = await buildSchema({
        resolvers: [UserResolver, ProductResolver, CategoriesResolver, CartResolver, OrderResolver],
        emitSchemaFile: true,
        validate: false,
    });
    // create mongoose connection
    const mongoose = await connect('mongodb://localhost:27017/ts-graph', {useNewUrlParser: true});
    await mongoose.connection;

// Setup server
    const server = new ApolloServer({schema});
    const app = Express();
    server.applyMiddleware({app});

    app.listen({port: 3333}, () => {
        console.log(`App Running on ${this.port}`);
    });
};

main().catch(err => {
    console.log(err, 'error');
})
