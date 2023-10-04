import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DatabasePostgres {
   
    async list(search) {
        let videos;
        //ILIKE comando sql que busca independente do case sensitive e entre "%" 
        //busca a palavra entre os simbolos em qualquer lugar, seja no inicio, meio ou final
        //ou seja caso a descrição do video tenha %senac% ele devolve o mesmo
        // S% (letra antes do %) para buscar palavras que começam com S
        // %C (letra depois do %) para buscar palavras que terminam com C

        if(search) {
            videos = await sql`SELECT * FROM videos WHERE title ILIKE ${'%' + search +'%'}`;
        } else {
            videos = await sql`SELECT * FROM videos`;
        }

        return videos;
        
    }

    async create(video) {
        const videoId = randomUUID();
        const { title, description, duration } = video;

        await sql`INSERT INTO videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`
    }

    async update(id, video) {
        const { title, description, duration } = video;

        await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
        
    }

    async delete(id) {
        await sql`delete from videos where id = ${id}`
    }
}