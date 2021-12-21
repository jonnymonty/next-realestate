import axios from 'axios';

export const baseUrl = 'https://realty-in-us.p.rapidapi.com'

export const fetchApi = async (url) => {
    const { data } = await axios.get((url), {
        params: {
            limit: '6',
            offset: '0'
        },
        headers: {
            'x-rapidapi-host': 'realty-in-us.p.rapidapi.com',
            'x-rapidapi-key': '1f1f2a3533msh4a6329daa98fa00p1571bbjsn09a7f943f128'
        }
    });
    return data;
}