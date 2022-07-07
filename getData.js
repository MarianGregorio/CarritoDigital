const API = "/service.json";

export const getData = async () => {
    const res = await fetch(API);
    const data = await res.json();

    console.log(res)
    console.log(data)
    return data;
};



