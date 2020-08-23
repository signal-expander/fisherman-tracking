
import axios from 'axios';

export const fishermenService = {
    getFishermenList,
    saveFishermanData
}

async function getFishermenList(success, error) {
    try {
        const resp = await axios.get('/api/v1/fisherman/get-all-fisherman');
        success(resp.data);
    }
    catch (err) {
        error(err + "");
    }
}

async function saveFishermanData(form, success, error) {
    try {
        const resp = await axios.post('/api/v1/fisherman/save-fisherman-record', form);
        success(resp);
    }
    catch (err) {
        error(err.message);
    }
}