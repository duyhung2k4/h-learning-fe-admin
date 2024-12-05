import axios from "axios";

export const convertUrlToFile = async (url: string) => {
    try {
        const response = await axios.get(url, { responseType: "blob" });

        const blob = response.data;

        const arr = url.split("/")
        const filename = arr[arr.length - 1];
        const file = new File([blob], filename, {
            type: blob.type,
        });

        return {
            file,
            error: null,
        };
    } catch (error) {
        return {
            file: null,
            error,
        };
    }
}