import { b as l, s as a, C as n } from "./ipfs_car.js";
// BASE_URL = 'http://localhost:8000'
BASE_URL = 'http://genera.us-east-2.elasticbeanstalk.com'

init_buttons()

function init_buttons() {
    var input_field_1 = document.getElementsByClassName("dn")
    input_field_1[0].onchange = async () => { create_image_car() }

    var input_field_2 = document.getElementsByClassName("dn2")
    input_field_2[0].onchange = async () => { create_base_car() }
}

async function filelist_to_carblob({ files: o }) {
    if (!o || 0 === o.length)
        return;
    const cocker = [], { object: blob_object} = await async function (e) {
        if (!e || !e.length)
            return;
        if (e.car)
            return;
        const s = []
            , { root: t, out: o } = await async function (e, s = new d) {
                const t = [];
                for (const a of e)
                    t.push({
                        path: a.name,
                        content: l(a.stream())
                    });
                const o = {
                    cidVersion: 1,
                    wrapWithDirectory: !0,
                    rawLeaves: !0
                }
                    , r = [];
                for await (const l of a.importer(t, s, o))
                    r.push(l);
                const c = r[r.length - 1].cid
                    , { writer: i, out: f } = n.create(c);
                for (const l of s.blocks())
                    i.put(l);
                return i.close(),
                {
                    root: c,
                    out: f
                }
            }(e);
        for await (const l of o)
            s.push(l);
        const r = new Blob(s, {
            type: "application/car"
        });
        return {object: r}
    }(o);
    return blob_object
}

class d {
    constructor() {
        this.store = new Map
    }
    *blocks() {
        for (const [e, s] of this.store.entries())
            yield {
                cid: e,
                bytes: s
            }
    }
    put({ cid: e, bytes: s }) {
        return Promise.resolve(this.store.set(e, s))
    }
    get(e) {
        return Promise.resolve(this.store.get(e))
    }
}

async function create_image_car() {
    let images = document.querySelectorAll(".collection_card")
    let metadata = {
        type: 'image/png'
    };
    let image_filelist = []
    for (let i = 0; i < images.length; i++) {
        try {
            var response = await fetch(`${images[i].children[0].dataset.fullrez}`);
        } catch (error) {
            alert("Connection Error, please make sure you have a stable internet connection.")
            throw (error)
        }
        
        let data = await response.blob();
        let file = new File([data], `${i}.png`, metadata);
        image_filelist.push(file)
    }
    let blob_object = await filelist_to_carblob({ files: image_filelist })
    set_input_value(blob_object, "dn")
}

async function create_base_car(){
    var input_field = document.getElementsByClassName("dn2")
    let json_filelist = []
    let metadata = {
        type: 'application/json'
    };
    for (let i = 0; i < (input_field.value).length; i++) {
        const str = JSON.stringify(input_field.value[i]);
        const bytes = new TextEncoder().encode(str);
        const blob = new Blob([bytes], {
            type: "application/json;charset=utf-8"
        });
        let file = new File([blob], `${i}.json`, metadata);
        json_filelist.push(file)
    }
    let blob_object = await filelist_to_carblob({ files: json_filelist })
    set_input_value(blob_object, "dn2")
}

function set_input_value(blob_object, class_name) {
    let input_field = document.getElementsByClassName(class_name)
    input_field.value = blob_object
    const event = new Event('change');
    input_field[0].dispatchEvent(event)
}