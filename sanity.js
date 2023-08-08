import {createClient} from "@sanity/client"
import { fetchQuery } from "./utilities/support"

const client =createClient ({
    projectId:"28ks49je",
    dataset:"beauty_project",
    apiVersion: "2023-07-04",
    useCdn:true
})

export const fetchFeeds = async () => {
    let data = await client.fetch(fetchQuery).then(feeds => {
        return feeds;
    })
    return data
}