import { CarReader } from '@ipld/car'
import { TreewalkCarSplitter } from 'carbites/treewalk'
import { NFTStorage } from 'nft.storage'
const client = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgyRWJFRjZiRTA1MzA5RDJmOEEzRjkwZUFkMjMxOEIwNDAwODY2MDkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MjM3Njc0MzYwOSwibmFtZSI6ImdlbmVyYSJ9.yyDAb5udpZzrLmJc1qf4iUt0mxPhkqH0k6RYTp-V7Z4' })

window.split_car = splitCar;
async function splitCar(car) {
    const targetSize = 100000000
    const reader = await CarReader.fromBytes(car)
    const splitter = new TreewalkCarSplitter(reader, targetSize)
    var cid = ''
    console.log("Upload to IPFS")
    for await (const smallCar of splitter.cars()) {
        // Each small car is an AsyncIterable<Uint8Array> of CAR data
        const carReader = await CarReader.fromIterable(smallCar)
        cid = await client.storeCar(carReader)
        console.log(cid)
    }
    return cid
}