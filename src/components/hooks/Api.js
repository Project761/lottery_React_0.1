import axios from "../../interceptors/Axios";

const encDecStatus = "false";
var IsEncDec = encDecStatus == 'true' || encDecStatus == true

//---------Get-Data
export const fetch_Post_Data = async (url, postData) => {
    let Data
    let Permision
    var reUseUrl = url;
    var reUseData = postData;
    try {
        if (Object.keys(postData).length !== 0) {
            const ipAddress = sessionStorage.getItem('IPAddress');
            if (ipAddress) {
                postData.IPAddress = ipAddress;
            }
            //--------------> New code with EncDec <------------ Don't Remove--------By DK

            if (IsEncDec) {
                const EncPostData = Aes256Encrypt(JSON.stringify(postData));
                const DecPostData = { 'EDpostData': EncPostData }
                const res = await axios.post(url, postData);
                const decr = res.data.data;
                const decryptedData = await Aes256Decrypt(decr);
                const TextData = JSON.parse(decryptedData)
                Permision = TextData.Table1
                Data = TextData.Table
                return { Data, Permision }
            } else {
                const res = await axios.post(url, postData);
                const decr = res.data.data
                const TextData = JSON.parse(decr)
                Permision = TextData.Table1
                Data = TextData.Table
                return { Data, Permision }
            }
        } else {
            console.log("%c🚀 ~ fetch_Post_Data: " + `${url}-----${postData}`, "padding: 6px; font-weight: bold; background-color: #2ecc71; color: black'");

        }
    } catch (error) {
        if (error.response.status === 401) {
            if (Object.keys(reUseData).length !== 0) {

                const ipAddress = sessionStorage.getItem('IPAddress');
                if (ipAddress) {
                    reUseData.IPAddress = ipAddress;
                }

                if (IsEncDec) {
                    const EncPostData = Aes256Encrypt(JSON.stringify(reUseData));
                    const DecPostData = { 'EDpostData': EncPostData }
                    const res = await axios.post(reUseUrl, DecPostData);
                    const decr = res.data.data
                    const decryptedData = await Aes256Decrypt(decr);
                    const TextData = JSON.parse(decryptedData)
                    Permision = TextData.Table1
                    Data = TextData.Table
                    return { Data, Permision }
                } else {
                    const res = await axios.post(reUseUrl, reUseData);
                    const decr = res.data.data
                    const TextData = JSON.parse(decr)
                    Permision = TextData.Table1
                    Data = TextData.Table
                    return { Data, Permision }
                }
            } else {
                console.log("%c🚀 ~ fetch_Post_Data: " + `${url}-----${postData}`, "padding: 6px; font-weight: bold; background-color: #2ecc71; color: black'");

            }
        }
        if (error.response) {
            console.log("%c🚀 ~ fetch_Post_Data: " + `${error.response?.request?.responseURL} -- ${error.response?.data?.Message}`, "padding: 6px; font-weight: bold; background-color: #2ecc71; color: black'");

        }
    }
};

// --------Insert-Data
export const fetchPostData = async (url, postData) => {
    var reUseUrl = url;
    var reUseData = postData;
    try {
        const ipAddress = sessionStorage.getItem('IPAddress');
        if (ipAddress) {
            postData.IPAddress = ipAddress;
        }
        // console.log("%c🚀 ~ fetchPostData: " + `${url}-----${JSON.stringify(postData)}`, "padding: 6px; font-weight: bold; background-color: #2ecc71; color: black'");
        if (Object.keys(postData).length !== 0) {
            //--------------> New code with EncDec <------------ Don't Remove--------By AM

            if (IsEncDec) {
                // console.log(IsEncDec);
                const EncPostData = await Aes256Encrypt(JSON.stringify(postData));
                // console.log(EncPostData)
                const DecPostData = { 'EDpostData': EncPostData }
                // console.log(DecPostData)
                const res = await axios.post(url, DecPostData);
                // console.log("Hurray " + res);
                const EncryptedData = res?.data?.data;
                // console.log(EncryptedData)
                const decryptedData = await Aes256Decrypt(EncryptedData);
                // console.log(decryptedData)
                const TextData = JSON.parse(decryptedData)
                return TextData?.Table
            } else {
                const cleanUrl = url.replace(/^\//, "");
                const res = await axios.post(cleanUrl, postData);

                const TextData = JSON.parse(res?.data?.data);
                return TextData?.Table
            }

        } else {
            // console.log(`${url}-----${postData}`)
            console.log("%c🚀 ~ fetchPostData: " + `${url}-----${postData}`, "padding: 6px; font-weight: bold; background-color: #2ecc71; color: black'");

        }
    } catch (error) {
        if (error?.response?.status === 401) {
            if (Object.keys(reUseData)?.length !== 0) {
                //--------------> New code with EncDec <------------ Don't Remove--------By DK
                const ipAddress = sessionStorage.getItem('IPAddress');
                if (ipAddress) {
                    reUseData.IPAddress = ipAddress;
                }
                if (IsEncDec) {
                    const EncPostData = Aes256Encrypt(JSON.stringify(reUseData));
                    const DecPostData = { 'EDpostData': EncPostData }
                    const res = await axios.post(reUseUrl, DecPostData);
                    const EncryptedData = JSON.parse(res?.data?.data);
                    const decryptedData = await Aes256Decrypt(EncryptedData);
                    const TextData = JSON.parse(decryptedData)
                    return TextData?.Table
                } else {
                    const res = await axios.post(reUseUrl, reUseData);
                    const TextData = JSON.parse(res?.data?.data);
                    return TextData?.Table
                }

            } else {
                // console.log(`${url}-----${postData}`)
                console.log("%c🚀 ~ fetchPostData: " + `${url}-----${postData}`, "padding: 6px; font-weight: bold; background-color: #2ecc71; color: black'");

            }
        }
        if (error.response) {
            // console.log(`${error.response?.request?.responseURL} -- ${error.response?.data?.Message}`);
            console.log("%c🚀 ~ fetchPostData: " + `${error.response?.request?.responseURL} -- ${error.response?.data?.Message}`, "padding: 6px; font-weight: bold; background-color: #2ecc71; color: black'");

        }
        return []
    }
};

//---------fetch-Direct-Data
export const fetchDirectData = async (url, postData) => {
    const cleanUrl = url.replace(/^\//, "");
    const res = await axios.post(cleanUrl, postData);

    return await res.data;
}


/// <---------- AddDeleteUpdate Data ---------->

export const AddDeleteUpdateData = async (url, postData) => {

    const res = await axios.post(url, postData);
    console.log(res);

    return await res.data;
}

export const fetchPostFormData = async (url, formData) => {
    try {
        const ipAddress = sessionStorage.getItem("IPAddress");
        if (ipAddress) {
            formData.append("IPAddress", ipAddress);
        }

        // IMPORTANT: do NOT set headers manually
        const res = await axios.post(url, formData);

        // backend already returns encrypted string
        const TextData = JSON.parse(res?.data?.data);
        return TextData?.Table;

    } catch (error) {
        console.log( "%c🚀 FORM-DATA ERROR:", "color:red;font-weight:bold",error?.response?.request?.responseURL, error?.response?.data);
        throw error;
    }
};


export const AddDelete_Img = async (url, FormData) => {
    if (FormData) {
        try {
            const res = await axios.post(url, FormData);
            console.log('AddDelete_Img', res)
            if (res.code === 'ERR_BAD_REQUEST') {
                return res
            } else {
                return res.data;
            }
        }
        catch (error) {
            console.error(error)
        }
    } else {
        // console.log(`${url}-----${FormData}`)
        console.log("%c🚀 ~ AddDelete_Img: " + `${url}-----${FormData}`, "padding: 6px; font-weight: bold; background-color: #2ecc71; color: black'");

    }
}